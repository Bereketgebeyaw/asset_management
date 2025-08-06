using AssetManagementAPI.Models;
using AssetManagementAPI.Data;
using BCrypt.Net;

namespace AssetManagementAPI.Seeds
{
    public static class DatabaseSeeder
    {
        public static void SeedData(ApplicationDbContext context)
        {
            // Check if data already exists
            if (context.Users.Any() || context.Assets.Any())
            {
                Console.WriteLine("Database already seeded. Skipping...");
                return; // Data already seeded
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

            // Create sample assets with proper UTC DateTime values
            var assets = new List<Asset>
            {
                new Asset
                {
                    Name = "MacBook Pro 16-inch",
                    Category = "Laptop",
                    SerialNumber = "MBP001",
                    PurchaseDate = DateTime.SpecifyKind(new DateTime(2023, 1, 15), DateTimeKind.Utc),
                    Status = "Available",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Asset
                {
                    Name = "Dell XPS 13",
                    Category = "Laptop",
                    SerialNumber = "DXP002",
                    PurchaseDate = DateTime.SpecifyKind(new DateTime(2023, 2, 20), DateTimeKind.Utc),
                    Status = "Available",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Asset
                {
                    Name = "iPhone 14 Pro",
                    Category = "Phone",
                    SerialNumber = "IPH003",
                    PurchaseDate = DateTime.SpecifyKind(new DateTime(2023, 3, 10), DateTimeKind.Utc),
                    Status = "Available",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Asset
                {
                    Name = "Samsung Galaxy S23",
                    Category = "Phone",
                    SerialNumber = "SGS004",
                    PurchaseDate = DateTime.SpecifyKind(new DateTime(2023, 4, 5), DateTimeKind.Utc),
                    Status = "Available",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Asset
                {
                    Name = "LG 27-inch Monitor",
                    Category = "Monitor",
                    SerialNumber = "LGM005",
                    PurchaseDate = DateTime.SpecifyKind(new DateTime(2023, 5, 12), DateTimeKind.Utc),
                    Status = "Available",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new Asset
                {
                    Name = "Apple iPad Pro",
                    Category = "Tablet",
                    SerialNumber = "IPD006",
                    PurchaseDate = DateTime.SpecifyKind(new DateTime(2023, 6, 8), DateTimeKind.Utc),
                    Status = "Available",
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }
            };

            context.Assets.AddRange(assets);
            context.SaveChanges();

            Console.WriteLine($"✅ Created {assets.Count} sample assets");
            Console.WriteLine("🎉 Database seeded successfully!");
            Console.WriteLine($"🏢 Company: {SeedConfiguration.CompanyInfo.Name}");
            Console.WriteLine($"👤 Admin Email: {SeedConfiguration.AdminCredentials.Email}");
            Console.WriteLine($"👤 User Email: {SeedConfiguration.UserCredentials.Email}");
        }
    }
} 