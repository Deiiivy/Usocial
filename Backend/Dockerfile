FROM node:18

RUN apt-get update || true && apt-get install -y netcat-openbsd

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate


EXPOSE 3000
CMD ["npm", "run", "dev"]
