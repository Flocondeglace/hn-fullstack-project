## Inspired by the docker documentation on Containerizing an Angular Application : https://docs.docker.com/guides/angular/containerize/

# =========================================
# Stage 1: Build the Angular Application
# =========================================

# Use a Node.js image for building
FROM node:26-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package-related files
COPY package.json package-lock.json* ./

# Install project dependencies using npm ci
RUN --mount=type=cache,target=/root/.npm npm ci

# Copy the rest of the application source code into the container
COPY . .

# Build the Angular application
RUN npm run build 

# =========================================
# Stage 2: Prepare Nginx to Serve Static Files
# =========================================

FROM nginx:1.31.0-alpine AS runner

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the static build output from the build stage to Nginx's default HTML serving directory
COPY --chown=nginx:nginx --from=builder /app/dist/*/browser /usr/share/nginx/html

# Use a non-root user
USER nginx

# Expose port 4200
EXPOSE 4200

# Start Nginx directly with custom config
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]