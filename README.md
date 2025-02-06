# Correr Backend
1. Navegar al directorio de **backend** utilizando el CLI
2. Instalar paquetes de node con `npm install`
3. Crear un archivo .env, colocar `DATABASE_URL=""` y asignar la URL de la base de datos
4. Correr comando `npx prisma migrate deploy` para desplegar las migraciones
5. Correr comando `npx prisma generate` para generar el cliente de prismaORM
5. Correr comando `npx prisma db seed` para hacer seed a la base de datos
6. Correr comando `npm run dev` en el CLI

# Correr Frontend
1. Navegar al directorio de **frontend** utilizando el CLI
2. Instalar paquetes de node con `npm install`
3. Correr comando `npm run dev` en el CLI
4. Hacer Ctrl + click en la URL que aparecerá en el CLI para abrir el frontend en el navegador