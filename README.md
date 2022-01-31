# Prueba-tyba

Api rest que permite a un usuario registrado y logeado hacer peticiones a un api externa para la busqueda de restaurantes, permitiendo la trazabilidad de las transacciones.

NOTA: importante resaltar que se uso un servicio de mock externo que me permitio generar algunas ciudades para ser buscadas en el endpoint de getRestaurants, las ciudades registradas son [armenia, medellin, bogota].

## Requisitos

- NPM    `7.0.3`
- NodeJS `v15.0.1`
- postgresql
- Redis

## Migraciones

- Creating migration
```  
$ knex migrate:make <name_migration>
````
- Run migrations
```
$ knex migrate:latest
```
- Rollback migration
```
$ knex migrate:rollback
```

## Installation

- clonar repositorio:
```
$ git clone https://github.com/wartski1/prueba-tyba.git
```
- instalacion manual de dependencias:
```
$ npm install
```
- configuracion de variables de entorno:
```
$ export $(cat .env.local | grep -v ^# | xargs)
```

- puede ejecutarse de manera local a traves de:
```
$ npm run dev
```

- si desea hacerlo a traves de docker.
- construccion de imagen con docker-compose:
```
$ docker-compose buil api
```
- despliegue de instancias para correr el api:
```
$ docker-compose up api
```

## Coleccion de endpoints

####   healt-check:
```
curl --location --request GET 'http://localhost:8000/api/prueba-tyba-ms/' \
--header 'Content-Type: application/json' \
--header 'API_KEY: test'
```

####  crear usuario:
```
curl --location --request POST 'http://localhost:8000/api/prueba-tyba-ms/create' \
--header 'Content-Type: application/json' \
--header 'API_KEY: test' \
--data-raw '{
    "name": "Pedro",
    "document": 12345,
    "password": 12345678
}'
```

####  login de usuario:
```
curl --location --request POST 'http://localhost:8000/api/prueba-tyba-ms/login' \
--header 'Content-Type: application/json' \
--header 'API_KEY: test' \
--data-raw '{
    "document": 12345,
    "password": 12345678
}'
```

####  logout de usuario:
```
curl --location --request GET 'http://localhost:8000/api/prueba-tyba-ms/logout' \
--header 'Content-Type: application/json' \
--header 'API_KEY: test' \
--header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwibmFtZSI6IlBlZHJvIiwiZG9jdW1lbnQiOjEyMywiaWF0IjoxNjQzNjA0NjUxLCJleHAiOjE2NDM2MDgyNTF9.YyoM5RR2YKFcHdlbfpOJmulRR7F6-3yQIWsGMuVkShU'
```

####  get de restaurantes, permitido solo a usuarios logeados:
```
curl --location --request GET 'http://localhost:8000/api/prueba-tyba-ms/restaurants/medellin' \
--header 'Content-Type: application/json' \
--header 'API_KEY: test' \
--header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwibmFtZSI6IlBlZHJvIiwiZG9jdW1lbnQiOjEyMzQ1LCJpYXQiOjE2NDM2NDczNDksImV4cCI6MTY0MzY1MDk0OX0.GuG3bQem3ePWV_5-tTszGh2TrB6XHIzM-JFCGr5l1Q4'
```

####  get de transacciones paginado, permitido solo a usuarios logeados, trae las transacciones del usuario logeado:
```
curl --location --request GET 'http://localhost:8000/api/prueba-tyba-ms/transactions?limit=1&page=1' \
--header 'Content-Type: application/json' \
--header 'API_KEY: test' \
--header 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwibmFtZSI6IlBlZHJvIiwiZG9jdW1lbnQiOjEyMzQ1LCJpYXQiOjE2NDM2NDczNDksImV4cCI6MTY0MzY1MDk0OX0.GuG3bQem3ePWV_5-tTszGh2TrB6XHIzM-JFCGr5l1Q4'
```

## Tests

Para correr los test unitarios:

```
$ npm test
```
