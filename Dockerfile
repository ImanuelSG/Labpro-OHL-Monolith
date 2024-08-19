# Use the official Node.js image as the base image
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Generate Prisma client
RUN npx prisma generate
# Build the NestJS app
RUN npm run build

# Copy Tailwind CSS output (if applicable)
RUN npm run build:css

# Use a smaller base image for production
FROM node:20-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Copy the build files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/src ./src

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Start the NestJS app
CMD ["node", "dist/src/main"]
