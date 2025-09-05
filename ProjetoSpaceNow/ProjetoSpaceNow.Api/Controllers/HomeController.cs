using Microsoft.AspNetCore.Mvc;

namespace ProjetoSpaceNow.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        [HttpGet("home")]
        public IActionResult GetDados()
        {
            var dados = new
            {
                Mensagem = "Bem-vindo ao Projeto Space Now!",
                DataServidor = DateTime.Now,
                QuantidadeUsuarios = 5
            };
            return Ok(dados);
        }
    }
}
