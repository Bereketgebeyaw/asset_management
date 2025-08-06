using System.ComponentModel.DataAnnotations;

namespace AssetManagementAPI.Models
{
    public class Asset
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; } = string.Empty;
        
        [Required]
        public string Category { get; set; } = string.Empty; // Laptop, Phone, Monitor, etc.
        
        [Required]
        public string SerialNumber { get; set; } = string.Empty;
        
        public DateTime PurchaseDate { get; set; }
        
        [Required]
        public string Status { get; set; } = "Available"; // "Available" or "Assigned"
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation properties
        public ICollection<AssetRequest> AssetRequests { get; set; } = new List<AssetRequest>();
    }
} 