# Weather Dashboard (React + Vite)

Aplicación web construida con **React + Vite** para consultar clima por **país → ciudad** consumiendo APIs de clima.
El proyecto está preparado para **desarrollo local** y para **producción con Docker (Nginx)**.

---

## Requisitos

### Para desarrollo (DEV)
- Node.js 20+ (recomendado)
- npm

### Para producción local (PROD-like)
- Docker + Docker Compose

---

## Estructura del proyecto

```txt
web/
  public/
  src/
    app/                # Bootstrap de la app (App, providers, config global)
    assets/             # Assets importados desde el código (svg, imágenes)
    features/weather/   # Feature: clima (api, hooks, schemas, components)
    shared/             # Reutilizable (lib y ui)
  Dockerfile
  nginx.conf