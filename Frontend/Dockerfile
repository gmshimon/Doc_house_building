FROM node:20

WORKDIR /app

# COPY package.json .

# RUN npm install

# # RUN npm i -g serve

# COPY . .

# # RUN npm run build

# EXPOSE 3000

# CMD ["npm", "run", "dev"]


# Copy only dependency files first (cache layer)
COPY package.json package-lock.json ./

# Install dependencies inside the container (Linux binary)
RUN npm ci

# Now copy the rest of your app
COPY . .

EXPOSE 8080
CMD ["npm", "run", "dev", "--", "--host"]