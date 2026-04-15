Angular Sentiment App

This project is an Angular frontend served via nginx inside a Docker container and communicates with a FastAPI backend for sentiment analysis.

Architecture Overview

Development / Current Deployment:

Browser
→ HTTP
→ VPS Apache (HTTPS on port 443, already in use)
→ Angular Container (nginx on port 80)
→ FastAPI Service (port 8001)

Frontend (Angular)

The Angular application is built using a multi-stage Docker build:

Build stage uses Node.js
Runtime stage uses nginx to serve static files

Container Port Mapping:
Host port 4200 is mapped to container port 80

Access URL in current setup:
http://<host>:4200

or
http://<VPS-IP>:4200

HTTPS / SSL Status

SSL is currently handled by Apache on the VPS.
Port 443 is already in use by Apache.
The Angular container does not handle SSL directly.
HTTPS is not provided by this container.

This is intentional due to infrastructure constraints.

Build & Run

Build Docker image:
docker build -t angular-sentiment .

Run container:
docker run -p 4200:80 angular-sentiment

Backend (FastAPI)

The backend is a separate service running on:
http://<host>:8001

It provides a /predict endpoint for sentiment analysis.

API Example:
curl -X POST http://<host>:8001/predict -H "Content-Type: application/json" -H "x-api-key: supersecretkey" -d '{"text": "I love this project!"}

Important Notes

Port 443 is occupied by Apache on the VPS
Docker containers do not expose HTTPS directly in this setup
All services communicate via HTTP internally
HTTPS termination happens at the VPS level (Apache)

Design Decision

This architecture separates concerns:

Apache handles HTTPS termination (edge gateway)
Angular container serves static frontend via nginx
FastAPI handles backend inference

This avoids:

Port conflicts
Double SSL termination
Unnecessary complexity inside containers

Future Improvements

Move to a unified reverse proxy (nginx instead of Apache)
Introduce centralized API gateway
Optional HTTPS inside internal network (mTLS)

Summary

This setup prioritizes simplicity, clear separation of services, and stable VPS deployment architecture.

Architecture
Angular (4200)
   ↓ HTTP
FastAPI (8001)
   ↓
Transformer Model (HuggingFace)

