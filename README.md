# Notas Personales

Aplicación sencilla para crear, listar y eliminar notas personales usando Node.js, Express y un archivo JSON como almacenamiento local.

## Requisitos

- Node.js 18 o superior

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm start
```

El servidor se levanta en `http://localhost:3000`.

## Endpoints

- `GET /api/notas` obtiene todas las notas.
- `POST /api/notas` crea una nota con `titulo` y `contenido`.
- `DELETE /api/notas/:id` elimina una nota por ID.

## Estructura

- `server.js`: API principal con Express.
- `main.js`: lógica del frontend para consumir la API.
- `index.html`: interfaz de usuario.
- `styles.css`: estilos de la aplicación.
- `notas.json`: archivo donde se guardan las notas.

## Notas

- El archivo `notas.json` se crea automáticamente si no existe.
- `node_modules/` está excluido mediante `.gitignore`.