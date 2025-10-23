using Supabase.Postgrest.Attributes;
using Supabase.Postgrest.Models;

namespace ProjetoSpaceNow.Api.Models
{
    public abstract class BaseEntity : BaseModel
    {
        [PrimaryKey("id", false)]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Column("data_criacao")]
        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;

        [Column("data_atualizacao")]
        public DateTime? DataAtualizacao { get; set; }

        public BaseEntity() { }
    }
}

