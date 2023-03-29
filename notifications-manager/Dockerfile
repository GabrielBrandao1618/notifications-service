FROM node:18

WORKDIR /usr/app

COPY package*.json .

RUN npm install
COPY . .

ENV DATABASE_URL file:datasource.db
RUN npx prisma db push
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/main.js"]
