using Microsoft.AspNetCore.Mvc;

namespace ProjetoSpaceNow.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        [HttpPost]
        public IActionResult Post([FromBody] LoginRequest request)
        {
            if (request.Email == "teste@teste.com" && request.Senha == "123456")
            {
                return Ok(new LoginResponse
                {
                    Token = "token-mock-123",
                    Usuario = new Usuario
                    {
                        Id = 1,
                        Nome = "Teste",
                        Email = request.Email
                    }
                });
            }
            return Unauthorized(new { message = "Usuário ou senha inválidos" });
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Senha { get; set; }
    }

    public class LoginResponse
    {
        public string Token { get; set; }
        public Usuario Usuario { get; set; }
    }

    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
    }
}
