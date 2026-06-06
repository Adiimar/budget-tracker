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

### **June 3-4 (Wednesday-Thursday): Database & JPA Basics + Practical Setup**
- **Learning Goal:** Understand how data is stored and retrieved + hands-on database configuration
- **Topics:**
  - Relational databases (tables, primary keys, relationships)
  - SQL basics (SELECT, INSERT, UPDATE, DELETE)
  - JPA/Hibernate (Object-Relational Mapping)
  - Entity relationships (One-to-Many, Many-to-One)
  - **NEW: Spring Boot application.properties configuration**
  - **NEW: Database connection setup (PostgreSQL or H2)**
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
  - PostgreSQL or H2 setup guides
  - Validation annotations guide (javax.validation)

- **Tasks:**

  **Day 1 (June 3):**
  1. Review SQL basics and JPA concepts
  2. Install PostgreSQL locally OR decide to use H2 (simpler for starting)
  3. Learn Spring Boot `application.properties` configuration
  4. Understand cascading and fetch types
  5. Learn validation annotations and when to use them
  6. Watch tutorial on database setup with Spring Boot

  **Day 2 (June 4):**
  1. Practice writing custom JPA queries:
     - Find all expenses for a user between two dates
     - Find total amount spent in a category
     - Find expenses exceeding a certain amount
  2. Learn LocalDate handling in entity fields
  3. Create sample User and Expense entities locally (test with H2 or PostgreSQL)
  4. Write simple test to verify entities save correctly to database
  5. Test repository query methods

- **Deliverable:** Understanding of practical database setup + sample tested entities (no Spring Boot app yet)

### **June 5-7 (Friday-Sunday): Project Setup & First Endpoint**
- **Learning Goal:** Set up your development environment and create first API
- **Tasks:**
  1. Install JDK 17+ (if not already)
  2. Install VS Code with Java extensions:
     - **Extension Pack for Java** (by Microsoft)
     - **Spring Boot Extension Pack** (by Pivotal/VMware)
     - **Thunder Client** (for testing REST endpoints)
  3. Create Spring Boot project using Spring Initializr
  4. Set up PostgreSQL locally (or use H2 database for now)
  5. Create your first REST endpoint (GET /api/health)
  6. Test with Thunder Client
  7. Push to GitHub
- **Time:** 3-4 hours/day
- **Resources:**
  - Spring Initializr (start.spring.io)
  - Spring Boot Getting Started Guide
  - VS Code Java Extension Pack Documentation
  - Thunder Client Documentation
- **Deliverable:** ✅ GitHub repo with working Spring Boot project + 1 endpoint

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
  2. Create User entity class
  3. Create UserRepository (JPA repository)
  4. Understand password encoding
- **Resources:**
  - Spring Security Official Docs
  - Baeldung: Spring Security Password Encoding
- **Deliverable:** User entity + repository (no endpoints yet)

### **June 10-11 (Wednesday-Thursday): Expense Model & Relationships**
- **Learning Goal:** Design expense data model and connect to users
- **Topics:**
  - Expense entity (id, amount, category, date, description, userId)
  - One-to-Many relationships (1 User → Many Expenses)
  - JPA annotations (@Entity, @Id, @ManyToOne, etc.)
  - Cascading operations
- **Time:** 2-3 hours/day
- **Tasks:**
  1. Create Expense entity class
  2. Create ExpenseRepository
  3. Set up relationship between User and Expense
  4. Test JPA queries in a simple test
- **Resources:**
  - JPA Relationships Guide (Baeldung)
  - Spring Data JPA Documentation
- **Deliverable:** Expense entity + User-Expense relationship

### **June 12-14 (Friday-Sunday): Build CRUD Endpoints (Part 1)**
- **Learning Goal:** Create basic API endpoints for expenses
- **Topics:**
  - @RestController and @RequestMapping
  - @PostMapping, @GetMapping
  - Request bodies and response entities
  - Exception handling
- **Time:** 3-4 hours/day
- **Tasks:**
  1. Create ExpenseController
  2. Build POST /api/expenses (create expense)
  3. Build GET /api/expenses (get all expenses for user)
  4. Build GET /api/expenses/{id} (get single expense)
  5. Test all endpoints with Thunder Client
  6. Commit to GitHub
- **Resources:**
  - Spring Web MVC Documentation
  - RESTful API best practices
