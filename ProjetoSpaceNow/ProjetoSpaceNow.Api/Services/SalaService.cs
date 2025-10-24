using Microsoft.Extensions.Logging;
using ProjetoSpaceNow.Api.Interfaces;
using ProjetoSpaceNow.Api.Interfaces.Repository;
using ProjetoSpaceNow.Api.Models;
using ProjetoSpaceNow.Api.Services.Interfaces;

namespace ProjetoSpaceNow.Api.Services
{
    public class SalaService : ISalaService
    {
        private readonly ISalaRepository _repository;
        private readonly ILogger<SalaService> _logger;

        public SalaService(ISalaRepository repository, ILogger<SalaService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        public async Task<IEnumerable<SalaModel>> GetAllAsync()
        {
            try
            {
                return await _repository.GetAllAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar todas as salas.");
                throw new Exception("Erro ao buscar todas as salas.", ex);
            }
        }

        public async Task<SalaModel> GetByIdAsync(int id)
        {
            try
            {
                var sala = await _repository.GetByIdAsync(id);
                if (sala == null)
                    throw new KeyNotFoundException($"Sala com ID {id} não encontrada.");

                return sala;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao buscar sala com ID {id}.");
                throw;
            }
        }

        public async Task<SalaModel> CreateAsync(SalaModel sala)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(sala.Apelido))
                    throw new ArgumentException("O campo 'Apelido' é obrigatório.");

                sala.DataCriacao = DateTime.UtcNow;
                var created = await _repository.CreateAsync(sala);

                _logger.LogInformation("Sala criada com sucesso: {Id}", created.Id);
                return created;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar sala.");
                throw new Exception("Falha ao criar sala.", ex);
            }
        }

        public async Task<SalaModel> UpdateAsync(SalaModel sala)
        {
            try
            {
                sala.DataAtualizacao = DateTime.UtcNow;
                var updated = await _repository.UpdateAsync(sala);

                if (updated == null)
                    throw new Exception($"Falha ao atualizar a sala com ID {sala.Id}.");

                return updated;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao atualizar sala.");
                throw;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var deleted = await _repository.DeleteAsync(id);

                if (!deleted)
                    throw new Exception($"Falha ao excluir a sala com ID {id}.");

                _logger.LogInformation("Sala excluída: {Id}", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Erro ao excluir sala {id}.");
                throw;
            }
        }

        public async Task<IEnumerable<SalaModel>> GetByAndarIdAsync(int andarId) =>
            await _repository.GetByAndarIdAsync(andarId);

        public async Task<IEnumerable<SalaModel>> GetByPredioAsync(int predioId) =>
            await _repository.GetByPredioAsync(predioId);

        public async Task<SalaModel?> GetByNomeAsync(string nome) =>
            await _repository.GetByNomeAsync(nome);

        public async Task<IEnumerable<SalaModel>> GetBySalaTipoIdAsync(int salaTipoId) =>
            await _repository.GetBySalaTipoIdAsync(salaTipoId);

        public async Task<IEnumerable<SalaModel>> GetDisponiveisAsync() =>
            await _repository.GetDisponiveisAsync();
    }
}
