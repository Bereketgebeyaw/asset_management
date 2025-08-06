using Microsoft.AspNetCore.Mvc;
using AssetManagementAPI.DTOs;
using AssetManagementAPI.Services;

namespace AssetManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request)
        {
            var response = await _authService.RegisterAsync(request);
            
            if (response == null)
            {
                return BadRequest("User with this email already exists");
            }

            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
        {
            var response = await _authService.LoginAsync(request);
            
            if (response == null)
            {
                return Unauthorized("Invalid email or password");
            }

            return Ok(response);
        }
    }
} 