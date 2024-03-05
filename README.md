## Node.js Backend con Express, Docker, PostgreSQL, JWT y TypeORM

Este proyecto proporciona una base segura y escalable para construir APIs RESTful utilizando Node.js. Se basa en las siguientes tecnologías:

- **Express.js:** Un framework web popular para Node.js que proporciona enrutamiento, middleware y plantillas.
- **Docker:** Una plataforma de contenedorización para construir, empaquetar y ejecutar aplicaciones en entornos aislados.
- **PostgreSQL:** Un sistema de gestión de bases de datos relacionales de objetos (OODBMS) potente y de código abierto.
- **JSON Web Token (JWT):** Una forma segura de autenticar usuarios y compartir información entre el cliente y el servidor.
- **TypeORM:** Un mapeador relacional de objetos (ORM) que simplifica las interacciones con PostgreSQL utilizando Node.js, permitiéndole trabajar con entidades de la base de datos directamente en TypeScript o JavaScript.

## Requisitos previos

- **Node.js y npm (o yarn):** Asegúrate de tener la última versión instalada desde [https://nodejs.org/en](https://nodejs.org/en).
- **Docker:** Descarga e instala Docker Desktop desde [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/).
- **PostgreSQL:** Instala un servidor PostgreSQL o sigue las instrucciones en [https://www.postgresql.org/](https://www.postgresql.org/).

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-nombre-de-usuario/tu-nombre-del-proyecto.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd tu-nombre-del-proyecto
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

   (o usando yarn)

   ```bash
   yarn install
   ```

## Configuración

1. **Utiliza `.envexample` como guía:**

   - El proyecto incluye dos archivos: `.env` y `.envexample`.
   - **No publiques el archivo `.env`** ya que contiene información sensible.
   - Copia y renombra `.envexample` a `.env`.
   - Modifica los valores predeterminados en `.env` con tus datos específicos.

2. **Personaliza las variables de entorno:**

   - Edita el archivo `.env` y agrega las siguientes variables de entorno:

   ```
   # Reemplaza los marcadores de posición con tus valores reales
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=tu_nombre_de_usuario
   POSTGRES_PASSWORD=tu_contraseña
   POSTGRES_DB=tu_nombre_de_la_base_de_datos
   JWT_SECRET=tu_clave_secreta
   ```

3. **Ajusta configuraciones adicionales:**

   - Personaliza la configuración de la conexión a la base de datos, la clave secreta de JWT y otras configuraciones según sea necesario dentro de los archivos relevantes (por ejemplo, `src/config/database.config.ts` para la base de datos).

## Ejecución de la Aplicación

1. **Construye la imagen de Docker:**

   ```bash
   docker-compose build
   ```

2. **Inicia la aplicación:**

   ```bash
   docker-compose up -d
   ```

   Esto ejecutará tanto el contenedor del backend Node.js como el contenedor de la base de datos PostgreSQL en modo separado.

## Acceso a la API

La API estará accesible en `http://localhost:3100`. Los endpoints específicos y la documentación de la API variarán dependiendo de tu implementación, pero puedes usar herramientas como Postman o curl para enviar solicitudes e interactuar con la API.

## Desarrollo

1. **Inicia la aplicación en modo desarrollo:**

   ```bash
   docker-compose up
   ```

   Esto ejecutará los contenedores en primer plano, lo que te permitirá realizar cambios en el código y ver sus efectos inmediatamente.

## Migraciones

Para ejecutar las migraciones al iniciar el contenedor Docker:

1. Edita el archivo `docker-compose.yml`.
2. Busca la sección `command` dentro del servicio `backend`.
3. Agrega `&& npm run migrate` al final del comando existente.

Ejemplo:

```yaml
backend:
  ...
  command: ["npm", "start", "&&", "npm", "run", "migrate"]
```

4. Asegúrate de tener instaladas las dependencias necesarias para ejecutar las migraciones antes de iniciar el contenedor Docker.