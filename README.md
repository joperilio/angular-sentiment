# Angular Sentiment Analysis App

A fullstack demo application that performs **sentiment analysis on text** using:

- Angular frontend
- FastAPI backend (HuggingFace Transformer model)
- Dockerized deployment

---

## Quick Start (Docker)

### 1. Backend (API)

```bash
docker build -t sentiment-transformer .
docker run -d -p 8001:8000 --name sentiment-transformer sentiment-transformer

Test API:
curl http://localhost:8001/predict \
-H "Content-Type: application/json" \
-H "x-api-key: supersecretkey" \
-d '{"text":"I love this project!"}'


Frontend (Angular)
ng build
docker build -t angular-sentiment .
docker run -d -p 4200:80 --name angular-sentiment angular-sentiment

Open:
http://localhost:4200



Update Workflow
Frontend updates
ng build
docker rm -f angular-sentiment
docker build --no-cache -t angular-sentiment .
docker run -d -p 4200:80 --name angular-sentiment angular-sentiment

Backend updates
docker rm -f sentiment-transformer
docker build --no-cache -t sentiment-transformer .
docker run -d -p 8001:8000 sentiment-transformer


Notes
Backend runs on http://localhost:8001
API requires header: x-api-key: supersecretkey
CORS must be enabled in FastAPI
Angular uses production build served via Nginx


Architecture
Angular (4200)
   ↓ HTTP
FastAPI (8001)
   ↓
Transformer Model (HuggingFace)

