using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AssetManagementAPI.Data;
using AssetManagementAPI.Services;
using AssetManagementAPI.Configuration;
using AssetManagementAPI.Seeds;
using DotNetEnv;

// Load environment variables from .env file
Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

// Configure AppSettings with environment variables
var appSettings = new AppSettings
{
    Database = new DatabaseSettings
    {
        Host = Environment.GetEnvironmentVariable("DB_HOST") ?? "localhost",
        Port = int.Parse(Environment.GetEnvironmentVariable("DB_PORT") ?? "5433"),
        Name = Environment.GetEnvironmentVariable("DB_NAME") ?? "assetmanagement",
        Username = Environment.GetEnvironmentVariable("DB_USERNAME") ?? "postgres",
        Password = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "postgres"
    },
    Jwt = new JwtSettings
    {
        SecretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY") ?? "your-super-secret-key-with-at-least-32-characters",
        Issuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "AssetManagementAPI",
        Audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "AssetManagementClient",
        ExpirationHours = int.Parse(Environment.GetEnvironmentVariable("JWT_EXPIRATION_HOURS") ?? "24")
    },
    Api = new ApiSettings
    {
        Port = int.Parse(Environment.GetEnvironmentVariable("API_PORT") ?? "5000"),
        Url = Environment.GetEnvironmentVariable("API_URL") ?? "http://localhost:5000",
        FrontendUrl = Environment.GetEnvironmentVariable("FRONTEND_URL") ?? "http://localhost:3000"
    }
};

builder.Services.Configure<AppSettings>(options => 
{
    options.Database = appSettings.Database;
    options.Jwt = appSettings.Jwt;
    options.Api = appSettings.Api;
});

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins(
                    "http://localhost:3000",  // React dev server
                    "http://localhost:5173",  // Vite dev server (default)
                    "http://localhost:5174",  // Vite dev server (alternative)
                    "http://127.0.0.1:3000",
                    "http://127.0.0.1:5173",
                    "http://127.0.0.1:5174"
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

// Configure Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(appSettings.Database.GetConnectionString()));

// Configure JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = appSettings.Jwt.Issuer,
            ValidAudience = appSettings.Jwt.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.ASCII.GetBytes(appSettings.Jwt.SecretKey))
        };
    });

// Configure Authorization
builder.Services.AddAuthorization();

// Register Services
builder.Services.AddScoped<JwtService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<AssetService>();
builder.Services.AddScoped<AssetRequestService>();
builder.Services.AddScoped<IFileUploadService, FileUploadService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Serve static files (for uploaded images)
app.UseStaticFiles();

// Use CORS
app.UseCors("AllowReactApp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Ensure database is migrated and seeded
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    
    // Apply migrations
    context.Database.Migrate();
    
    // Seed data using the new seeder from Seeds folder
    Console.WriteLine("Starting database seeding...");
    DatabaseSeeder.SeedData(context);
    Console.WriteLine("Database seeding completed!");
}

app.Run();
