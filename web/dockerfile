# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Build the Next.js application for production
RUN npm run build

# Use a lightweight Node.js server to serve the production build
FROM node:20-alpine AS runner
# STAGE 2

# Set the working directory in the container
WORKDIR /app

# Copy the production build from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.mjs ./

# Install only the production dependencies
RUN npm install --omit=dev

# Expose the port that the application will run on
EXPOSE 3000

# Set the command to start the application
CMD ["npm", "start"]