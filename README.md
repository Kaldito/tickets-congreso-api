# API CONGRESO

En la siguiente api creada de manera restful maneja el registro de personas para el congreso de UAL.

### REQUERIMIENTOS:
- Tener instalado el paquete de Nodemon.
- Tener instalado MongoDBCompass.
- Todos los paquetes ya vienen instalados, por si acaso usar `npm install`.

### NOTAS IMPORTANTES:
- Inicializar en servidor con: `nodemon --env-file=.env index.js`, para que tome en cuenta las variables de entorno.
- En caso de que no conecte con tu base de datos de MongoDB cambiar el archivo .env con la URI que apunte a tu base de datos.
- La API viene documentada en cada uno de sus metodos **(GET, POST, PUT, DELETE)**.
