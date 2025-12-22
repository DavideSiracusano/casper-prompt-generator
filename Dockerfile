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

# --- STAGE 3: runner -------------------------------------------------
# Immagine finale di produzione che esegue l'app già buildata
FROM base AS runner

# Imposta l'ambiente di runtime su produzione
ENV NODE_ENV=production

# Disabilita la telemetria di Next.js (niente invio dati a Vercel)
ENV NEXT_TELEMETRY_DISABLED=1

# Cartella di lavoro per il runtime
WORKDIR /app

# Copia solo i file necessari dalla fase di build
COPY --from=builder /app/next.config.* ./ 
COPY --from=builder /app/package.json ./ 
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Espone la porta su cui gira Next.js dentro il container
EXPOSE 3000

# Comando di avvio: esegue l'app Next.js in modalità produzione
CMD ["npm", "start"]
