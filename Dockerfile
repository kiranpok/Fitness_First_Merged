FROM node:21.6.1

# Install nodemon globally for backend development
RUN npm install -g nodemon

# Set working directory for backend
WORKDIR /app/backend

# Copy backend files
COPY backend .

# Install backend dependencies
RUN npm install

# Set working directory for frontend
WORKDIR /app/frontend

# Copy frontend files
COPY frontend .

# Install frontend dependencies
RUN npm install

# Expose ports for both backend and frontend
EXPOSE 3001 3000

# Start both backend and frontend servers
CMD ["npm", "start"]