using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SpaceNow.Backend.Domain.Entities;
using SpaceNow.Backend.Infrastructure.Data;

namespace SpaceNow.Backend.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecordsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<RecordsController> _logger;

    public RecordsController(ApplicationDbContext context, ILogger<RecordsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Get all records
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Record>>> GetRecords()
    {
        try
        {
            var records = await _context.Records.ToListAsync();
            return Ok(records);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching records");
            return StatusCode(500, "Internal server error");
        }
    }

    /// <summary>
    /// Get a specific record by ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<Record>> GetRecord(int id)
    {
        try
        {
            var record = await _context.Records.FindAsync(id);

            if (record == null)
            {
                return NotFound(new { message = $"Record with ID {id} not found" });
            }

            return Ok(record);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching record {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    /// <summary>
    /// Create a new record
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Record>> CreateRecord([FromBody] CreateRecordDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var record = new Record
            {
                Title = dto.Title,
                Description = dto.Description,
                CreatedAt = DateTime.UtcNow
            };

            _context.Records.Add(record);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRecord), new { id = record.Id }, record);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating record");
            return StatusCode(500, "Internal server error");
        }
    }

    /// <summary>
    /// Update an existing record
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateRecord(int id, [FromBody] UpdateRecordDto dto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var record = await _context.Records.FindAsync(id);

            if (record == null)
            {
                return NotFound(new { message = $"Record with ID {id} not found" });
            }

            record.Title = dto.Title;
            record.Description = dto.Description;

            await _context.SaveChangesAsync();

            return Ok(record);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating record {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }

    /// <summary>
    /// Delete a record
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecord(int id)
    {
        try
        {
            var record = await _context.Records.FindAsync(id);

            if (record == null)
            {
                return NotFound(new { message = $"Record with ID {id} not found" });
            }

            _context.Records.Remove(record);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting record {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }
}

/// <summary>
/// DTO for creating a new record
/// </summary>
public class CreateRecordDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

/// <summary>
/// DTO for updating a record
/// </summary>
public class UpdateRecordDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
