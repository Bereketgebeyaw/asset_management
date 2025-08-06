namespace AssetManagementAPI.Configuration
{
    public class AppSettings
    {
        public DatabaseSettings Database { get; set; } = new();
        public JwtSettings Jwt { get; set; } = new();
        public ApiSettings Api { get; set; } = new();
    }

    public class DatabaseSettings
    {
        public string Host { get; set; } = "localhost";
        public int Port { get; set; } = 5433;
        public string Name { get; set; } = "assetmanagement";
        public string Username { get; set; } = "postgres";
        public string Password { get; set; } = "postgres";
        
        public string GetConnectionString()
        {
            return $"Host={Host};Port={Port};Database={Name};Username={Username};Password={Password}";
        }
    }

    public class JwtSettings
    {
        public string SecretKey { get; set; } = "your-super-secret-key-with-at-least-32-characters";
        public string Issuer { get; set; } = "AssetManagementAPI";
        public string Audience { get; set; } = "AssetManagementClient";
        public int ExpirationHours { get; set; } = 24;
    }

    public class ApiSettings
    {
        public int Port { get; set; } = 5000;
        public string Url { get; set; } = "http://localhost:5000";
        public string FrontendUrl { get; set; } = "http://localhost:3000";
    }
} 