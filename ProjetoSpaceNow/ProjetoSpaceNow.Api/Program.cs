using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using ProjetoSpaceNow.Api.Models;
using ProjetoSpaceNow.Api.Repositories;
using ProjetoSpaceNow.Api.Services;
using ProjetoSpaceNow.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables();

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));
builder.Services.Configure<SupabaseSettings>(builder.Configuration.GetSection("Supabase"));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var supabaseUrl = builder.Configuration["Supabase:Url"] ?? throw new Exception("SUPABASE_URL não configurado!");
var supabaseKey = builder.Configuration["Supabase:Key"] ?? throw new Exception("SUPABASE_KEY não configurado!");

var supabaseClient = new Supabase.Client(supabaseUrl, supabaseKey);
await supabaseClient.InitializeAsync();

builder.Services.AddSingleton(supabaseClient);

builder.Services.AddSingleton<UsuarioRepository>();
builder.Services.AddSingleton<SalaRepository>();
builder.Services.AddSingleton<ReservaRepository>();

builder.Services.AddSingleton<HomeService>();
builder.Services.AddScoped<SupabaseAuthService>();

var jwtSettings = builder.Configuration.GetSection("Jwt").Get<JwtSettings>();
var key = jwtSettings?.Key ?? throw new Exception("JWT Key não configurada!");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "default_secret"))
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
