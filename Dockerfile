FROM node:20-alpine AS base

# Abilita corepack (gestore per npm/yarn/pnpm) nell'immagine base
RUN corepack enable

# Imposta la cartella di lavoro all'interno del container
WORKDIR /app

# --- STAGE 1: deps ---------------------------------------------------
# Installa le dipendenze una sola volta in uno stage separato
FROM base AS deps

# Copia i file di configurazione delle dipendenze
COPY package.json package-lock.json ./

# Installa le dipendenze in modo ripetibile (usa package-lock)
RUN npm ci

# --- STAGE 2: builder ------------------------------------------------
# Esegue il build dell'app Next.js usando le dipendenze installate
FROM base AS builder

# Imposta l'ambiente di build su produzione
ENV NODE_ENV=production

# Copia le node_modules dallo stage deps
COPY --from=deps /app/node_modules ./node_modules

# Copia tutto il codice dell'applicazione nel container
COPY . .

# Esegue il build di Next.js (genera la cartella .next)
RUN npm run build

# Rimuove le devDependencies per ridurre la dimensione dell'immagine runtime
RUN npm prune --production

# --- STAGE 3: runner -------------------------------------------------
# Immagine finale di produzione che esegue l'app già buildata
FROM node:20-alpine AS runner

# Imposta l'ambiente di runtime su produzione
ENV NODE_ENV=production

# Disabilita la telemetria di Next.js (niente invio dati a Vercel)
ENV NEXT_TELEMETRY_DISABLED=1

# Crea un utente non-root per sicurezza
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Cartella di lavoro per il runtime
WORKDIR /app

# Copia il bundle standalone e le risorse statiche generate da Next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./

# Installa curl per permettere l'healthcheck nel container
RUN apk add --no-cache curl

# Passa all'utente non-root
USER nextjs

# Espone la porta su cui gira Next.js dentro il container
EXPOSE 3000

# Imposta la variabile d'ambiente per la porta
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Healthcheck integrato nell'immagine (usato anche da docker-compose)
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Comando di avvio: esegue il server standalone generato da Next
CMD ["node", "server.js"]
