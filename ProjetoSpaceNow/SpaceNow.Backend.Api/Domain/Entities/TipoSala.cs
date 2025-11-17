namespace SpaceNow.Backend.Domain.Entities;

public class TipoSala
{
    public int Id { get; set; }
    public string NomeTipo { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
