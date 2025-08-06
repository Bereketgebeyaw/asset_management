using System.ComponentModel.DataAnnotations;

namespace AssetManagementAPI.DTOs
{
    public class AssetDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public string SerialNumber { get; set; } = string.Empty;
        public DateTime PurchaseDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public byte[]? ImageData { get; set; }
        public string? ImageContentType { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateAssetDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        public string Category { get; set; } = string.Empty;
        
        [Required]
        public string SerialNumber { get; set; } = string.Empty;
        
        public DateTime PurchaseDate { get; set; }
        
        public string? Status { get; set; }
        
        public string? ImageUrl { get; set; }
        
        public byte[]? ImageData { get; set; }
        
        public string? ImageContentType { get; set; }
    }

    public class UpdateAssetDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        public string Category { get; set; } = string.Empty;
        
        [Required]
        public string SerialNumber { get; set; } = string.Empty;
        
        public DateTime PurchaseDate { get; set; }
        
        public string? ImageUrl { get; set; }
        
        public byte[]? ImageData { get; set; }
        
        public string? ImageContentType { get; set; }
    }
} 