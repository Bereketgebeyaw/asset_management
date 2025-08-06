using System.ComponentModel.DataAnnotations;

namespace AssetManagementAPI.DTOs
{
    public class AssetRequestDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserEmail { get; set; } = string.Empty;
        public int AssetId { get; set; }
        public string AssetName { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string? Reason { get; set; }
        public string? AdminNotes { get; set; }
        public DateTime RequestDate { get; set; }
        public DateTime? ProcessedDate { get; set; }
    }

    public class CreateAssetRequestDto
    {
        public int UserId { get; set; }
        
        [Required]
        public int AssetId { get; set; }
        
        public string? Reason { get; set; }
    }

    public class ProcessAssetRequestDto
    {
        [Required]
        public string Status { get; set; } = string.Empty;
        
        public string? AdminNotes { get; set; }
    }
} 