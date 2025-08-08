using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AssetManagementAPI.DTOs;
using AssetManagementAPI.Services;
using System.Security.Claims;

namespace AssetManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AssetsController : ControllerBase
    {
        private readonly AssetService _assetService;

        public AssetsController(AssetService assetService)
        {
            _assetService = assetService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssetDto>>> GetAssets()
        {
            var assets = await _assetService.GetAllAssetsAsync();
            return Ok(assets);
        }

        [HttpGet("available")]
        public async Task<ActionResult<IEnumerable<AssetDto>>> GetAvailableAssets()
        {
            var assets = await _assetService.GetAvailableAssetsAsync();
            return Ok(assets);
        }

        [HttpGet("assigned")]
        public async Task<ActionResult<IEnumerable<AssetDto>>> GetAssignedAssets()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var assets = await _assetService.GetAssignedAssetsAsync(userId);
            return Ok(assets);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AssetDto>> GetAsset(int id)
        {
            var asset = await _assetService.GetAssetByIdAsync(id);
            
            if (asset == null)
            {
                return NotFound();
            }

            return Ok(asset);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<AssetDto>> CreateAsset(CreateAssetDto createAssetDto)
        {
            try
            {
                var asset = await _assetService.CreateAssetAsync(createAssetDto);
                return CreatedAtAction(nameof(GetAsset), new { id = asset.Id }, asset);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while creating the asset. Please try again." });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<AssetDto>> UpdateAsset(int id, UpdateAssetDto updateAssetDto)
        {
            var asset = await _assetService.UpdateAssetAsync(id, updateAssetDto);
            
            if (asset == null)
            {
                return NotFound();
            }

            return Ok(asset);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteAsset(int id)
        {
            var success = await _assetService.DeleteAssetAsync(id);
            
            if (!success)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
} 