## 📌 Project Overview
**Eventvet** is a full-stack, responsive event discoverability and transactional ticketing platform engineered as a collaborative Capstone Project within the **Tech4Dev** curriculum. The system bridges the gap between digital content delivery and local access scheduling by organizing real-time event parameters—such as chronological timelines, pricing matrices, and venue allocations—into a clean, fluid user interface.

The application features a decoupled architecture where an event-driven Vanilla JavaScript frontend consumes, parses, and renders dynamic records served by a dedicated backend application tier powered by a relational SQL database managed via Sequelize. 

> ⚠️ **Project Development Status: Active / Incomplete**  
> This platform is a collaborative MVP (Minimum Viable Product) currently in an active developmental sprint phase. Core structural database engines and primary asynchronous API communication pipelines are fully operational, while secondary consumer microservices remain on our feature implementation roadmap.

<img width="1453" height="781" alt="Screenshot 2026-08-11 at 10 11 50 PM" src="https://github.com/user-attachments/assets/7736b707-5ebc-4799-94fd-10efc5481610" />

## 👥 Group Collaborators & Project Status

This system was engineered collectively within an Agile team structure, dividing responsibilities symmetrically across front-end delivery matrices and back-end structural data layers.

### Team Members & Focus Areas
* **Elpedia J. Arthur** — Frontend DOM Manipulation, Layout Architecture, and Event-Driven Action Listeners.
* **Ebere Adekogbe** — Frontend DOM Manipulation, Layout Architecture, and Event-Driven Action Listeners.
* **The Quiet Note** — Database Schema Design, Mock Ingestion Payloads, and System Testing.

### Current Implementation Matrix (Roadmap Progress)
* [x] **Relational Schema Definition:** Completed relational model structures within the `/models` directory using Sequelize.
* [x] **Asynchronous Network Pipeline:** Completed `fetch`/`Axios` data fetching gateways on the client interface.
* [x] **User Authentication Ingestion:** Completed secure backend data routes with `bcryptjs` encryption layers.
* [o] **Transactional Ticket Allocations:** *In Progress* — Optimizing atomic SQL locking mechanisms to handle high-concurrency booking actions cleanly.
* [ ] **Automated Payment Gateway Mocking:** *Planned* — Scheduled integration for third-party mock banking payment webhooks.


## 📱 Application Interface
<img width="1435" height="847" alt="Screenshot 2026-08-11 at 10 04 46 PM" src="https://github.com/user-attachments/assets/6a85729b-8719-4983-a0dc-bf2f7f9f8368" />

## 🏛️ Engineering Architecture & Design Implementations

### 1. Relational Database Design & SQL Query Optimization
The foundation of the platform relies on a normalized relational database schema designed to preserve strict data integrity across high-concurrency ticket transactions:
* **Schema Normalization:** Organizes event parameters, venue allocations, user profiles, and transactional records into discrete, logical tables connected through strict primary and foreign key mapping constraints.
* **Transaction Safety & Data Integrity:** Implements precise SQL query syntax to prevent data race conditions during concurrent seat bookings, ensuring records cascade and update symmetrically.
* **Input-Parameter Validation:** Sanitions incoming structural inputs at the API-to-Database transition layer to secure backend tables against common SQL injection vulnerabilities.

### 2. Event-Driven UI Engine & DOM Mutation
Instead of relying on heavy client-side frameworks, the frontend leverages optimized native Web APIs and Vanilla JavaScript (ES6+) to orchestrate interface state updates:
* **Dynamic Node Ingestion:** Programmatically handles DOM mutations to inject backend relational data arrays directly into semantic layout templates.
* **Input-Driven Action Listeners:** Implements structural event handlers (`addEventListener`) to instantly capture user filter inputs, keyword search queries, and booking triggers without interface lag.

### 3. Full-Stack Data Communication & API Parsing
The platform implements asynchronous communication to handle data round-trips seamlessly between the client browser and the backend server architecture:
* **Asynchronous Response Pipelines:** Employs Promise lifecycles and modern network patterns (`fetch` / `Axios`) to ingest streaming JSON payloads from the server layer without halting background computation.
* **Payload Deserialization:** Unwraps structured backend arrays to isolate and map data attributes (such as data tags, localized calendar structures, and booking indicators) dynamically.

## 🛠️ Technical Stack & Framework Tools
* **Data Storage Engine:** Relational Database Infrastructure (Structured SQL, Relational Schema Management)
* **Backend Runtime & API Layer:** Server-Side Runtime Environment (Node.js/Express, Python, or equivalent API endpoints)
* **Client-Side Core Logic:** Vanilla JavaScript (ES6+, Asynchronous Callbacks, Event Handlers, Array Iterators)
* **Structuring & Design Matrix:** Semantic HTML5, Custom CSS3 Architecture / Responsive Layout Frameworks
* **Version Management Workflow:** Git Source Engineering, GitHub Collaborative Ecosystem

## 📋 Comprehensive System Execution Lifecycle
1. **Query Generation:** The user executes a search or clicks a specific category element on the frontend dashboard.
2. **Network Request Dispatch:** An asynchronous JavaScript function captures the event criteria, structures a query string, and fires a non-blocking request to the server API endpoint.
3. **SQL Query Execution:** The backend architecture intercepts the request parameter, runs validation checks, and executes optimized SQL queries against the relational database engine to retrieve filtered event tuples.
4. **Data Deserialization & Ingestion:** The client browser intercepts the returning JSON stream, deserializes the array matrix, and hydrates empty HTML layouts with raw metric strings.
5. **UI Redraw:** The script swaps component visibility elements to immediately reveal live, up-to-date event cards to the user.

## ⚙️ Project Installation & Execution Protocols

To audit, modify, or run this full-stack platform environment locally, execute the following technical deployment workflow:

### 1. Fork and Clone the Architecture
1. Navigate to the top-right corner of this repository interface page and click the **Fork** button to create an independent copy under your personal GitHub profile.
2. Open your local terminal environment and clone your newly forked repository:
   ```bash
   git clone https://github.com
   cd Eventvet
   ```

### 2. Initialize the Database & Backend Environment
The backend infrastructure utilizes the **Sequelize ORM** engine to handle schema migrations and synchronize relational structures automatically upon system runtime.

1. **Configure Your Environment Matrix:**
   Create a file named `.env` inside the root of your `/backend` directory and add your localized MySQL database connection credentials:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_encryption_key
   ```

2. **Ingest Dependencies & Launch Server Lifecycle:**
   Execute the package script to pull in runtime modules and initialize the development gateway. Sequelize will automatically evaluate the definitions inside the `/models` directory and generate your relational MySQL tables:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

### 3. Launch the Frontend Client
Open a secondary terminal workspace, navigate back out to your main project root directory, and serve your client presentation files:
```bash
cd ../
# If using a local dev server wrapper or running a basic live script
npm start  # Or simply open index.html directly via a local browser environment extension
```

---
*Developed as a benchmark Capstone Project milestone within the Tech4Dev Engineering curriculum.*
