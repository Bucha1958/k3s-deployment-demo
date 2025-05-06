# Okxeel Microservice Deployment on K3s with CI/CD

This project demonstrates a full microservices deployment pipeline using Docker, GitHub Actions, and a K3s Kubernetes cluster. It includes two backend services (`auth-service` and `general-service`) containerized with Docker and deployed via Kubernetes manifests. The services were originally tested using Docker Compose locally, and then moved into production-like environments using a multi-node K3s cluster.

---

## 📦 Project Structure

```bash
okxeel-microservice/
├── .github/workflows/        # GitHub Actions CI/CD pipelines
│   └── okxeel-service.yaml
├── auth-service/             # Authentication microservice (Node.js + TypeScript)
├── general-service/          # General business logic microservice (Node.js + TypeScript)
├── docker-compose.yml        # Local development setup
├── k8s/                      # Kubernetes manifests for deployment
├── README.md
```

## 🚀 Overview

This project focuses on setting up, deploying, and managing microservices in a production-simulated environment using the following:

- **K3s Kubernetes Cluster** with 1 master and 2 workers
- **GitHub Actions CI/CD** that builds Docker images and deploys to K3s
- **Docker Compose** for local development testing
- **MongoDB** database integration (local and cluster-compatible)
- **CoreDNS and Networking fixes** in K3s for service discovery and stable connectivity

---

## ⚙️ Tech Stack

- Node.js (TypeScript)
- MongoDB
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- K3s Kubernetes (multi-node)
- kubectl

---

## 🧪 Local Development

To run the services locally with Docker Compose:

```bash
docker-compose up --build

