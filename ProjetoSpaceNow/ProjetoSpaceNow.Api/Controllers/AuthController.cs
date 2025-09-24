using Microsoft.AspNetCore.Mvc;
using ProjetoSpaceNow.Models;
using ProjetoSpaceNow.Services;

namespace ProjetoSpaceNow.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly SupabaseAuthService _authService;

        public AuthController(SupabaseAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _authService.LoginAsync(request);
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized(new { message = "Credenciais inválidas" });
            }

            return Ok(new { token });
        }
    }
}