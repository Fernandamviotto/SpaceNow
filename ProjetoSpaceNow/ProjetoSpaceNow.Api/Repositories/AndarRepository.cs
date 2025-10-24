using ProjetoSpaceNow.Api.Interfaces.Repository;
using ProjetoSpaceNow.Api.Models;
using Supabase;
using static Supabase.Postgrest.Constants;

namespace ProjetoSpaceNow.Api.Repositories
{
    public class AndarRepository : IAndarRepository
    {
        private readonly Client _supabaseClient;

        public AndarRepository(Client supabaseClient)
        {
            _supabaseClient = supabaseClient ?? throw new ArgumentNullException(nameof(supabaseClient));
        }

        public async Task<IEnumerable<AndarModel>> GetAllAsync()
        {
            var response = await _supabaseClient.Postgrest.Table<AndarModel>().Get();
            return response.Models ?? Enumerable.Empty<AndarModel>();
        }

        public async Task<AndarModel> GetByIdAsync(int id)
        {
            var response = await _supabaseClient.Postgrest
                .Table<AndarModel>()
                .Filter("id", Operator.Equals, id)
                .Get();
            return response.Models?.FirstOrDefault() ?? throw new Exception("Andar não encontrado.");
        }

        public async Task<IEnumerable<AndarModel>> GetByPredioIdAsync(int predioId)
        {
            var response = await _supabaseClient.Postgrest
                .Table<AndarModel>()
                .Filter("predio_id", Operator.Equals, predioId)
                .Get();
            return response.Models ?? Enumerable.Empty<AndarModel>();
        }

        public async Task<AndarModel?> GetByNomeAsync(string nome)
        {
            var response = await _supabaseClient.Postgrest
                .Table<AndarModel>()
                .Filter("nome", Operator.Equals, nome)
                .Get();
            return response.Models?.FirstOrDefault();
        }

        public async Task<AndarModel> CreateAsync(AndarModel andar)
        {
            var response = await _supabaseClient.Postgrest.Table<AndarModel>().Insert(andar);
            return response.Models?.FirstOrDefault() ?? throw new Exception("Falha ao criar o andar.");
        }

        public async Task<AndarModel> UpdateAsync(AndarModel andar)
        {
            var response = await _supabaseClient.Postgrest.Table<AndarModel>().Update(andar);
            return response.Models?.FirstOrDefault() ?? throw new Exception("Falha ao atualizar o andar.");
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var andar = await GetByIdAsync(id);
            if (andar == null) return false;

            await _supabaseClient.Postgrest
                .Table<AndarModel>()
                .Filter("id", Operator.Equals, id)
                .Delete();

            return true;
        }
    }
}
