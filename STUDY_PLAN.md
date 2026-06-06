# Budget Tracker - 1 Month Study Plan (June 1-30, 2026)

## Overview
This plan guides you through learning Spring Boot, building a budget tracker, and deploying it—all in 4 weeks with daily commitments.

---

## **WEEK 1: June 1-7 - Foundations & Setup**

### **June 1-2 (Monday-Tuesday): Spring Boot Basics**
- **Learning Goal:** Understand Spring Boot architecture and REST APIs
- **Topics:**
  - What is Spring Boot? (Why use it?)
  - MVC Pattern (Model-View-Controller)
  - REST API Principles (GET, POST, PUT, DELETE)
  - HTTP methods and status codes
- **Time:** 2-3 hours/day
- **Resources:**
  - Spring Boot Official Documentation
  - YouTube: "Spring Boot in 100 Seconds" + "Spring Boot Tutorial"
- **Task:** Take notes on concepts you learn
- **Deliverable:** None yet (learning phase)

### **June 3-4 (Wednesday-Thursday): Database & JPA Basics + PostgreSQL Setup**
- **Learning Goal:** Understand how data is stored and retrieved + hands-on database configuration with PostgreSQL
- **Topics:**
  - Relational databases (tables, primary keys, relationships)
  - SQL basics (SELECT, INSERT, UPDATE, DELETE)
  - JPA/Hibernate (Object-Relational Mapping)
  - Entity relationships (One-to-Many, Many-to-One)
  - **NEW: PostgreSQL installation and setup**
  - **NEW: Spring Boot application.properties configuration for PostgreSQL**
  - **NEW: Database connection setup and testing**
  - **NEW: JPA validation annotations (@NotNull, @Positive, @NotBlank, etc.)**
  - **NEW: Cascading operations and fetch types (LAZY vs EAGER)**
  - **NEW: Custom JPA queries for budget tracker features**
  - **NEW: LocalDate/LocalDateTime handling in entities**
  - **NEW: Testing entities with repositories**

- **Time:** 2-3 hours/day
- **Resources:**
  - JPA Tutorial (Baeldung)
  - SQL Practice (W3Schools SQL)
  - Spring Data JPA Documentation
  - PostgreSQL Official Documentation
  - Validation annotations guide (javax.validation)

