using Microsoft.EntityFrameworkCore;
using SpaceNow.Backend.Api.Models;

namespace SpaceNow.Backend.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Record> Records { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure Record entity
        modelBuilder.Entity<Record>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Description).HasMaxLength(1000);
            entity.Property(e => e.CreatedAt).IsRequired();
        });

        // Seed initial data for development
        if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
        {
            modelBuilder.Entity<Record>().HasData(
                new Record { Id = 1, Title = "First Record", Description = "This is the first sample record", CreatedAt = DateTime.UtcNow },
                new Record { Id = 2, Title = "Second Record", Description = "This is the second sample record", CreatedAt = DateTime.UtcNow },
                new Record { Id = 3, Title = "Third Record", Description = "This is the third sample record", CreatedAt = DateTime.UtcNow }
            );
        }
    }
}
