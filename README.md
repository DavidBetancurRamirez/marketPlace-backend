# Plantilla Nest.js
Plantilla usada para proyectos de nest.js


## Ejecutar
**Levantar BD con docker:**
```
  docker compose up -d
```

**Descargar dependencias:**
```
  npm i
```

**Variables necesarias en el .env para modo dev:**
```
  DB_HOST=
  DB_PORT=
  DB_USERNAME=
  DB_PASSWORD=
  DB_DATABASE=
  DB_SSL=
  JWT_SECRET=
```

**Ejecutar modo dev:**
```
  npm run dev
```


## Contenido
- *Documentación con swagger*
- *Tipos de usuarios*
  1. **user**, por defecto
  2. **admin**, permisos para hacer todo


## Modulos
Unicamente explicación de que hace cada ruta, se ve mejor con swagger: *(/docs)*
### Auth
**Opciones:**
- **Post** *(/auth/register) Register*: Crear nuevo usuario
- **Post** *(*/auth/login) Login*: Devuelve el token para autenticación
- **Get** *(*/auth/profile) Profile*: Devuelve la info propia

---
### User
**Opciones solo para usuario con rol admin:**
- **Get** *(/user) FindAll*: Devuelve todos los usuarios
- **Get** *(/user/:id) FindOne*: Devuelve el usuario con el id proporcionado
- **Post** *(/user) CreateUser*: Crear un usuario
- **Patch** *(/user/:id) UpdateUser*: Actualizar un usuario
- **Delete** *(/user/:id) RemoveUser*: Eliminar un usuario


## Comandos Utiles
**Generar un modulo por comandos:**
```
  nest g res name --no-spec
```
