using AssetManagementAPI.Data;
using AssetManagementAPI.DTOs;
using AssetManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AssetManagementAPI.Services
{
    public class AssetService
    {
        private readonly ApplicationDbContext _context;

        public AssetService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AssetDto>> GetAllAssetsAsync()
        {
            return await _context.Assets
                .Select(a => new AssetDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Category = a.Category,
                    SerialNumber = a.SerialNumber,
                    PurchaseDate = a.PurchaseDate,
                    Status = a.Status,
                    ImageUrl = a.ImageUrl,
                    ImageData = a.ImageData,
                    ImageContentType = a.ImageContentType,
                    CreatedAt = a.CreatedAt,
                    UpdatedAt = a.UpdatedAt
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<AssetDto>> GetAvailableAssetsAsync()
        {
            return await _context.Assets
                .Where(a => a.Status == "Available")
                .Select(a => new AssetDto
                {
                    Id = a.Id,
                    Name = a.Name,
                    Category = a.Category,
                    SerialNumber = a.SerialNumber,
                    PurchaseDate = a.PurchaseDate,
                    Status = a.Status,
                    ImageUrl = a.ImageUrl,
                    ImageData = a.ImageData,
                    ImageContentType = a.ImageContentType,
                    CreatedAt = a.CreatedAt,
                    UpdatedAt = a.UpdatedAt
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<AssetDto>> GetAssignedAssetsAsync(int userId)
        {
            return await _context.AssetRequests
                .Include(ar => ar.Asset)
                .Where(ar => ar.UserId == userId && ar.Status == "Approved")
                .Select(ar => new AssetDto
                {
                    Id = ar.Asset.Id,
                    Name = ar.Asset.Name,
                    Category = ar.Asset.Category,
                    SerialNumber = ar.Asset.SerialNumber,
                    PurchaseDate = ar.Asset.PurchaseDate,
                    Status = ar.Asset.Status,
                    ImageUrl = ar.Asset.ImageUrl,
                    ImageData = ar.Asset.ImageData,
                    ImageContentType = ar.Asset.ImageContentType,
                    CreatedAt = ar.Asset.CreatedAt,
                    UpdatedAt = ar.Asset.UpdatedAt
                })
                .ToListAsync();
        }

        public async Task<AssetDto?> GetAssetByIdAsync(int id)
        {
            var asset = await _context.Assets.FindAsync(id);
            if (asset == null) return null;

            return new AssetDto
            {
                Id = asset.Id,
                Name = asset.Name,
                Category = asset.Category,
                SerialNumber = asset.SerialNumber,
                PurchaseDate = asset.PurchaseDate,
                Status = asset.Status,
                ImageUrl = asset.ImageUrl,
                ImageData = asset.ImageData,
                ImageContentType = asset.ImageContentType,
                CreatedAt = asset.CreatedAt,
                UpdatedAt = asset.UpdatedAt
            };
        }

        public async Task<AssetDto> CreateAssetAsync(CreateAssetDto createAssetDto)
        {
            try
            {
                // Check if serial number already exists
                var existingAsset = await _context.Assets.FirstOrDefaultAsync(a => a.SerialNumber == createAssetDto.SerialNumber);
                if (existingAsset != null)
                {
                    throw new InvalidOperationException($"Asset with serial number '{createAssetDto.SerialNumber}' already exists.");
                }

                var asset = new Asset
                {
                    Name = createAssetDto.Name,
                    Category = createAssetDto.Category,
                    SerialNumber = createAssetDto.SerialNumber,
                    PurchaseDate = createAssetDto.PurchaseDate?.ToUniversalTime() ?? DateTime.UtcNow,
                    Status = createAssetDto.Status ?? "Available",
                    ImageUrl = createAssetDto.ImageUrl,
                    ImageData = !string.IsNullOrEmpty(createAssetDto.ImageData) ? Convert.FromBase64String(createAssetDto.ImageData) : null,
                    ImageContentType = createAssetDto.ImageContentType,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Assets.Add(asset);
                await _context.SaveChangesAsync();

                return new AssetDto
                {
                    Id = asset.Id,
                    Name = asset.Name,
                    Category = asset.Category,
                    SerialNumber = asset.SerialNumber,
                    PurchaseDate = asset.PurchaseDate,
                    Status = asset.Status,
                    ImageUrl = asset.ImageUrl,
                    ImageData = asset.ImageData,
                    ImageContentType = asset.ImageContentType,
                    CreatedAt = asset.CreatedAt,
                    UpdatedAt = asset.UpdatedAt
                };
            }
            catch (InvalidOperationException)
            {
                throw; // Re-throw validation exceptions
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Failed to create asset: {ex.Message}", ex);
            }
        }

        public async Task<AssetDto?> UpdateAssetAsync(int id, UpdateAssetDto updateAssetDto)
        {
            var asset = await _context.Assets.FindAsync(id);
            if (asset == null) return null;

            // Update all fields except Status (status should only change through requests)
            asset.Name = updateAssetDto.Name;
            asset.Category = updateAssetDto.Category;
            asset.SerialNumber = updateAssetDto.SerialNumber;
            asset.PurchaseDate = DateTime.SpecifyKind(updateAssetDto.PurchaseDate, DateTimeKind.Utc);
            asset.ImageUrl = updateAssetDto.ImageUrl;
            asset.ImageData = !string.IsNullOrEmpty(updateAssetDto.ImageData) ? Convert.FromBase64String(updateAssetDto.ImageData) : null;
            asset.ImageContentType = updateAssetDto.ImageContentType;
            asset.UpdatedAt = DateTime.UtcNow;

            // Explicitly mark the asset as modified to ensure the change is tracked
            _context.Entry(asset).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return new AssetDto
            {
                Id = asset.Id,
                Name = asset.Name,
                Category = asset.Category,
                SerialNumber = asset.SerialNumber,
                PurchaseDate = asset.PurchaseDate,
                Status = asset.Status, // Preserve the existing status
                ImageUrl = asset.ImageUrl,
                ImageData = asset.ImageData,
                ImageContentType = asset.ImageContentType,
                CreatedAt = asset.CreatedAt,
                UpdatedAt = asset.UpdatedAt
            };
        }

        public async Task<bool> DeleteAssetAsync(int id)
        {
            var asset = await _context.Assets.FindAsync(id);
            if (asset == null) return false;

            _context.Assets.Remove(asset);
            await _context.SaveChangesAsync();
            return true;
        }
    }
} 