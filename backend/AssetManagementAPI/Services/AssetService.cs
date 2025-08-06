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
                    CreatedAt = a.CreatedAt,
                    UpdatedAt = a.UpdatedAt
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
                CreatedAt = asset.CreatedAt,
                UpdatedAt = asset.UpdatedAt
            };
        }

        public async Task<AssetDto> CreateAssetAsync(CreateAssetDto createAssetDto)
        {
            var asset = new Asset
            {
                Name = createAssetDto.Name,
                Category = createAssetDto.Category,
                SerialNumber = createAssetDto.SerialNumber,
                PurchaseDate = DateTime.SpecifyKind(createAssetDto.PurchaseDate, DateTimeKind.Utc),
                Status = createAssetDto.Status ?? "Available",
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
                CreatedAt = asset.CreatedAt,
                UpdatedAt = asset.UpdatedAt
            };
        }

        public async Task<AssetDto?> UpdateAssetAsync(int id, UpdateAssetDto updateAssetDto)
        {
            var asset = await _context.Assets.FindAsync(id);
            if (asset == null) return null;

            asset.Name = updateAssetDto.Name;
            asset.Category = updateAssetDto.Category;
            asset.SerialNumber = updateAssetDto.SerialNumber;
            asset.PurchaseDate = DateTime.SpecifyKind(updateAssetDto.PurchaseDate, DateTimeKind.Utc);
            asset.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return new AssetDto
            {
                Id = asset.Id,
                Name = asset.Name,
                Category = asset.Category,
                SerialNumber = asset.SerialNumber,
                PurchaseDate = asset.PurchaseDate,
                Status = asset.Status,
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