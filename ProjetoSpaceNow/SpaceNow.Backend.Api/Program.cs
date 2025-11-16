using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using SpaceNow.Backend.Api.Data;
using SpaceNow.Backend.Application.Interfaces;
using SpaceNow.Backend.Infrastructure.Auth;

var builder = WebApplication.CreateBuilder(args);

// Configure Database Connection
// Read connection string from environment variable or fallback to appsettings.json
var connectionString = Environment.GetEnvironmentVariable("SUPABASE_CONNECTION_STRING")
    ?? builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException(
        "Database connection string not found. Set SUPABASE_CONNECTION_STRING environment variable or configure DefaultConnection in appsettings.json");
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// Add Controllers
builder.Services.AddControllers();

builder.Services.AddScoped<IJwtProvider, JwtProvider>();

// Configure Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "SpaceNow Backend API",
        Version = "v1",
        Description = "ASP.NET Core Web API with Supabase (PostgreSQL) integration for managing records",
        Contact = new OpenApiContact
        {
            Name = "SpaceNow Team"
        }
    });
});

var app = builder.Build();

// Configure Swagger UI
// Enable in Development always, and in Production only if ENABLE_SWAGGER_IN_PROD=true
var enableSwaggerInProd = Environment.GetEnvironmentVariable("ENABLE_SWAGGER_IN_PROD")?.ToLower() == "true";

if (app.Environment.IsDevelopment() || enableSwaggerInProd)
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SpaceNow Backend API v1");
        c.RoutePrefix = "swagger"; // Access at http://localhost:5000/swagger
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
