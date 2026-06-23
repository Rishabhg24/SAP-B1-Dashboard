using Loginpage.Services;
using Loginpage.Models;
using Microsoft.AspNetCore.Mvc;

namespace LoginApi.Controllers
{
    [ApiController]

    [Route("api/[controller]")]

    public class AuthController : ControllerBase
    {
        private readonly IAuthService _service;

        public AuthController(
            IAuthService service)
        {
            _service = service;
        }

        // =========================
        // SIGNUP
        // =========================

        [HttpPost("signup")]

        public async Task<IActionResult> Signup(
            [FromBody] SignupRequest request)
        {
            var result =
                await _service.SignupAsync(request);

            // SUCCESS

            if (result.Success)
            {
                return Ok(result);
            }

            // FAILURE

            return BadRequest(result);
        }

        // =========================
        // LOGIN
        // =========================

        [HttpPost("login")]

        public async Task<IActionResult> Login(
            [FromBody] LoginRequest request)
        {
            var result =
                await _service.LoginAsync(request);

            // SUCCESS

            if (result.Success)
            {
                return Ok(result);
            }

            // INVALID USERNAME/PASSWORD

            return Unauthorized(result);
        }

        // =========================
        // LOGOUT
        // =========================

        [HttpPost("logout")]

        public async Task<IActionResult> Logout()
        {
            var result =
                await _service.LogoutAsync();

            // SUCCESS

            if (result.Success)
            {
                return Ok(result);
            }

            // FAILURE

            return BadRequest(result);
        }

        // =========================
        // GET ALL USERS
        // =========================

        [HttpGet("users")]

        public async Task<IActionResult> GetAllUsers()
        {
            var users =
                await _service.GetAllUsersAsync();

            return Ok(users);
        }
    }
}