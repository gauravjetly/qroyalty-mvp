 # QRoyalty Backend Service

 This directory contains the prototype backend for QRoyalty.

 ## Setup & Run

 ```bash
 cd backend
 cp ../.env.example .env
 npm install
 npm run dev
 ```

 The server will start on the port defined in `.env` (default: 4002).

Endpoints are implemented in-memory for prototype. See [docs/openapi.yaml](../docs/openapi.yaml) for API spec.