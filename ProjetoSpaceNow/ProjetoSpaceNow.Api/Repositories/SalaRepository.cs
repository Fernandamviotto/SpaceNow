using ProjetoSpaceNow.Api.Interfaces;
using ProjetoSpaceNow.Api.Models;
using Supabase;
using static Supabase.Postgrest.Constants;

namespace ProjetoSpaceNow.Api.Repositories
{
    public class SalaRepository : ISalaRepository
    {
        private readonly Client _supabaseClient;

        public SalaRepository(Client supabaseClient)
        {
            _supabaseClient = supabaseClient ?? throw new ArgumentNullException(nameof(supabaseClient));
        }

        public async Task<IEnumerable<SalaModel>> GetAllAsync()
        {
            var response = await _supabaseClient.Postgrest.Table<SalaModel>().Get();
            return response.Models ?? Enumerable.Empty<SalaModel>();
        }

        public async Task<SalaModel> GetByIdAsync(Guid id)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaModel>()
                .Filter("id", Operator.Equals, id)
                .Get();
            return response.Models?.FirstOrDefault() ?? throw new Exception("Sala não encontrada.");
        }

        public async Task<SalaModel?> GetByNomeAsync(string nome)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaModel>()
                .Filter("nome", Operator.Equals, nome)
                .Get();
            return response.Models?.FirstOrDefault();
        }

        public async Task<IEnumerable<SalaModel>> GetByAndarIdAsync(Guid andarId)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaModel>()
                .Filter("andar_id", Operator.Equals, andarId)
                .Get();
            return response.Models ?? Enumerable.Empty<SalaModel>();
        }

        public async Task<IEnumerable<SalaModel>> GetByPredioAsync(Guid predioId)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaModel>()
                .Filter("predio_id", Operator.Equals, predioId)
                .Get();
            return response.Models ?? Enumerable.Empty<SalaModel>();
        }

        public async Task<IEnumerable<SalaModel>> GetBySalaTipoIdAsync(Guid salaTipoId)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaModel>()
                .Filter("sala_tipo_id", Operator.Equals, salaTipoId)
                .Get();
            return response.Models ?? Enumerable.Empty<SalaModel>();
        }

        public async Task<IEnumerable<SalaModel>> GetDisponiveisAsync()
        {
            // Aqui você pode implementar lógica de disponibilidade com join ou filtro extra conforme necessário
            var response = await _supabaseClient.Postgrest.Table<SalaModel>().Get();
            return response.Models ?? Enumerable.Empty<SalaModel>();
        }

        public async Task<SalaModel> CreateAsync(SalaModel sala)
        {
            var response = await _supabaseClient.Postgrest.Table<SalaModel>().Insert(sala);
            return response.Models?.FirstOrDefault() ?? throw new Exception("Falha ao criar a sala.");
        }

        public async Task<SalaModel> UpdateAsync(SalaModel sala)
        {
            var response = await _supabaseClient.Postgrest.Table<SalaModel>().Update(sala);
            return response.Models?.FirstOrDefault() ?? throw new Exception("Falha ao atualizar a sala.");
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var sala = await GetByIdAsync(id);
            if (sala == null) return false;

            await _supabaseClient.Postgrest
                .Table<SalaModel>()
                .Filter("id", Operator.Equals, id)
                .Delete();

            return true;
        }
    }
}
