# prontuario-digital

## Overview

This project is a digital medical record system designed to manage patient information efficiently. It utilizes a microservices architecture with Docker for containerization, allowing for easy deployment and scalability.

## Project Structure

The project consists of several key components:

- **Docker Compose Files**:
  - `docker-compose.yml`: Main configuration for the application services.
  - `docker-compose.review.yml`: Configuration for ephemeral Review Apps environments.

- **Scripts**:
  - `scripts/dev-up.sh`: Script to set up the development environment, including installing dependencies and starting services.
  - `scripts/dev-down.sh`: Script to stop services and clean up resources.
  - `scripts/dev-repair.sh`: Script to clean caches, reinstall dependencies, and validate the health of the API.

- **Server**:
  - Contains the backend logic, including the Prisma schema for database interactions and the main server entry point.

- **Web Application**:
  - The frontend of the application, built with modern web technologies, providing a user interface for interacting with the medical records.

## Setup Instructions

1. **Clone the Repository**:

   ```
   git clone <repository-url>
   cd prontuario-digital
   ```

2. **Install Dependencies**:
   Ensure you have [pnpm](https://pnpm.js.org/) installed, then run:

   ```
   pnpm install
   pnpm --dir webapp install
   ```

3. **Run the Development Environment**:
   To start the development environment, use:

   ```
   pnpm run dev:up
   ```

   This will set up the PostgreSQL database, apply migrations, and start the API and web services.

4. **Access the Application**:
   - API: [http://localhost:3030](http://localhost:3030)
   - Web: [http://localhost:5173](http://localhost:5173)

5. **Stopping the Services**:
   To stop the services, run:
   ```
   pnpm run dev:down
   ```

## Usage Guidelines

- For Review Apps, you can specify the pull request number and ports:
  ```
  PR_NUMBER=123 API_PORT=33030 WEB_PORT=35173 pnpm run review:up
  ```
- To stop a Review App:
  ```
  PR_NUMBER=123 pnpm run review:down
  ```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.
