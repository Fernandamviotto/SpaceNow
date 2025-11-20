namespace SpaceNow.Backend.Domain.Entities;

public class Sala
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public int Capacidade { get; set; }
    public int PredioId { get; set; }
    public Predio Predio { get; set; } = null!;
    public int TipoDeSalaId { get; set; }
    public TipoSala TipoDeSala { get; set; } = null!;
    public bool Status { get; set; } = true;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
