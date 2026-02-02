# Sudoku Challenge - Project Context

## Project Overview

**Sudoku Challenge** is a backend service designed to solve Sudoku puzzles. It exposes an API for solving 9x9 Sudoku grids and provides endpoints for health checks and metrics. The project is built with **NestJS** (Node.js/TypeScript) and follows a **Clean/Hexagonal Architecture** to separate concerns between the domain logic, application layer, and infrastructure.

**Key Features:**
*   **Sudoku Solver:** Core logic to solve standard 9x9 Sudoku puzzles.
*   **API:** RESTful API for interacting with the solver.
*   **Observability:** Integrated Health checks and Prometheus metrics.
*   **Containerization:** Fully dockerized with Docker and Docker Compose support.
*   **Orchestration:** Kubernetes ready with Helm charts and Skaffold configuration.

## Tech Stack

*   **Language:** TypeScript
*   **Framework:** NestJS (Node.js)
*   **Testing:** Jest (Unit & E2E)
*   **Documentation:** Compodoc, Swagger/OpenAPI
*   **Infrastructure:** Docker, Kubernetes (Helm, Skaffold)
*   **Linting/Formatting:** ESLint, Prettier

## Architecture

The project adheres to a **Clean Architecture** (or Hexagonal Architecture) structure:

*   **`src/domain`:** Contains the core business logic, entities, interfaces, and exceptions. This layer is independent of external frameworks.
*   **`src/application`:** Contains the application logic, including Controllers and DTOs (Data Transfer Objects). It orchestrates the flow of data.
*   **`src/infrastructure`:** Contains the implementation details, framework-specific modules, configurations, and external adapters.

## Directory Structure

*   **`src/`**: Main source code.
    *   `application/`: Controllers, DTOs.
    *   `domain/`: Entities, Interfaces, Exceptions, Business Logic.
    *   `infrastructure/`: NestJS Modules, Config, Interceptors.
*   **`__test__/`**: Test files.
    *   `e2e/`: End-to-end tests.
    *   `service/`: Unit tests for services.
    *   `factory/`: Test data factories.
*   **`k8s/`**: Kubernetes configuration files and Helm charts.
*   **`scripts/`**: Helper shell scripts for build and deployment tasks.
*   **`documentation/`**: Generated static documentation (Compodoc).

## Building and Running

### Prerequisites
*   Node.js (v14.x recommended)
*   Docker & Docker Compose

### Using NPM Scripts

*   **Install Dependencies:**
    ```bash
    npm install
    ```

*   **Run in Development Mode (Watch):**
    ```bash
    npm run start:dev
    ```

*   **Run in Production Mode:**
    ```bash
    npm run start:prod
    ```

*   **Run Tests:**
    ```bash
    npm test
    ```

*   **Run Lint:**
    ```bash
    npm run lint
    ```

*   **Generate Documentation:**
    ```bash
    npm run doc
    ```

### Using Helper Script (`scripts/start.sh`)

The `scripts/start.sh` script provides a unified interface for common tasks:

```bash
cd scripts
# Build Docker image
bash start.sh -build_docker

# Build and run Docker container locally
bash start.sh -build_and_run_docker

# Run tests
bash start.sh -run_test
```

### Docker & Kubernetes

*   **Build Docker Image:** `docker build . -t sudoku:latest`
*   **Docker Compose:** `docker-compose up` (implied by file presence)
*   **Kubernetes/Skaffold:** `make` (runs `skaffold dev`) or `skaffold dev`

## API Endpoints

Once running (default port `3000` or defined in `.env`):

*   **Swagger Documentation:** `http://localhost:3000/api`
*   **Sudoku Solver:** `POST /api/v1/sudoku`
*   **Health Check:** `http://localhost:3000/health`
*   **Metrics:** `http://localhost:3000/metrics`

## Development Conventions

*   **Code Style:** Strict adherence to Prettier and ESLint rules.
*   **Commit Messages:** No specific convention found, but clear, descriptive messages are recommended.
*   **Testing:** All new features or bug fixes should include corresponding tests (Unit/E2E).
