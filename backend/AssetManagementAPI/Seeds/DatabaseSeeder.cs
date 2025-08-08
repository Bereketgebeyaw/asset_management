using AssetManagementAPI.Models;
using AssetManagementAPI.Data;
using BCrypt.Net;

namespace AssetManagementAPI.Seeds
{
    public static class DatabaseSeeder
    {
        public static void SeedData(ApplicationDbContext context)
        {
            // Check if users already exist
            if (context.Users.Any())
            {
                Console.WriteLine("Users already seeded. Skipping...");
                return; // Users already seeded
            }

            Console.WriteLine("🎯 Starting database seeding...");

            // Get admin credentials from configuration
            var adminEmail = SeedConfiguration.AdminCredentials.Email;
            var adminPassword = SeedConfiguration.AdminCredentials.Password;
            
            Console.WriteLine($"👤 Creating admin user with email: {adminEmail}");

            // Create admin user using configuration
            var adminUser = new User
            {
                Email = adminEmail,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(adminPassword),
                Role = "Admin",
                CreatedAt = DateTime.UtcNow
            };

            // Get user credentials from configuration
            var userEmail = SeedConfiguration.UserCredentials.Email;
            var userPassword = SeedConfiguration.UserCredentials.Password;
            
            Console.WriteLine($"👤 Creating regular user with email: {userEmail}");

            // Create regular user using configuration
            var regularUser = new User
            {
                Email = userEmail,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userPassword),
                Role = "User",
                CreatedAt = DateTime.UtcNow
            };

            context.Users.AddRange(adminUser, regularUser);
            context.SaveChanges();

            Console.WriteLine($"✅ Created admin user: {adminUser.Email}");
            Console.WriteLine($"✅ Created regular user: {regularUser.Email}");
            Console.WriteLine("🎉 Database seeded successfully!");
            Console.WriteLine($"🏢 Company: {SeedConfiguration.CompanyInfo.Name}");
            Console.WriteLine($"👤 Admin Email: {SeedConfiguration.AdminCredentials.Email}");
            Console.WriteLine($"👤 User Email: {SeedConfiguration.UserCredentials.Email}");
        }
    }
} 