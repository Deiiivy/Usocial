🧑‍💻 USOCIAL — RED SOCIAL UNIVERSITARIA

Guía paso a paso para clonar, configurar y ejecutar el proyecto desde cero usando Docker.

--------------------------------------------
🚨 REQUISITOS (Windows)
--------------------------------------------

1. Tener instalado [Git](https://git-scm.com/)
2. Tener instalado [Docker Desktop](https://www.docker.com/products/docker-desktop/)
3. Tener Node.js y npm 

--------------------------------------------
⬇️ 1. CLONAR EL PROYECTO
--------------------------------------------

Abre PowerShell o CMD y ejecuta:

```bash
git clone https://github.com/Deiiivy/Usocial.git
cd Usocial
```

--------------------------------------------
⬇️ 2. CREAR ARCHIVO .env PARA BACKEND
--------------------------------------------

Entrar a la carpeta Backend y crear un txt

desde vs code, en la carpeta backend crear un archivo .env


y dentro del archivo .env creado pegar estas credenciales

DATABASE_URL="postgresql://postgres:postgres@db:5432/usocial"
JWT_SECRET="usocial-secret-key"


--------------------------------------------
⬇️ 3. EJECUTAR TODO CON DOCKER
--------------------------------------------

estando en la raiz (en la carpeta Usocial correr el comando)

```bash
docker-compose up --build
```

cuando este listo se podra ver el Frontend en: http://localhost:5173/
y el backend estara corriendo en el puerto: http://localhost:3000/
