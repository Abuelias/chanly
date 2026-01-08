# Use the official Node.js runtime as the base image
FROM node:18-alpine AS base

# Install dependencies for native modules
RUN apk add --no-cache libc6-compat

# Set the working directory in the container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Rebuild the source code only when needed
FROM base AS builder

# Install all dependencies (including devDependencies)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Test the application (optional)
# RUN npm run test

# Production image, copy all the files and run the app
FROM base AS runner

# Create a non-root user to run the app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 chanly

# Set up the working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=chanly:nodejs /app/.next ./.next
COPY --from=builder --chown=chanly:nodejs /app/public ./public
COPY --from=builder --chown=chanly:nodejs /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Switch to the non-root user
USER chanly

# Expose the port the app runs on
EXPOSE 3000

# Set environment variable for Next.js
ENV NODE_ENV=production
ENV PORT=3000

# Start the application
CMD ["npm", "start"]