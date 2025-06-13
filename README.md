# Platformatory-Labs
# Full-Stack Profile App with Temporal, OIDC, MongoDB, and React

## Overview

This project demonstrates a full-stack application where users:

- Login via **OIDC (OpenID Connect)**
- View and edit their profile (First Name, Last Name, Phone, City, Pincode)
- Profile updates are processed asynchronously via **Temporal workflows**
- Updates first save to **MongoDB** and after a **10-second delay**, the update is pushed to the external `crudcrud.com` API
- Frontend built with **React + JavaScript**
- Backend built with **Node.js + Express + JavaScript**
- Temporal runs as a separate worker service orchestrating profile updates

---

## Technologies Used

- [Temporal.io](https://temporal.io/) (workflow orchestration)
- [OpenID Connect](https://openid.net/connect/) (authentication)
- [MongoDB](https://www.mongodb.com/) (primary data store)
- [crudcrud.com](https://crudcrud.com/) (external API for demonstration)
- React + TypeScript (frontend)
- Node.js + Express + TypeScript (backend)
- Docker Compose (service orchestration)

---

## Prerequisites

- Docker & Docker Compose installed locally
- Node.js (v16+) installed
- MongoDB connection URI (for local or cloud MongoDB)
- OpenID Connect provider credentials (e.g. Auth0 client ID & secret)
- `crudcrud.com` API endpoint URL (sign up on https://crudcrud.com/ for your free API key)

---

## Setup & Running Locally

### 1. Clone the repo

```bash
git clone https://github.com/ravithejagolla/Platformatory-Labs
cd Platformatory-Labs
