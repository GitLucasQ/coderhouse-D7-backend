# APLICACION WEB LISTADO DE PRODUCTOS - CHAT

Esta pequeña app web contiene un mantenedor de productos básico con un chat integrado. Implementa las tecnologías de WebSocket y bases de datos (MySQL, SQLite).

## Instrucciones y requerimientos para poner en funcionamiento la app:

- Instalar el paquete de [XAMPP](https://www.apachefriends.org/es/index.html) para la base de datos MySQL.
- Luego de conectar al cliente MySQL ejecutar el siguiente script para crear la base de datos que se usará:
```sql
create database 'productos';
```

Luego de instalar lo necesario, ingresar al proyecto y ejecutar los scripts:
```bash
npm run build
npm start
```