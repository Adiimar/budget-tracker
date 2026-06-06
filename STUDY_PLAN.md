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

### **June 3-4 (Wednesday-Thursday): Database & JPA Basics + PostgreSQL Setup in VS Code**
- **Learning Goal:** Understand how data is stored and retrieved + hands-on database configuration with PostgreSQL in VS Code
- **Topics:**
  - Relational databases (tables, primary keys, relationships)
  - SQL basics (SELECT, INSERT, UPDATE, DELETE)
  - JPA/Hibernate (Object-Relational Mapping)
  - Entity relationships (One-to-Many, Many-to-One)
  - **NEW: PostgreSQL installation and setup**
  - **NEW: PostgreSQL integration with VS Code extensions**
  - **NEW: Spring Boot application.properties configuration for PostgreSQL**
  - **NEW: Database connection setup and testing in VS Code**
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

  **Day 1 (June 3): PostgreSQL Setup in VS Code + JPA Concepts**
  
  **Part A: PostgreSQL Installation & VS Code Integration (60-90 mins)**
  1. Download PostgreSQL from https://www.postgresql.org/download/
  2. Install PostgreSQL (Windows/Mac/Linux - follow installer defaults, remember the `postgres` password)
  3. After installation, open VS Code
  4. Install PostgreSQL VS Code extension:
     - Open Extensions tab (Ctrl+Shift+X / Cmd+Shift+X)
     - Search for "PostgreSQL" by Chris Kolkman
     - Click Install
  5. Open the PostgreSQL extension in VS Code (icon in left sidebar)
  6. Click "Create Connection" or "+" button
  7. Fill in connection details:
     - Host: localhost
     - Port: 5432
     - User: postgres
     - Password: [the password you set during installation]
     - Database: postgres (initially)
     - SSL: Standard (or None)
  8. Test connection (you should see "✓ Connected")
  9. Right-click on the connection → "Create Database"
  10. Name it: `budget_tracker`
  11. Verify database appears in the PostgreSQL explorer in VS Code
  
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
  4. Know how to test the connection in Spring Boot
  
  **Part B: Practice JPA Queries & Entities (90 mins)**
  1. Practice writing custom JPA queries:
     - Find all expenses for a user between two dates
     - Find total amount spent in a category
     - Find expenses exceeding a certain amount
  2. Learn LocalDate handling in entity fields
  3. Create sample User and Expense entity classes locally
  4. Understand validation annotations usage in your entities
  5. Know how to test repository query methods

- **Deliverable:** ✅ PostgreSQL installed and connected in VS Code + Understanding of Spring Boot DB config + Sample entity classes

