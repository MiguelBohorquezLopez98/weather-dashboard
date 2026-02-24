# ---------- Build ----------
FROM node:20-alpine AS build
WORKDIR /app

# Instalar dependencias primero (mejor cache)
COPY package*.json ./
RUN npm ci

# Copiar el resto y compilar
COPY . .
RUN npm run build

# ---------- Runtime (Nginx) ----------
FROM nginx:alpine

# Config Nginx para SPA (history fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar artefactos compilados
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80