- **Deliverable:** ✅ 3 working REST endpoints + GitHub commit

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
  3. Add category field to Expense
  4. Add validation to expense data
  5. Test all CRUD operations
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
  2. Build POST /api/auth/register (user signup)
  3. Build POST /api/auth/login (user login)
  4. Implement token generation
  5. Add security filters to protect endpoints
  6. Test authentication flow
- **Resources:**
  - Spring Security in Action
  - JWT Guide (jwt.io)
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
  1. Create Budget entity (category, limit, userId)
  2. Create BudgetRepository and BudgetController
  3. Build POST /api/budgets (create budget limit)
  4. Build GET /api/expenses/summary?month=6&year=2026 (monthly summary)
  5. Implement expense validation against budget
  6. Test all features
  7. Commit to GitHub
- **Deliverable:** ✅ Full CRUD + Auth + Budget logic working

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
  1. Set up Fetch API calls
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
  4. Test with real data
- **Resources:**
  - Chart.js Documentation
  - Recharts (if using React)
- **Deliverable:** Working data visualizations

### **June 30 (Tuesday): Testing, Deployment & Documentation**
- **Learning Goal:** Deploy live and document everything
- **Time:** 3-4 hours
- **Tasks:**
  1. Write basic unit tests (optional)
  2. Test full application flow
  3. Create comprehensive README.md with:
     - Project overview
     - Tech stack used
     - Setup instructions
     - API documentation
     - Screenshots
  4. Deploy to Heroku, Railway, or Render (free tier)
  5. Final commit and push
  6. Share live link
- **Resources:**
  - Heroku/Railway deployment guides
  - README templates
- **Deliverable:** ✅ Live deployed application + full documentation

---

## **Development Environment Setup**

### **IDE & Tools You'll Use:**

**VS Code with Extensions:**
- **Extension Pack for Java** (by Microsoft) - Complete Java support
- **Spring Boot Extension Pack** (by Pivotal/VMware) - Spring Boot development tools
- **Thunder Client** (by Rangav) - REST API testing (instead of Postman)

**Why This Stack:**
- ✅ Lightweight and fast
- ✅ All-in-one in VS Code (no need for external tools)
- ✅ Free and open source
- ✅ Perfect for Spring Boot development
- ✅ Thunder Client built-in = no context switching between apps

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

- [ ] **June 7:** Working Spring Boot project with first endpoint
- [ ] **June 14:** 3 CRUD endpoints for expenses
- [ ] **June 21:** Complete CRUD + Authentication + Budget logic
- [ ] **June 27:** Frontend fully connected to backend
- [ ] **June 30:** Live deployed application with documentation

---

## **Important Notes**

1. **If you fall behind:** Don't worry! Just continue with the next topic. You can revisit concepts later.
2. **If something is confusing:** Stop and ask me! I'm here to explain concepts clearly.
3. **Commit daily:** Even small changes. This builds good habits and tracks progress.
4. **Test frequently:** Don't wait until the end to test your code.
5. **Learn by doing:** Reading alone isn't enough. Code along with tutorials.

---

## **Resources Summary**

| Resource | URL |
|----------|-----|
| Spring Boot Docs | https://spring.io/projects/spring-boot |
| Spring Data JPA | https://spring.io/projects/spring-data-jpa |
| Spring Security | https://spring.io/projects/spring-security |
| Baeldung Tutorials | https://www.baeldung.com |
| Spring Initializr | https://start.spring.io |
| VS Code | https://code.visualstudio.com |
| Extension Pack for Java | https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack |
| Spring Boot Extension Pack | https://marketplace.visualstudio.com/items?itemName=Pivotal.vscode-spring-boot |
| Thunder Client | https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client |
| PostgreSQL | https://www.postgresql.org |
| Chart.js | https://www.chartjs.org |
| Heroku Docs | https://devcenter.heroku.com |
| Validation Annotations | https://www.baeldung.com/spring-valid-annotation |

---

## **Final Thoughts**

By June 30, you'll have:
- ✅ Deep understanding of Spring Boot & REST APIs
- ✅ Real-world database design experience
- ✅ Authentication & security knowledge
- ✅ A full-stack application on GitHub
- ✅ A deployed live project to show employers/universities
- ✅ Valuable portfolio piece as a first-year CS student

**Good luck! You've got this! 🚀**

---

**Need help?** Just ask me at any point during the month. I'm here to explain concepts, review code, or debug issues!
