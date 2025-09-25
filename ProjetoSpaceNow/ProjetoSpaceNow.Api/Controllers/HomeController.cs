using Microsoft.AspNetCore.Mvc;
using ProjetoSpaceNow.Api.DTO;
using ProjetoSpaceNow.Api.Services;

namespace ProjetoSpaceNow.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")] 
    public class HomeController : ControllerBase
    {
        private readonly HomeService _homeService;

        public HomeController(HomeService homeService)
        {
            _homeService = homeService;
        }

        [HttpGet("{usuarioId}")]
        public async Task<IActionResult> GetHome(Guid usuarioId, [FromQuery] DateTime? data = null, [FromQuery] string periodo = "manha")
        {
            var user = await _homeService.GetUser(usuarioId);
            var salas = await _homeService.GetSalas();
            var reservas = await _homeService.GetReservas(data ?? DateTime.Today, periodo);

            var homeDto = new HomeDto
            {
                Usuario = user,
                Salas = salas,
                Reservas = reservas
            };

            return Ok(homeDto);
        }
    }
}