- **Tasks:**

  **Day 1 (June 3): PostgreSQL Setup + JPA Concepts**
  
  **Part A: PostgreSQL Installation & Setup (60-90 mins)**
  1. Download PostgreSQL from https://www.postgresql.org/download/
  2. Install PostgreSQL (Windows/Mac/Linux - follow installer defaults)
  3. During installation, remember the password you set for `postgres` user
  4. After installation, open PostgreSQL Command Line (psql) or use a GUI tool
  5. Create your budget tracker database:
     ```sql
     CREATE DATABASE budget_tracker;
     ```
  6. Verify the database was created:
     ```sql
     \l
     ```
  7. Keep PostgreSQL running in background (it will start automatically on reboot)
  
  **Part B: Learn JPA Concepts (60-90 mins)**
  1. Review SQL basics and JPA concepts from resources
  2. Understand cascading and fetch types
  3. Learn validation annotations and when to use them
  4. Watch tutorial on database setup with Spring Boot + PostgreSQL

  **Day 2 (June 4): Practical Database Work**
  
  **Part A: Spring Boot Configuration (60 mins)**
  1. Understand `application.properties` file structure
  2. Learn PostgreSQL connection string format:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/budget_tracker
     spring.datasource.username=postgres
     spring.datasource.password=YOUR_PASSWORD_HERE
     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.show-sql=true
     spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
     ```
  3. Understand what each property does
  4. Know how to test the connection
  
  **Part B: Practice JPA Queries & Entities (90 mins)**
  1. Practice writing custom JPA queries:
     - Find all expenses for a user between two dates
     - Find total amount spent in a category
     - Find expenses exceeding a certain amount
  2. Learn LocalDate handling in entity fields
  3. Create sample User and Expense entity classes locally
  4. Understand validation annotations usage in your entities
  5. Know how to test repository query methods

- **Deliverable:** ✅ PostgreSQL installed and working + Understanding of Spring Boot DB config + Sample entity classes

### **June 5-7 (Friday-Sunday): Project Setup & First Endpoint**
- **Learning Goal:** Set up your Spring Boot project in VS Code and create first API
- **Tasks:**
  1. Install JDK 17+ (if not already)
  2. Install VS Code with required extensions:
     - **Extension Pack for Java** (by Microsoft) - Search in Extensions tab, click Install
     - **Spring Boot Extension Pack** (by Pivotal/VMware) - Search in Extensions tab, click Install
     - **Thunder Client** (by Rangav) - Search in Extensions tab, click Install
     - **Lombok** (optional, but helpful) - Reduces boilerplate code
  3. Create Spring Boot project using Spring Initializr (https://start.spring.io):
     - Project: Maven
     - Language: Java
     - Spring Boot: 3.x (latest stable)
     - Project Name: budget-tracker
     - Package Name: com.example.budgettracker
     - Dependencies: Spring Web, Spring Data JPA, PostgreSQL Driver, Validation
  4. Download project and open in VS Code
  5. Test that project opens correctly and build completes
  6. Configure `application.properties` with PostgreSQL connection details (from June 4)
  7. Create your first REST endpoint (GET /api/health)
  8. Test with Thunder Client (Open Thunder Client in sidebar, create new request)
  9. Push to GitHub with message: "Initial Spring Boot setup with PostgreSQL"
- **Time:** 3-4 hours/day
- **Resources:**
  - Spring Initializr (start.spring.io)
  - Spring Boot Getting Started Guide
  - VS Code Java Extension Pack Documentation
  - Thunder Client Documentation
  - Spring Boot + PostgreSQL setup guide
- **Deliverable:** ✅ GitHub repo with working Spring Boot project + 1 health check endpoint + PostgreSQL connected

---

## **WEEK 2: June 8-14 - Core Data Models & Database**

### **June 8-9 (Monday-Tuesday): User Model & Authentication Basics**
- **Learning Goal:** Create user system with secure password handling
- **Topics:**
  - Password hashing (bcrypt)
  - User entity design (id, email, password, name)
  - Spring Security basics
  - JWT tokens (optional but recommended)
- **Time:** 2-3 hours/day
- **Tasks:**
  1. Watch Spring Security tutorial
  2. Create User entity class with proper annotations
  3. Create UserRepository (JPA repository)
  4. Understand password encoding concepts
  5. Set up basic entity relationships
- **Resources:**
  - Spring Security Official Docs
  - Baeldung: Spring Security Password Encoding
  - Entity design best practices
- **Deliverable:** User entity + repository (no endpoints yet)

### **June 10-11 (Wednesday-Thursday): Expense Model & Relationships**
- **Learning Goal:** Design expense data model and connect to users
- **Topics:**
  - Expense entity (id, amount, category, date, description, userId)
  - One-to-Many relationships (1 User → Many Expenses)
  - JPA annotations (@Entity, @Id, @ManyToOne, @OneToMany, etc.)
  - Cascading operations
- **Time:** 2-3 hours/day
- **Tasks:**
  1. Create Expense entity class with validation
  2. Create ExpenseRepository with custom queries
  3. Set up One-to-Many relationship between User and Expense
  4. Test JPA queries with Thunder Client or simple tests
  5. Verify data persists to PostgreSQL
- **Resources:**
  - JPA Relationships Guide (Baeldung)
  - Spring Data JPA Documentation
- **Deliverable:** Expense entity + User-Expense relationship + verified in PostgreSQL

### **June 12-14 (Friday-Sunday): Build CRUD Endpoints (Part 1)**
- **Learning Goal:** Create basic API endpoints for expenses
- **Topics:**
  - @RestController and @RequestMapping
  - @PostMapping, @GetMapping
  - Request bodies and response entities
  - Exception handling
- **Time:** 3-4 hours/day
- **Tasks:**
  1. Create ExpenseController class
  2. Build POST /api/expenses (create expense)
  3. Build GET /api/expenses (get all expenses for user)
  4. Build GET /api/expenses/{id} (get single expense)
  5. Test all endpoints with Thunder Client
  6. Verify data is saved to PostgreSQL database
  7. Commit to GitHub with message: "Add expense CRUD endpoints"
- **Resources:**
  - Spring Web MVC Documentation
  - RESTful API best practices
  - Thunder Client request testing
- **Deliverable:** ✅ 3 working REST endpoints + GitHub commit + data persisting to PostgreSQL

---

## **WEEK 3: June 15-21 - Complete CRUD & User Features**

### **June 15-16 (Monday-Tuesday): Finish CRUD Endpoints**
- **Learning Goal:** Complete all CRUD operations
- **Topics:**
  - PUT mapping (update operations)
  - DELETE mapping (delete operations)
  - Request validation (@Valid, @NotNull)
  - Response status codes (201 Created, 204 No Content, etc.)
- **Time:** 2-3 hours/day
- **Tasks:**
  1. Build PUT /api/expenses/{id} (update expense)
  2. Build DELETE /api/expenses/{id} (delete expense)
  3. Add category field to Expense with validation
  4. Add @Valid annotation to validate expense data
  5. Test all CRUD operations with Thunder Client
  6. Verify updates and deletes work in PostgreSQL
- **Deliverable:** Full CRUD operations working

### **June 17-18 (Wednesday-Thursday): User Authentication**
- **Learning Goal:** Implement secure user login and registration
- **Topics:**
  - User registration flow
  - User login flow
  - Password encoding and verification
  - Authentication tokens (JWT recommended)
  - Spring Security filters
- **Time:** 3-4 hours/day
- **Tasks:**
  1. Create AuthController
  2. Build POST /api/auth/register (user signup) with password hashing
  3. Build POST /api/auth/login (user login)
  4. Implement token generation (JWT)
  5. Add security filters to protect endpoints
  6. Test authentication flow with Thunder Client
- **Resources:**
  - Spring Security in Action
  - JWT Guide (jwt.io)
  - Bcrypt password encoding tutorial
- **Deliverable:** Login/Register endpoints + authentication working

### **June 19-21 (Friday-Sunday): Add Business Logic**
- **Learning Goal:** Implement budget tracking features
- **Topics:**
  - Budget limit calculations
  - Category-based budgets
  - Alert/notification logic
  - Monthly summaries
- **Time:** 3-4 hours/day
- **Tasks:**
  1. Create Budget entity (category, limit, userId) with PostgreSQL persistence
  2. Create BudgetRepository and BudgetController
  3. Build POST /api/budgets (create budget limit)
  4. Build GET /api/expenses/summary?month=6&year=2026 (monthly summary)
  5. Implement expense validation against budget
  6. Test all features with Thunder Client
  7. Commit to GitHub with message: "Add authentication and budget tracking"
- **Deliverable:** ✅ Full CRUD + Auth + Budget logic working with PostgreSQL

---

## **WEEK 4: June 22-30 - Frontend & Deployment**

### **June 22-23 (Monday-Tuesday): Choose & Set Up Frontend**
- **Learning Goal:** Decide on frontend approach and set up
- **Options:**
  - **Option A (Easier):** HTML + CSS + JavaScript
  - **Option B (Modern):** React
- **Time:** 2-3 hours/day
- **Tasks:**
  - Choose your frontend approach
  - Set up project structure
  - Create basic folder structure
  - Watch frontend tutorial for your chosen stack
- **Resources:**
  - For HTML/JS: MDN Web Docs
  - For React: React Official Tutorial
- **Deliverable:** Frontend project set up

### **June 24-25 (Wednesday-Thursday): Build UI Components**
- **Learning Goal:** Create user interface for core features
- **Time:** 3-4 hours/day
- **Tasks:**
  1. Create login/register form
  2. Create add expense form
  3. Create expense list display
  4. Add category dropdown
  5. Basic styling (CSS)
- **Deliverable:** Functional UI components (not connected yet)

### **June 26-27 (Friday-Saturday): Connect Frontend to Backend**
- **Learning Goal:** Link UI with API endpoints
- **Topics:**
  - Fetch API or Axios
  - Handling API responses
  - Error handling
  - Loading states
  - CORS configuration
- **Time:** 3-4 hours/day
- **Tasks:**
  1. Set up Fetch API calls to backend endpoints
  2. Test login/register from UI
  3. Test create/read/delete expenses from UI
  4. Handle errors gracefully
  5. Add loading indicators
  6. Commit to GitHub
- **Resources:**
  - MDN Fetch API
  - Axios Documentation
- **Deliverable:** Frontend connected to backend APIs

### **June 28-29 (Sunday-Monday): Add Visualization**
- **Learning Goal:** Display data with charts
- **Topics:**
  - Chart libraries (Chart.js, Recharts, or similar)
  - Pie charts, line graphs
  - Data formatting for charts
- **Time:** 2-3 hours/day
- **Tasks:**
  1. Choose chart library
  2. Add pie chart (spending by category)
  3. Add line graph (spending trend over days/weeks)
  4. Test with real data from PostgreSQL
- **Resources:**
  - Chart.js Documentation
  - Recharts (if using React)
- **Deliverable:** Working data visualizations

### **June 30 (Tuesday): Testing, Deployment & Documentation**
- **Learning Goal:** Deploy live and document everything
- **Time:** 3-4 hours
- **Tasks:**
  1. Write basic unit tests (optional)
  2. Test full application flow end-to-end
  3. Create comprehensive README.md with:
     - Project overview
     - Tech stack used (Spring Boot, PostgreSQL, React/HTML/JS, etc.)
     - Setup instructions for PostgreSQL and Spring Boot
     - API documentation
     - Screenshots
  4. Deploy to Heroku, Railway, or Render (free tier) with PostgreSQL
  5. Final commit and push
  6. Share live link
- **Resources:**
  - Heroku/Railway deployment guides
  - README templates
  - Deploying Spring Boot with PostgreSQL
- **Deliverable:** ✅ Live deployed application with PostgreSQL + full documentation

---

## **PostgreSQL Setup Summary (Quick Reference)**

### **Installation Steps:**
1. Download from https://www.postgresql.org/download/
2. Run installer and follow prompts
3. Remember the `postgres` password
4. PostgreSQL runs as background service (auto-starts)

### **Create Database:**
```sql
psql -U postgres
CREATE DATABASE budget_tracker;
\q
```

### **Spring Boot Configuration (application.properties):**
```properties
# PostgreSQL Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/budget_tracker
spring.datasource.username=postgres
spring.datasource.password=YOUR_PASSWORD_HERE
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

