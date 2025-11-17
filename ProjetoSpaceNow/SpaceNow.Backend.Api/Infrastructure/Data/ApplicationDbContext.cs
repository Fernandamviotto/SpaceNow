using Microsoft.EntityFrameworkCore;
using SpaceNow.Backend.Domain.Entities;

namespace SpaceNow.Backend.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Reserva> Reservas { get; set; }
    public DbSet<Sala> Salas { get; set; }
    public DbSet<Predio> Predios { get; set; }
    public DbSet<TipoSala> TiposSala { get; set; }
    public DbSet<Responsavel> Responsaveis { get; set; }
    public DbSet<Record> Records { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email).HasColumnName("email").IsRequired();
            entity.Property(e => e.PasswordHash).HasColumnName("password_hash").IsRequired();
            entity.Property(e => e.Name).HasColumnName("name").IsRequired();
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.HasIndex(e => e.Email).IsUnique();
        });

        modelBuilder.Entity<Reserva>(entity =>
        {
            entity.ToTable("reservas");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
            entity.Property(e => e.SalaId).HasColumnName("sala_id");
            entity.Property(e => e.Sala).HasColumnName("sala");
            entity.Property(e => e.Tipo).HasColumnName("tipo");
            entity.Property(e => e.Solicitante).HasColumnName("solicitante");
            entity.Property(e => e.DataInicio).HasColumnName("data_inicio");
            entity.Property(e => e.DataFim).HasColumnName("data_fim");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.QuantidadePessoas).HasColumnName("quantidade_pessoas");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
        });

        modelBuilder.Entity<Sala>(entity =>
        {
            entity.ToTable("sala");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
            entity.Property(e => e.Nome).HasColumnName("nome").IsRequired();
            entity.Property(e => e.Capacidade).HasColumnName("capacidade");
            entity.Property(e => e.PredioId).HasColumnName("predio_id");
            entity.Property(e => e.TipoDeSalaId).HasColumnName("tipo_de_sala_id");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
        });

        modelBuilder.Entity<Predio>(entity =>
        {
            entity.ToTable("predios");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
            entity.Property(e => e.Nome).HasColumnName("nome").IsRequired();
            entity.Property(e => e.Endereco).HasColumnName("endereco");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
        });

        modelBuilder.Entity<TipoSala>(entity =>
        {
            entity.ToTable("tipos_de_sala");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
            entity.Property(e => e.NomeTipo).HasColumnName("nome_tipo").IsRequired();
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
        });

        modelBuilder.Entity<Responsavel>(entity =>
        {
            entity.ToTable("responsaveis");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
            entity.Property(e => e.Nome).HasColumnName("nome").IsRequired();
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Telefone).HasColumnName("telefone");
            entity.Property(e => e.Cargo).HasColumnName("cargo");
            entity.Property(e => e.Ativo).HasColumnName("ativo");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
        });

        modelBuilder.Entity<Record>(entity =>
        {
            entity.ToTable("records");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id").ValueGeneratedOnAdd();
            entity.Property(e => e.Title).HasColumnName("title").IsRequired();
            entity.Property(e => e.Description).HasColumnName("description").IsRequired();
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
        });
    }
}
