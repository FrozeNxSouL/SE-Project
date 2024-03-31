FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY prisma ./ 

RUN npm install

RUN npx prisma generate

COPY . .

RUN npm run build

COPY .next ./.next

EXPOSE 3000

CMD ["npm", "run", "dev"]