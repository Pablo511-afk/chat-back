## Dev

1.Clonar el repositorio

2.Definir las variables de entorno del .env.template

3.Ejecutar el comando `npm install` para instalar las dependencias necesarias

4.Ejecutar el comando `docker compose up --build` para iniciar la base de datos postgres

5.Ejecutar el comando `npx prisma migrate dev --name init` para incializar las estructura de la BD

6.Ejecutar el comando `npm run start:dev` para iniciar el proyecto en modo desarrollo

## Importante

El proyecto requiere tener instalado docker y docker compose para la instalacion de la BD. Esto para facilitar el desarrollo y en un futuro el despliegue de la aplicacion
