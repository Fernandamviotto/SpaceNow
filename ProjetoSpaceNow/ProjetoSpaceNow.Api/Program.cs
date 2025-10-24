using DotNetEnv;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using ProjetoSpaceNow.Api.Interfaces.Repository;
using ProjetoSpaceNow.Api.Models;
using ProjetoSpaceNow.Api.Repositories;
using ProjetoSpaceNow.Api.Services;
using ProjetoSpaceNow.Api.Services.Interfaces;
using ProjetoSpaceNow.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables();

Console.WriteLine($"JWT Key carregada: {builder.Configuration["Jwt:Key"]}");

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));
builder.Services.Configure<SupabaseSettings>(builder.Configuration.GetSection("Supabase"));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var supabaseUrl = builder.Configuration["Supabase:Url"]
    ?? throw new Exception("SUPABASE_URL não configurado!");
var supabaseKey = builder.Configuration["Supabase:Key"]
    ?? throw new Exception("SUPABASE_KEY não configurado!");

var supabaseClient = new Supabase.Client(supabaseUrl, supabaseKey);
await supabaseClient.InitializeAsync();
builder.Services.AddSingleton(supabaseClient);

builder.Services.AddScoped<HomeService>();
builder.Services.AddScoped<ISalaRepository, SalaRepository>();
builder.Services.AddScoped<UsuarioRepository>();
builder.Services.AddScoped<ReservaRepository>();
builder.Services.AddScoped<ISalaService, SalaService>();
builder.Services.AddScoped<SupabaseAuthService>();


var jwtSettings = builder.Configuration.GetSection("Jwt").Get<JwtSettings>();
var key = jwtSettings?.Key
    ?? builder.Configuration["Jwt:Key"]
    ?? throw new Exception("JWT Key não configurada!");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
        };
    });


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ProjetoSpaceNow API v1");
        c.RoutePrefix = string.Empty;
    });
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
