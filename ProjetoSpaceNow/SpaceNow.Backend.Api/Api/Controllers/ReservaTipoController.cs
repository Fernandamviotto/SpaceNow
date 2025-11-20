using Microsoft.AspNetCore.Mvc;
using SpaceNow.Backend.Domain.Enums;

namespace SpaceNow.Backend.API.Controllers;

[ApiController]
[Route("reservas/tipos")]
public class ReservaTipoController : ControllerBase
{
    [HttpGet]
    public IActionResult GetTipos()
    {
        var tipos = Enum.GetValues(typeof(ReservaTipoEnum))
            .Cast<ReservaTipoEnum>()
            .Select(e => new
            {
                id = (int)e,
                nome = e.ToString()
            });

        return Ok(tipos);
    }

    [HttpGet("{id}")]
    public IActionResult GetTipo(int id)
    {
        if (!Enum.IsDefined(typeof(ReservaTipoEnum), id))
            return NotFound();

        var tipo = new
        {
            id,
            nome = ((ReservaTipoEnum)id).ToString()
        };

        return Ok(tipo);
    }
}
