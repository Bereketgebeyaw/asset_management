using Microsoft.AspNetCore.Http;

namespace AssetManagementAPI.Services
{
    public interface IFileUploadService
    {
        Task<string?> UploadImageAsync(IFormFile file);
        Task<bool> DeleteImageAsync(string imageUrl);
        Task<(byte[] data, string contentType)?> GetImageDataAsync(string imageUrl);
    }

    public class FileUploadService : IFileUploadService
    {
        private readonly string _uploadDirectory;
        private readonly string _baseUrl;

        public FileUploadService(IConfiguration configuration)
        {
            _uploadDirectory = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            _baseUrl = configuration["AppSettings:Api:Url"] ?? "http://localhost:5124";
            
            // Ensure upload directory exists
            if (!Directory.Exists(_uploadDirectory))
            {
                Directory.CreateDirectory(_uploadDirectory);
            }
        }

        public async Task<string?> UploadImageAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return null;

            // Validate file type
            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
            
            if (!allowedExtensions.Contains(fileExtension))
                throw new ArgumentException("Invalid file type. Only JPG, PNG, GIF, and WebP files are allowed.");

            // Validate file size (max 5MB)
            if (file.Length > 5 * 1024 * 1024)
                throw new ArgumentException("File size too large. Maximum size is 5MB.");

            // Generate unique filename
            var fileName = $"{Guid.NewGuid()}{fileExtension}";
            var filePath = Path.Combine(_uploadDirectory, fileName);

            // Save file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Return the URL
            return $"{_baseUrl}/uploads/{fileName}";
        }

        public async Task<bool> DeleteImageAsync(string imageUrl)
        {
            if (string.IsNullOrEmpty(imageUrl))
                return false;

            try
            {
                var fileName = Path.GetFileName(imageUrl);
                var filePath = Path.Combine(_uploadDirectory, fileName);

                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<(byte[] data, string contentType)?> GetImageDataAsync(string imageUrl)
        {
            if (string.IsNullOrEmpty(imageUrl))
                return null;

            try
            {
                var fileName = Path.GetFileName(imageUrl);
                var filePath = Path.Combine(_uploadDirectory, fileName);

                if (File.Exists(filePath))
                {
                    var fileData = await File.ReadAllBytesAsync(filePath);
                    var contentType = GetContentType(fileExtension: Path.GetExtension(fileName));
                    return (fileData, contentType);
                }

                return null;
            }
            catch
            {
                return null;
            }
        }

        private string GetContentType(string fileExtension)
        {
            return fileExtension.ToLowerInvariant() switch
            {
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".gif" => "image/gif",
                ".webp" => "image/webp",
                _ => "application/octet-stream"
            };
        }
    }
} 