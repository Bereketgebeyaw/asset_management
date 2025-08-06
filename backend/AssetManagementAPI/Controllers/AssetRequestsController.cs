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
    public class AssetRequestsController : ControllerBase
    {
        private readonly AssetRequestService _assetRequestService;

        public AssetRequestsController(AssetRequestService assetRequestService)
        {
            _assetRequestService = assetRequestService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<AssetRequestDto>>> GetAllRequests()
        {
            var requests = await _assetRequestService.GetAllRequestsAsync();
            return Ok(requests);
        }

        [HttpGet("my-requests")]
        public async Task<ActionResult<IEnumerable<AssetRequestDto>>> GetMyRequests()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var requests = await _assetRequestService.GetUserRequestsAsync(userId);
            return Ok(requests);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AssetRequestDto>> GetRequest(int id)
        {
            var request = await _assetRequestService.GetRequestByIdAsync(id);
            
            if (request == null)
            {
                return NotFound();
            }

            // Users can only view their own requests, admins can view all
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            if (userRole != "Admin" && request.UserId != userId)
            {
                return Forbid();
            }

            return Ok(request);
        }

        [HttpPost]
        public async Task<ActionResult<AssetRequestDto>> CreateRequest(CreateAssetRequestDto createRequestDto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            createRequestDto.UserId = userId;

            var request = await _assetRequestService.CreateRequestAsync(createRequestDto);
            
            if (request == null)
            {
                return BadRequest("Asset is not available or you already have a pending request for this asset");
            }

            return CreatedAtAction(nameof(GetRequest), new { id = request.Id }, request);
        }

        [HttpPut("{id}/process")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<AssetRequestDto>> ProcessRequest(int id, ProcessAssetRequestDto processRequestDto)
        {
            var request = await _assetRequestService.ProcessRequestAsync(id, processRequestDto);
            
            if (request == null)
            {
                return BadRequest("Request not found or already processed");
            }

            return Ok(request);
        }
    }
} 