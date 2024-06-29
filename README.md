# FBI System

FBI System es una aplicación web que autentica a los agentes basados en sus credenciales y permite el acceso a rutas restringidas mediante un token JWT.

## Características

1. Autenticación de usuarios basada en credenciales.
2. Generación de un token JWT con datos del usuario.
3. Al autenticar un agente, se devuelve un HTML que:
   - Muestra el email del agente autorizado.
   - Guarda un token en `SessionStorage` con un tiempo de expiración de 2 minutos.
   - Redirige automáticamente al agente a una ruta restringida.
4. Ruta restringida que devuelve un mensaje de bienvenida con el correo del agente autorizado.

## Requisitos

- Node.js v14.x o superior
- npm v6.x o superior

## Instalación

1. Clona este repositorio:

   ```sh
   git clone https://github.com/JuanaC24/fbi-system.git
   cd fbi-system

2. Instala las dependencias:

    SECRET_KEY=your_secret_key

3. Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

    SECRET_KEY=your_secret_key

## Estructura del Proyecto

fbi-system/
├── controllers/
│   └── authController.js
├── data/
│   └── agentes.js
├── middleware/
│   └── authMiddleware.js
├── public/
│   ├── index.html
│   ├── restricted.html
├── routes/
│   └── authRoutes.js
├── .env
├── app.js
├── package.json
└── README.md

### Configuración

Controladores

authController.js
Este archivo contiene la lógica para autenticar a los usuarios y cargar los datos de los usuarios:

* loadUsers: Función que carga los datos de los usuarios desde el archivo agentes.js.

* login: Función que verifica las credenciales del usuario. Si las credenciales son correctas, se genera un token JWT y se devuelve al cliente.


Middleware

* authMiddleware.js
Este archivo contiene la lógica para verificar el token JWT:

* verificarToken: Middleware que verifica si el token JWT proporcionado en la cabecera de la solicitud es válido. Si es válido, permite el acceso a la ruta protegida; de lo contrario, devuelve un error de autorización.

Rutas

authRoutes.js

Este archivo define las rutas para la autenticación y las rutas protegidas:

* /login: Ruta POST para la autenticación de usuarios. Utiliza la función login del controlador de autenticación.
* /dashboard: Ruta protegida que sirve una página HTML después de la autenticación exitosa.
* /restricted: Ruta protegida que devuelve el email del usuario autenticado.
* /restricted-page: Ruta que sirve la página HTML restringida.

Datos

agentes.js
Este archivo contiene los datos de los usuarios y sus contraseñas hasheadas:

* createUsers: Función que crea y retorna una lista de usuarios con sus contraseñas hasheadas.

Páginas HTML

public/index.html
Esta es la página de inicio de sesión donde los usuarios ingresan sus credenciales:

* Formulario de inicio de sesión: Permite a los usuarios ingresar su email y contraseña.
* Manejo de errores: Si las credenciales son incorrectas, muestra un alert indicando el fallo del inicio de sesión.
* Redirección: Después de la autenticación exitosa, redirige automáticamente a la página restringida.

public/restricted.html
Esta es la página restringida que solo los usuarios autenticados pueden ver:

* Muestra el email del usuario: Si el token JWT es válido, muestra el email del usuario autenticado.
* Manejo de errores: Si el token no es válido o ha expirado, redirige a la página de inicio de sesión.

#### Ejecución del Proyecto

1. Inicia el servidor.

    npm start

2. Abre tu navegador y navega a http://localhost:3000.

3. Ingresa tus credenciales de usuario para acceder a la ruta restringida.


