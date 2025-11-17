# SpaceNow Backend API

ASP.NET Core Web API with Supabase (PostgreSQL) integration for managing records.

## 📋 Overview

This is a .NET 8 backend API that provides CRUD operations for managing records stored in a Supabase PostgreSQL database. The API includes Swagger/OpenAPI documentation for easy testing and integration.

## 🛠️ Technologies

- **.NET 8** - Latest LTS version of .NET
- **ASP.NET Core Web API** - RESTful API framework
- **Entity Framework Core 8.0** - ORM for database access
- **Npgsql** - PostgreSQL provider for EF Core
- **Supabase PostgreSQL** - Cloud-hosted PostgreSQL database
- **Swagger/OpenAPI** - API documentation and testing UI

## 📁 Project Structure

```
backend/
├── SpaceNow.Backend.sln              # Solution file
└── SpaceNow.Backend.Api/             # Main API project
    ├── Controllers/                  # API controllers
    │   └── RecordsController.cs      # CRUD endpoints for records
    ├── Data/                         # Database context
    │   └── AppDbContext.cs           # EF Core DbContext
    ├── Models/                       # Entity models
    │   └── Record.cs                 # Record entity
    ├── Program.cs                    # Application entry point
    └── appsettings.json              # Configuration file
```

## 🚀 Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) installed
- Supabase account with a PostgreSQL database
- (Optional) [dotnet-ef](https://learn.microsoft.com/en-us/ef/core/cli/dotnet) tool for migrations

### 1. Set Up Supabase Database

1. Create a free account at [Supabase](https://supabase.com/)
2. Create a new project
3. Go to **Settings** → **Database**
4. Copy your connection string. It should look like:
   ```
   postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres
   ```
   
   Or in the format:
   ```
   Host=db.[project-ref].supabase.co;Database=postgres;Username=postgres;Password=[your-password];Port=5432;SSL Mode=Require;Trust Server Certificate=true
   ```

### 2. Configure Database Connection

You have two options for configuring the database connection:

#### Option A: Environment Variable (Recommended for Production)

Set the `SUPABASE_CONNECTION_STRING` environment variable:

**Windows (PowerShell):**
```powershell
$env:SUPABASE_CONNECTION_STRING="Host=db.xxxxx.supabase.co;Database=postgres;Username=postgres;Password=your-password;Port=5432;SSL Mode=Require;Trust Server Certificate=true"
```

**Windows (Command Prompt):**
```cmd
set SUPABASE_CONNECTION_STRING=Host=db.xxxxx.supabase.co;Database=postgres;Username=postgres;Password=your-password;Port=5432;SSL Mode=Require;Trust Server Certificate=true
```

**Linux/macOS:**
```bash
export SUPABASE_CONNECTION_STRING="Host=db.xxxxx.supabase.co;Database=postgres;Username=postgres;Password=your-password;Port=5432;SSL Mode=Require;Trust Server Certificate=true"
```

**Permanent (add to ~/.bashrc or ~/.zshrc):**
```bash
echo 'export SUPABASE_CONNECTION_STRING="Host=db.xxxxx.supabase.co;Database=postgres;Username=postgres;Password=your-password;Port=5432;SSL Mode=Require;Trust Server Certificate=true"' >> ~/.bashrc
source ~/.bashrc
```

#### Option B: appsettings.json (For Development Only)

Update `backend/SpaceNow.Backend.Api/appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=db.xxxxx.supabase.co;Database=postgres;Username=postgres;Password=your-password;Port=5432;SSL Mode=Require;Trust Server Certificate=true"
  }
}
```

⚠️ **IMPORTANT:** Never commit `appsettings.Development.json` with real credentials to version control!

### 3. Install Dependencies

```bash
cd backend
dotnet restore
```

### 4. Create and Run Database Migrations

Install the EF Core tools (if not already installed):

```bash
dotnet tool install --global dotnet-ef
```

Create the initial migration:

```bash
cd SpaceNow.Backend.Api
dotnet ef migrations add InitialCreate
```

Apply the migration to create the database tables:

```bash
dotnet ef database update
```

This will create the `records` table in your Supabase database with the following schema:

| Column      | Type         | Description                    |
|-------------|--------------|--------------------------------|
| Id          | int          | Primary key (auto-increment)   |
| Title       | varchar(200) | Required, record title         |
| Description | varchar(1000)| Optional, record description   |
| CreatedAt   | timestamp    | Auto-set to UTC time on create |

### 5. Run the Application

```bash
cd backend/SpaceNow.Backend.Api
dotnet run
```

Or from the solution root:

```bash
cd backend
dotnet run --project SpaceNow.Backend.Api
```

The API will start on:
- **HTTP:** `http://localhost:5000`
- **HTTPS:** `https://localhost:5001`

### 6. Access Swagger UI

Open your browser and navigate to:
```
http://localhost:5000/swagger
```

You'll see the interactive Swagger documentation where you can test all API endpoints.

## 📡 API Endpoints

All endpoints are under the `/api/records` route:

| Method | Endpoint              | Description                | Request Body | Response      |
|--------|-----------------------|----------------------------|--------------|---------------|
| GET    | `/api/records`        | Get all records            | -            | Record[]      |
| GET    | `/api/records/{id}`   | Get a specific record      | -            | Record        |
| POST   | `/api/records`        | Create a new record        | Record       | Record        |
| PUT    | `/api/records/{id}`   | Update an existing record  | Record       | 204 No Content|
| DELETE | `/api/records/{id}`   | Delete a record            | -            | 204 No Content|

### Record Model

```json
{
  "id": 0,
  "title": "string",
  "description": "string",
  "createdAt": "2025-11-14T00:00:00Z"
}
```

## 🧪 Testing the API

### Using Swagger UI

1. Navigate to `http://localhost:5000/swagger`
2. Expand any endpoint (e.g., `POST /api/records`)
3. Click "Try it out"
4. Fill in the request body
5. Click "Execute"

### Using curl

**Create a record:**
```bash
curl -X POST http://localhost:5000/api/records \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Record","description":"This is a test record"}'
```

**Get all records:**
```bash
curl http://localhost:5000/api/records
```

**Get a specific record:**
```bash
curl http://localhost:5000/api/records/1
```

**Update a record:**
```bash
curl -X PUT http://localhost:5000/api/records/1 \
  -H "Content-Type: application/json" \
  -d '{"id":1,"title":"Updated Title","description":"Updated description","createdAt":"2025-11-14T00:00:00Z"}'
```

**Delete a record:**
```bash
curl -X DELETE http://localhost:5000/api/records/1
```

### Using PowerShell (Windows)

**Create a record:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/records" -Method POST -ContentType "application/json" -Body '{"title":"My First Record","description":"This is a test record"}'
```

**Get all records:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/records" -Method GET
```

## ⚙️ Configuration Options

### Enable Swagger in Production

By default, Swagger is only enabled in Development mode. To enable it in Production:

```bash
export ENABLE_SWAGGER_IN_PROD=true
```

Or in Windows:
```powershell
$env:ENABLE_SWAGGER_IN_PROD="true"
```

### Development Seed Data

In Development mode, the database is seeded with 3 sample records on first migration. This can be disabled by modifying the `OnModelCreating` method in `AppDbContext.cs`.

## 🔒 Security Best Practices

1. **Never commit credentials** to version control
2. Always use environment variables for sensitive data (connection strings, API keys)
3. Use strong passwords for your Supabase database
4. In production, consider:
   - Using Azure Key Vault or similar secret management
   - Enabling HTTPS only (`app.UseHttpsRedirection()`)
   - Adding authentication/authorization to API endpoints
   - Rate limiting and request throttling
   - CORS configuration for allowed origins

## 🐛 Troubleshooting

### "Database connection string not found" Error

**Problem:** The application can't find the connection string.

**Solution:** Make sure you've set the `SUPABASE_CONNECTION_STRING` environment variable or configured it in `appsettings.Development.json`.

### Migration Errors

**Problem:** `dotnet ef database update` fails.

**Solution:** 
- Verify your connection string is correct
- Check that your Supabase database is accessible
- Ensure you have network connectivity to Supabase
- Try adding `;Timeout=30` to your connection string

### SSL/TLS Errors

**Problem:** SSL certificate validation errors when connecting to Supabase.

**Solution:** Add `SSL Mode=Require;Trust Server Certificate=true` to your connection string.

### Port Already in Use

**Problem:** Port 5000 or 5001 is already in use.

**Solution:** Change the port in `Properties/launchSettings.json` or kill the process using the port:

**Windows:**
```powershell
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Linux/macOS:**
```bash
lsof -ti:5000 | xargs kill -9
```

## 📚 Additional Resources

- [ASP.NET Core Documentation](https://docs.microsoft.com/en-us/aspnet/core/)
- [Entity Framework Core Documentation](https://docs.microsoft.com/en-us/ef/core/)
- [Supabase Documentation](https://supabase.com/docs)
- [Swagger/OpenAPI Specification](https://swagger.io/specification/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
