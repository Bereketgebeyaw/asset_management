using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AssetManagementAPI.Services;

namespace AssetManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class FileUploadController : ControllerBase
    {
        private readonly IFileUploadService _fileUploadService;

        public FileUploadController(IFileUploadService fileUploadService)
        {
            _fileUploadService = fileUploadService;
        }

        [HttpPost("upload")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            try
            {
                if (file == null)
                {
                    return BadRequest("No file provided");
                }

                var imageUrl = await _fileUploadService.UploadImageAsync(file);
                
                if (imageUrl == null)
                {
                    return BadRequest("Failed to upload file");
                }

                // Read the file data for binary storage
                using var memoryStream = new MemoryStream();
                await file.CopyToAsync(memoryStream);
                var imageData = memoryStream.ToArray();
                var contentType = file.ContentType;

                return Ok(new { 
                    imageUrl, 
                    imageData = Convert.ToBase64String(imageData),
                    contentType 
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while uploading the file");
            }
        }

        [HttpDelete("delete")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteImage([FromQuery] string imageUrl)
        {
            try
            {
                var success = await _fileUploadService.DeleteImageAsync(imageUrl);
                
                if (!success)
                {
                    return BadRequest("Failed to delete file");
                }

                return Ok(new { message = "File deleted successfully" });
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while deleting the file");
            }
        }
    }
} 