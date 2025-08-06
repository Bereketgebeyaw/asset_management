namespace AssetManagementAPI.Seeds
{
    public static class SeedConfiguration
    {
        public static class AdminCredentials
        {
            public static string Email => "admin@company.com";
            public static string Password => "admin123";
        }

        public static class UserCredentials
        {
            public static string Email => "user@company.com";
            public static string Password => "user123";
        }

        public static class CompanyInfo
        {
            public static string Name => "Top Link Technology";
            public static string Domain => "company.com";
        }
    }
} 