### **Verify Connection in Spring Boot:**
- Create GET /api/health endpoint
- Test with Thunder Client
- Check PostgreSQL logs for connection confirmation
- Query database directly to verify data persistence

---

## **Development Environment Setup**

### **Your Complete Tech Stack:**

| Component | Tool | Purpose |
|-----------|------|---------|
| **IDE** | VS Code | Code editing |
| **Java Support** | Extension Pack for Java | Java development |
| **Spring Boot Tools** | Spring Boot Extension Pack | Spring Boot dev tools |
| **API Testing** | Thunder Client | Test REST endpoints |
| **Database** | PostgreSQL | Persistent data storage |
| **Version Control** | Git + GitHub | Track changes |
| **Build Tool** | Maven (via Spring Boot) | Dependency management |

### **Why This Stack:**
- ✅ Lightweight and fast (VS Code)
- ✅ Professional-grade database (PostgreSQL)
- ✅ All tools integrated in VS Code
- ✅ No context switching between apps
- ✅ Skills directly transfer to professional environments
- ✅ Industry-standard setup

---

## **Daily Routine Template**

### **Each Day (3-4 hours total):**
1. **30 mins:** Review previous day's notes
2. **1-1.5 hours:** Learn new concepts (watch tutorials, read docs)
3. **1-1.5 hours:** Code and implement
4. **30 mins:** Test and commit changes
5. **15 mins:** Document what you learned

