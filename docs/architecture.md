 # System Architecture

 This document describes the high-level architecture of the QRoyalty MVP.

 ```mermaid
 flowchart LR
   subgraph Client Layer
     A[Mobile App / Web Client]
   end
   A -->|HTTPS / REST| B[API Gateway]
   B --> C[QR Service]
   B --> D[Points Service]
   C --> E[(Database)]
   D --> E
   C <-->|Webhooks| F[OEM Backend System]
   E -->|Audit Logs| G[(Logging DB)]
 ```

 - **API Gateway**: Central entry point for all client requests.
 - **QR Service**: Validates QR payloads, ensures authenticity and one-time use semantics.
 - **Points Service**: Executes earning and redemption rules, updates user ledgers.
 - **Database**: Central persistent storage (PostgreSQL).
 - **OEM Backend System**: External system integration for product/catalog sync and transaction webhooks.
 - **Logging DB**: Optional separate store for audit and analytics logs.

## Marketing Architecture & User Functional Flow

Below is a high-level view showing how the marketing platform, communication channels, and user interactions integrate with the QRoyalty system:

```mermaid
flowchart LR
  subgraph Marketing Layer
    MP[Marketing Platform]
    CM[Campaign Manager]
    CH[Communication Channels (Email, SMS, Push Notifications)]
  end
  MP --> CM
  CM --> CH
  CH --> UD[User Device (Mobile App / Web Client)]
  UD -->|Scans QR Code| QR[QR Service]
  QR --> PS[Points Service]
  PS --> DB[(Database)]
  PS --> NS[Notification Service]
  NS --> UD
```

## User Functional Flow

This flow outlines the typical steps a user takes when interacting with the QRoyalty system:

```mermaid
flowchart TD
  U[User] -->|Opens App| A[Mobile App / Web Client]
  A -->|Scans QR Code| V[Validate QR Endpoint]
  V -->|Valid| E[Points Earned Endpoint]
  E -->|Points Credited| B[View Balance Endpoint]
  B -->|View Transaction History| T[View Transactions Endpoint]
  B -->|Redeem Reward| R[Redeem Points Endpoint]
  R -->|Success| C[Confirmation / Reward Delivery]
```