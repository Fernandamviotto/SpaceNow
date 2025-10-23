using ProjetoSpaceNow.Api.Interfaces;
using ProjetoSpaceNow.Api.Models;
using Supabase;
using static Supabase.Postgrest.Constants;

namespace ProjetoSpaceNow.Api.Repositories
{
    public class SalaResponsavelRepository : ISalaResponsavelRepository
    {
        private readonly Client _supabaseClient;

        public SalaResponsavelRepository(Client supabaseClient)
        {
            _supabaseClient = supabaseClient ?? throw new ArgumentNullException(nameof(supabaseClient));
        }

        public async Task<IEnumerable<SalaResponsavelModel>> GetAllAsync()
        {
            var response = await _supabaseClient.Postgrest.Table<SalaResponsavelModel>().Get();
            return response.Models ?? Enumerable.Empty<SalaResponsavelModel>();
        }

        public async Task<SalaResponsavelModel> GetByIdAsync(Guid id)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaResponsavelModel>()
                .Filter("id", Operator.Equals, id)
                .Get();
            return response.Models?.FirstOrDefault() ?? throw new Exception("Responsável não encontrado.");
        }

        public async Task<IEnumerable<SalaResponsavelModel>> GetBySalaIdAsync(Guid salaId)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaResponsavelModel>()
                .Filter("sala_id", Operator.Equals, salaId)
                .Get();
            return response.Models ?? Enumerable.Empty<SalaResponsavelModel>();
        }

        public async Task<SalaResponsavelModel?> GetByNomeAsync(UsuarioModel usuario)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaResponsavelModel>()
                .Filter("usuario_id", Operator.Equals, usuario.Id)
                .Get();
            return response.Models?.FirstOrDefault();
        }

        public async Task<SalaResponsavelModel> CreateAsync(SalaResponsavelModel responsavel)
        {
            var response = await _supabaseClient.Postgrest.Table<SalaResponsavelModel>().Insert(responsavel);
            return response.Models?.FirstOrDefault() ?? throw new Exception("Falha ao criar o responsável.");
        }

        public async Task<SalaResponsavelModel> UpdateAsync(SalaResponsavelModel responsavel)
        {
            var response = await _supabaseClient.Postgrest.Table<SalaResponsavelModel>().Update(responsavel);
            return response.Models?.FirstOrDefault() ?? throw new Exception("Falha ao atualizar o responsável.");
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var responsavel = await GetByIdAsync(id);
            if (responsavel == null) return false;

            await _supabaseClient.Postgrest
                .Table<SalaResponsavelModel>()
                .Filter("id", Operator.Equals, id)
                .Delete();

            return true;
        }
    }
}