### **June 5-7 (Friday-Sunday): Project Setup & First Endpoint**
- **Learning Goal:** Set up your Spring Boot project in VS Code and create first API
- **Tasks:**
  1. Install JDK 17+ (if not already)
  2. Install VS Code extensions (if not already done):
     - **Extension Pack for Java** (by Microsoft) - Search in Extensions tab, click Install
     - **Spring Boot Extension Pack** (by Pivotal/VMware) - Search in Extensions tab, click Install
     - **PostgreSQL** (by Chris Kolkman) - For managing your database
     - **Thunder Client** (by Rangav) - For testing REST endpoints
     - **Lombok** (optional, but helpful) - Reduces boilerplate code
  3. Create Spring Boot project using Spring Initializr (https://start.spring.io):
     - Project: Maven
     - Language: Java
     - Spring Boot: 3.x (latest stable)
     - Project Name: budget-tracker
     - Package Name: com.example.budgettracker
     - Dependencies: Spring Web, Spring Data JPA, PostgreSQL Driver, Validation
  4. Download project and open in VS Code (File → Open Folder)
  5. Wait for dependencies to download (check Maven icon in sidebar)
  6. Open PostgreSQL explorer in VS Code and select your `budget_tracker` connection
  7. Configure `application.properties` with PostgreSQL connection details:
     ```properties
     spring.datasource.url=jdbc:postgresql://localhost:5432/budget_tracker
     spring.datasource.username=postgres
     spring.datasource.password=YOUR_PASSWORD_HERE
     spring.jpa.hibernate.ddl-auto=update
     spring.jpa.show-sql=true
     ```
  8. Create your first REST endpoint (GET /api/health) in a new Controller class
  9. Run Spring Boot app using Spring Boot Dashboard (bottom left in VS Code)
  10. Check console for "Started BudgetTrackerApplication" message
  11. Test with Thunder Client:
      - Open Thunder Client in sidebar
      - Create new request
      - URL: http://localhost:8080/api/health
      - Method: GET
      - Click "Send"
      - You should see 200 response with "ok" message
  12. In VS Code PostgreSQL explorer, check that Spring Boot created tables (refresh connection)
  13. Push to GitHub with message: "Initial Spring Boot setup with PostgreSQL in VS Code"
- **Time:** 3-4 hours/day
- **Resources:**
  - Spring Initializr (start.spring.io)
  - Spring Boot Getting Started Guide
  - VS Code Java Extension Pack Documentation
  - PostgreSQL Extension for VS Code Documentation
  - Thunder Client Documentation
  - Spring Boot + PostgreSQL setup guide
- **Deliverable:** ✅ GitHub repo with working Spring Boot project + 1 health check endpoint + PostgreSQL connected and visible in VS Code

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
  6. Use VS Code PostgreSQL explorer to view created tables
- **Resources:**
  - Spring Security Official Docs
  - Baeldung: Spring Security Password Encoding
  - Entity design best practices
- **Deliverable:** User entity + repository + visible in VS Code PostgreSQL explorer

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
  4. Test JPA queries with Thunder Client
  5. Verify data persists to PostgreSQL
  6. Query data directly in VS Code using PostgreSQL explorer
- **Resources:**
  - JPA Relationships Guide (Baeldung)
  - Spring Data JPA Documentation
- **Deliverable:** Expense entity + User-Expense relationship + verified in VS Code PostgreSQL explorer

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
  6. Verify data is saved to PostgreSQL by querying in VS Code explorer
  7. Commit to GitHub with message: "Add expense CRUD endpoints"
- **Resources:**
  - Spring Web MVC Documentation
  - RESTful API best practices
  - Thunder Client request testing
- **Deliverable:** ✅ 3 working REST endpoints + GitHub commit + data persisting to PostgreSQL (verified in VS Code)

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
  6. Verify updates and deletes work in PostgreSQL using VS Code explorer
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
  7. Monitor database changes in VS Code PostgreSQL explorer
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
  7. Query budget and expense data in VS Code PostgreSQL explorer
  8. Commit to GitHub with message: "Add authentication and budget tracking"
- **Deliverable:** ✅ Full CRUD + Auth + Budget logic working with PostgreSQL (visible in VS Code)

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

## **VS Code PostgreSQL Integration Setup (Complete Guide)**

### **PostgreSQL Extension in VS Code:**

The **PostgreSQL by Chris Kolkman** extension allows you to:
- ✅ Manage databases directly in VS Code
- ✅ Write and execute SQL queries
- ✅ View tables, columns, and relationships
- ✅ Monitor data changes in real-time
- ✅ No need to switch between apps

### **Installation (One-time setup on June 3):**
1. Open VS Code Extensions (Ctrl+Shift+X / Cmd+Shift+X)
2. Search: "PostgreSQL"
3. Install the one by **Chris Kolkman** (most popular)
4. You'll see a database icon in the left sidebar

### **Creating Connection (First time on June 3):**
```
1. Click PostgreSQL icon in sidebar
2. Click "Create Connection" or "+"
3. Enter details:
   - Host: localhost
   - Port: 5432
   - User: postgres
   - Password: [your postgres password]
   - Database: postgres
   - SSL: Standard
4. Click "Save Connection"
5. You'll see it in the sidebar (should show ✓ Connected)
```

### **Creating Database in VS Code:**
```
1. Right-click on your connection in sidebar
2. Select "Create Database"
3. Name: budget_tracker
4. Database appears in the tree under your connection
5. Click it to expand and see tables
```

### **Using PostgreSQL Explorer:**
```
Your Connection
├── Databases
│   ├── postgres (default)
│   ├── budget_tracker (your app database)
│       ├── Tables
│       │   ├── users
│       │   ├── expenses
│       │   └── budgets
│       └── Views
├── Schemas
└── Functions
```

### **Querying Data in VS Code:**
1. Right-click on a table
2. Select "Run SELECT" or "Select Top 1000"
3. Query results open in a new editor
4. You can write custom SQL queries too

### **Benefits of VS Code Integration:**
- ✅ Never leave VS Code during development
- ✅ Instantly verify data was saved
- ✅ Query results side-by-side with code
- ✅ Monitor database during testing
- ✅ Easier debugging of data issues

---

## **Development Environment Setup**

### **Your Complete Tech Stack (All in VS Code):**

| Component | Tool | Purpose | Location |
|-----------|------|---------|----------|
| **IDE** | VS Code | Code editing | Main editor |
| **Java Support** | Extension Pack for Java | Java development | Left sidebar |
| **Spring Boot Tools** | Spring Boot Extension Pack | Spring Boot dev tools | Command palette |
| **Database** | PostgreSQL by Chris Kolkman | Manage & query database | Left sidebar |
| **API Testing** | Thunder Client | Test REST endpoints | Left sidebar |
| **Build Tool** | Maven (via Spring Boot) | Dependency management | Terminal |
| **Version Control** | Git | Track changes | Source Control sidebar |

### **Why This Stack:**
- ✅ Everything in one window (no context switching)
- ✅ Professional-grade tools (PostgreSQL is industry standard)
- ✅ No need to open external apps
- ✅ Skills directly transfer to professional environments
- ✅ Faster workflow and easier debugging

---

## **Daily Routine Template**

### **Each Day (3-4 hours total):**
1. **30 mins:** Review previous day's notes
2. **1-1.5 hours:** Learn new concepts (watch tutorials, read docs)
3. **1-1.5 hours:** Code and implement
4. **30 mins:** Test endpoints (Thunder Client) + query database (PostgreSQL explorer)
5. **15 mins:** Document what you learned

---

## **Milestones to Track**

- [ ] **June 7:** Working Spring Boot project with PostgreSQL connected in VS Code
- [ ] **June 14:** 3 CRUD endpoints for expenses with PostgreSQL (verified in VS Code)
- [ ] **June 21:** Complete CRUD + Authentication + Budget logic
- [ ] **June 27:** Frontend fully connected to backend
- [ ] **June 30:** Live deployed application with PostgreSQL + documentation

---

## **Important Notes**

1. **If you fall behind:** Don't worry! Just continue with the next topic. You can revisit concepts later.
2. **If something is confusing:** Stop and ask me! I'm here to explain concepts clearly.
3. **PostgreSQL in VS Code:** Takes 30-60 mins on June 3, but keeps everything organized. Ask if you hit issues!
4. **Commit daily:** Even small changes. This builds good habits and tracks progress.
5. **Test frequently:** Use Thunder Client + PostgreSQL explorer together for debugging.
6. **Learn by doing:** Reading alone isn't enough. Code along with tutorials.

---

## **Quick Troubleshooting**

### **PostgreSQL Connection Won't Connect in VS Code:**
- ✅ Check PostgreSQL service is running (should be automatic)
- ✅ Verify password is correct
- ✅ Try port 5432 (default)
- ✅ Check if PostgreSQL installed correctly

### **Can't Create Database:**
- ✅ Make sure connection shows "✓ Connected"
- ✅ Right-click on connection name (not the database icon)
- ✅ Select "Create Database"

### **Tables Not Showing in Explorer:**
- ✅ Click the refresh icon next to your connection
- ✅ Make sure Spring Boot app is running
- ✅ Check Spring Boot console for errors

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
| PostgreSQL Extension | https://marketplace.visualstudio.com/items?itemName=ckolkman.vscode-postgres |
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
- ✅ Professional development workflow in VS Code
- ✅ A deployed live project with real database
- ✅ Valuable portfolio piece as a first-year CS student

**You're set up for success with a professional development environment!**

**Good luck! You've got this! 🚀**

---

**Need help?** Just ask me at any point during the month. I'm here to explain concepts, help with VS Code setup, debug PostgreSQL issues, or help with anything else!