---

## **Milestones to Track**

- [ ] **June 7:** Working Spring Boot project with PostgreSQL connected
- [ ] **June 14:** 3 CRUD endpoints for expenses with PostgreSQL
- [ ] **June 21:** Complete CRUD + Authentication + Budget logic
- [ ] **June 27:** Frontend fully connected to backend
- [ ] **June 30:** Live deployed application with PostgreSQL + documentation

---

## **Important Notes**

1. **If you fall behind:** Don't worry! Just continue with the next topic. You can revisit concepts later.
2. **If something is confusing:** Stop and ask me! I'm here to explain concepts clearly.
3. **PostgreSQL Setup:** Takes 30-60 mins on June 3, but worth it. Ask if you hit issues!
4. **Commit daily:** Even small changes. This builds good habits and tracks progress.
5. **Test frequently:** Use Thunder Client to test endpoints as you build them.
6. **Learn by doing:** Reading alone isn't enough. Code along with tutorials.

---

## **Resources Summary**

| Resource | URL |
|----------|-----|
| Spring Boot Docs | https://spring.io/projects/spring-boot |
| Spring Data JPA | https://spring.io/projects/spring-data-jpa |
| Spring Security | https://spring.io/projects/spring-security |
| Baeldung Tutorials | https://www.baeldung.com |
| Spring Initializr | https://start.spring.io |
| PostgreSQL Download | https://www.postgresql.org/download/ |
| PostgreSQL Documentation | https://www.postgresql.org/docs/ |
| VS Code | https://code.visualstudio.com |
| Extension Pack for Java | https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack |
| Spring Boot Extension Pack | https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-spring-boot |
| Thunder Client | https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client |
| Chart.js | https://www.chartjs.org |
| Heroku Docs | https://devcenter.heroku.com |
| Validation Annotations | https://www.baeldung.com/spring-valid-annotation |
| JWT Guide | https://jwt.io |

---

## **Final Thoughts**

By June 30, you'll have:
- ✅ Deep understanding of Spring Boot & REST APIs
- ✅ Real-world database design experience with PostgreSQL
- ✅ Authentication & security knowledge
- ✅ A full-stack application on GitHub
- ✅ A deployed live project with real database
- ✅ Professional-grade experience for your portfolio
- ✅ Valuable portfolio piece as a first-year CS student

**You made the right choice going with PostgreSQL. This experience will be invaluable!**

**Good luck! You've got this! 🚀**

---

**Need help?** Just ask me at any point during the month. I'm here to explain concepts, review code, debug PostgreSQL issues, or help with anything else!
