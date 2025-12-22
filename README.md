![alt text](image.png)

# 🧠 C.A.S.P.E.R. Prompt Generator

Un'applicazione web sviluppata con **Next.js** e **TypeScript** che permette agli utenti di generare prompt per AI seguendo il metodo **C.A.S.P.E.R.**. Il progetto utilizza l’API **Google Gemini (Generative AI)** per creare prompt personalizzati basati sulle sezioni inserite dall’utente.

---

## 🔹 Caratteristiche

- Interfaccia moderna con **dark mode** toggle.
- 5 campi di input separati per ogni sezione di C.A.S.P.E.R.:
  - **Context**: descrizione del contesto
  - **Audience**: pubblico di destinazione
  - **Style**: stile comunicativo
  - **Platforms**: piattaforme di utilizzo
  - **Elements**: componenti chiave
- Invio dei dati all’API interna `/api/generatePrompt`.
- Risultato generato dall’AI visualizzato direttamente nell’interfaccia.
- Gestione degli errori e stato di **loading** durante la generazione del prompt.
- Integrazione con **Lucide React Icons** per un’interfaccia moderna e intuitiva.

---

## 🔹 Tecnologie utilizzate

- [Next.js](https://nextjs.org/) (React + SSR)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) per lo stile
- [Google Gemini API](https://developers.generativeai.google/) per generare i prompt
- [Lucide React](https://lucide.dev/) per le icone SVG

## Demo -> https://casper-prompt-generator.vercel.app/

---

## 🐳 Docker

Il progetto include una configurazione completa per Docker e Docker Compose, permettendo di eseguire l'applicazione in modo isolato e riproducibile.

### 📦 Opzione 1: Build Locale

Se vuoi buildare l'immagine Docker localmente dal codice sorgente:

```bash
# Build dell'immagine Docker
docker-compose build

# Avvio del container in background
docker-compose up -d
```

L'applicazione sarà disponibile su **http://localhost:3000**

### ☁️ Opzione 2: Usa l'Immagine da Docker Hub

Se preferisci utilizzare l'immagine pre-buildata disponibile su Docker Hub:

```bash
# Scarica l'immagine più recente da Docker Hub
docker pull sirdavi/casper-prompt-generator:latest

# Avvia il container usando docker-compose
docker-compose up -d
```

**Immagine Docker Hub:** [sirdavi/casper-prompt-generator](https://hub.docker.com/r/sirdavi/casper-prompt-generator)

### 🛠️ Comandi Utili

```bash
# Visualizza i log del container
docker-compose logs -f

# Ferma il container
docker-compose down

# Riavvia il container
docker-compose restart

# Verifica lo stato del container
docker-compose ps

# Rebuild forzato dell'immagine
docker-compose build --no-cache
docker-compose up -d
```

### 📋 Requisiti

- [Docker](https://www.docker.com/get-started) installato sul tuo sistema
- [Docker Compose](https://docs.docker.com/compose/install/) (incluso in Docker Desktop)
