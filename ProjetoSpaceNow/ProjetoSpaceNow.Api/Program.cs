using Microsoft.EntityFrameworkCore;
using ProjetoSalas.Api.Data;
using System;

var builder = WebApplication.CreateBuilder(args);

// Conexão com Supabase
var connectionString = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// Controllers + Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger (habilitado mesmo em produção)
app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

app.Run();
