using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AssetManagementAPI.Services;

namespace AssetManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ImageController : ControllerBase
    {
        private readonly AssetService _assetService;

        public ImageController(AssetService assetService)
        {
            _assetService = assetService;
        }

        [HttpGet("asset/{id}")]
        public async Task<IActionResult> GetAssetImage(int id)
        {
            var asset = await _assetService.GetAssetByIdAsync(id);
            
            if (asset == null || asset.ImageData == null)
            {
                return NotFound();
            }

            return File(asset.ImageData, asset.ImageContentType ?? "image/jpeg");
        }
    }
}
