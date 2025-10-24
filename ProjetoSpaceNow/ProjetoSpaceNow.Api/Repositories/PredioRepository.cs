using ProjetoSpaceNow.Api.Interfaces.Repository;
using ProjetoSpaceNow.Api.Models;
using Supabase;
using static Supabase.Postgrest.Constants;

namespace ProjetoSpaceNow.Api.Repositories
{
    public class PredioRepository : IPredioRepository
    {
        private readonly Client _supabaseClient;

        public PredioRepository(Client supabaseClient)
        {
            _supabaseClient = supabaseClient ?? throw new ArgumentNullException(nameof(supabaseClient));
        }

        public async Task<IEnumerable<PredioModel>> GetAllAsync()
        {
            var response = await _supabaseClient.Postgrest.Table<PredioModel>().Get();
            return response.Models ?? Enumerable.Empty<PredioModel>();
        }

        public async Task<PredioModel> GetByIdAsync(int id)
        {
            var response = await _supabaseClient.Postgrest
                .Table<PredioModel>()
                .Filter("id", Operator.Equals, id)
                .Get();
            return response.Models?.FirstOrDefault() ?? throw new Exception("Prédio não encontrado.");
        }

        public async Task<PredioModel> GetByApelidoAsync(string apelido)
        {
            var response = await _supabaseClient.Postgrest
                .Table<PredioModel>()
                .Filter("apelido", Operator.Equals, apelido)
                .Get();
            return response.Models?.FirstOrDefault() ?? throw new Exception("Prédio não encontrado pelo apelido.");
        }

        public async Task<PredioModel> CreateAsync(PredioModel predio)
        {
            var response = await _supabaseClient.Postgrest.Table<PredioModel>().Insert(predio);
            return response.Models?.FirstOrDefault() ?? throw new Exception("Falha ao criar o prédio.");
        }

        public async Task<PredioModel> UpdateAsync(PredioModel predio)
        {
            var response = await _supabaseClient.Postgrest.Table<PredioModel>().Update(predio);
            return response.Models?.FirstOrDefault() ?? throw new Exception("Falha ao atualizar o prédio.");
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var predio = await GetByIdAsync(id);
            if (predio == null) return false;

            await _supabaseClient.Postgrest
                .Table<PredioModel>()
                .Filter("id", Operator.Equals, id)
                .Delete();

            return true;
        }
    }
}
