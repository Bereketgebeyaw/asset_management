using AssetManagementAPI.Data;
using AssetManagementAPI.DTOs;
using AssetManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AssetManagementAPI.Services
{
    public class AssetRequestService
    {
        private readonly ApplicationDbContext _context;

        public AssetRequestService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AssetRequestDto>> GetAllRequestsAsync()
        {
            return await _context.AssetRequests
                .Include(ar => ar.User)
                .Include(ar => ar.Asset)
                .Select(ar => new AssetRequestDto
                {
                    Id = ar.Id,
                    UserId = ar.UserId,
                    UserEmail = ar.User.Email,
                    AssetId = ar.AssetId,
                    AssetName = ar.Asset.Name,
                    Status = ar.Status,
                    Reason = ar.Reason,
                    AdminNotes = ar.AdminNotes,
                    RequestDate = ar.RequestDate,
                    ProcessedDate = ar.ProcessedDate
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<AssetRequestDto>> GetUserRequestsAsync(int userId)
        {
            return await _context.AssetRequests
                .Include(ar => ar.User)
                .Include(ar => ar.Asset)
                .Where(ar => ar.UserId == userId)
                .Select(ar => new AssetRequestDto
                {
                    Id = ar.Id,
                    UserId = ar.UserId,
                    UserEmail = ar.User.Email,
                    AssetId = ar.AssetId,
                    AssetName = ar.Asset.Name,
                    Status = ar.Status,
                    Reason = ar.Reason,
                    AdminNotes = ar.AdminNotes,
                    RequestDate = ar.RequestDate,
                    ProcessedDate = ar.ProcessedDate
                })
                .ToListAsync();
        }

        public async Task<AssetRequestDto?> GetRequestByIdAsync(int id)
        {
            var request = await _context.AssetRequests
                .Include(ar => ar.User)
                .Include(ar => ar.Asset)
                .FirstOrDefaultAsync(ar => ar.Id == id);

            if (request == null) return null;

            return new AssetRequestDto
            {
                Id = request.Id,
                UserId = request.UserId,
                UserEmail = request.User.Email,
                AssetId = request.AssetId,
                AssetName = request.Asset.Name,
                Status = request.Status,
                Reason = request.Reason,
                AdminNotes = request.AdminNotes,
                RequestDate = request.RequestDate,
                ProcessedDate = request.ProcessedDate
            };
        }

        public async Task<AssetRequestDto?> CreateRequestAsync(CreateAssetRequestDto createRequestDto)
        {
            // Check if asset is available
            var asset = await _context.Assets.FindAsync(createRequestDto.AssetId);
            if (asset == null || asset.Status != "Available")
            {
                return null;
            }

            // Check if user already has a pending request for this asset
            var existingRequest = await _context.AssetRequests
                .FirstOrDefaultAsync(ar => ar.UserId == createRequestDto.UserId && 
                                         ar.AssetId == createRequestDto.AssetId && 
                                         ar.Status == "Pending");

            if (existingRequest != null)
            {
                return null;
            }

            var request = new AssetRequest
            {
                UserId = createRequestDto.UserId,
                AssetId = createRequestDto.AssetId,
                Status = "Pending",
                Reason = createRequestDto.Reason,
                RequestDate = DateTime.UtcNow
            };

            _context.AssetRequests.Add(request);
            await _context.SaveChangesAsync();

            // Reload with includes for DTO mapping
            var savedRequest = await _context.AssetRequests
                .Include(ar => ar.User)
                .Include(ar => ar.Asset)
                .FirstAsync(ar => ar.Id == request.Id);

            return new AssetRequestDto
            {
                Id = savedRequest.Id,
                UserId = savedRequest.UserId,
                UserEmail = savedRequest.User.Email,
                AssetId = savedRequest.AssetId,
                AssetName = savedRequest.Asset.Name,
                Status = savedRequest.Status,
                Reason = savedRequest.Reason,
                AdminNotes = savedRequest.AdminNotes,
                RequestDate = savedRequest.RequestDate,
                ProcessedDate = savedRequest.ProcessedDate
            };
        }

        public async Task<AssetRequestDto?> ProcessRequestAsync(int requestId, ProcessAssetRequestDto processRequestDto)
        {
            var request = await _context.AssetRequests
                .Include(ar => ar.Asset)
                .FirstOrDefaultAsync(ar => ar.Id == requestId);

            if (request == null || request.Status != "Pending")
            {
                return null;
            }

            request.Status = processRequestDto.Status;
            request.AdminNotes = processRequestDto.AdminNotes;
            request.ProcessedDate = DateTime.UtcNow;

            // If approved, update asset status
            if (processRequestDto.Status == "Approved")
            {
                request.Asset.Status = "Assigned";
                request.Asset.UpdatedAt = DateTime.UtcNow;
                
                // Explicitly mark the asset as modified to ensure the change is tracked
                _context.Entry(request.Asset).State = EntityState.Modified;
            }

            await _context.SaveChangesAsync();

            // Reload with includes for DTO mapping
            var updatedRequest = await _context.AssetRequests
                .Include(ar => ar.User)
                .Include(ar => ar.Asset)
                .FirstAsync(ar => ar.Id == requestId);

            return new AssetRequestDto
            {
                Id = updatedRequest.Id,
                UserId = updatedRequest.UserId,
                UserEmail = updatedRequest.User.Email,
                AssetId = updatedRequest.AssetId,
                AssetName = updatedRequest.Asset.Name,
                Status = updatedRequest.Status,
                Reason = updatedRequest.Reason,
                AdminNotes = updatedRequest.AdminNotes,
                RequestDate = updatedRequest.RequestDate,
                ProcessedDate = updatedRequest.ProcessedDate
            };
        }
    }
} 