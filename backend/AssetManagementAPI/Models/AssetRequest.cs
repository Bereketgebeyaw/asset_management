using System.ComponentModel.DataAnnotations;

namespace AssetManagementAPI.Models
{
    public class AssetRequest
    {
        public int Id { get; set; }
        
        public int UserId { get; set; }
        
        public int AssetId { get; set; }
        
        [Required]
        public string Status { get; set; } = "Pending"; // "Pending", "Approved", "Rejected"
        
        public string? Reason { get; set; }
        
        public string? AdminNotes { get; set; }
        
        public DateTime RequestDate { get; set; } = DateTime.UtcNow;
        
        public DateTime? ProcessedDate { get; set; }
        
        // Navigation properties
        public User User { get; set; } = null!;
        public Asset Asset { get; set; } = null!;
    }
} 