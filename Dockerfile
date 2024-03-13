FROM node

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Delete existing node_modules and package-lock.json
RUN rm -rf node_modules package-lock.json

# Install backend dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose port (if necessary)
EXPOSE 3000

# Runtime command
CMD ["npm", "start"]
