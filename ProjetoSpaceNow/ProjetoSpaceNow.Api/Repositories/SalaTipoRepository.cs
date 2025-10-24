using ProjetoSpaceNow.Api.Interfaces.Repository;
using ProjetoSpaceNow.Api.Models;
using Supabase;
using static Supabase.Postgrest.Constants;

namespace ProjetoSpaceNow.Api.Repositories
{
    public class SalaTipoRepository : ISalaTipoRepository
    {
        private readonly Client _supabaseClient;

        public SalaTipoRepository(Client supabaseClient)
        {
            _supabaseClient = supabaseClient ?? throw new ArgumentNullException(nameof(supabaseClient));
        }

        public async Task<IEnumerable<SalaTipoModel>> GetAllAsync()
        {
            var response = await _supabaseClient.Postgrest.Table<SalaTipoModel>().Get();
            return response.Models ?? Enumerable.Empty<SalaTipoModel>();
        }

        public async Task<SalaTipoModel> GetByIdAsync(int id)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaTipoModel>()
                .Filter("id", Operator.Equals, id)
                .Get();
            return response.Models?.FirstOrDefault() ?? throw new Exception("Tipo de sala não encontrado.");
        }

        public async Task<SalaTipoModel> GetByDescricaoAsync(string descricao)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaTipoModel>()
                .Filter("descricao", Operator.Equals, descricao)
                .Get();
            return response.Models?.FirstOrDefault() ?? throw new Exception("Tipo de sala não encontrado pela descrição.");
        }

        public async Task<SalaTipoModel> CreateAsync(SalaTipoModel tipo)
        {
            var response = await _supabaseClient.Postgrest.Table<SalaTipoModel>().Insert(tipo);
            return response.Models?.FirstOrDefault() ?? throw new Exception("Falha ao criar o tipo de sala.");
        }

        public async Task<SalaTipoModel> UpdateAsync(SalaTipoModel tipo)
        {
            var response = await _supabaseClient.Postgrest.Table<SalaTipoModel>().Update(tipo);
            return response.Models?.FirstOrDefault() ?? throw new Exception("Falha ao atualizar o tipo de sala.");
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var tipo = await GetByIdAsync(id);
            if (tipo == null) return false;

            await _supabaseClient.Postgrest
                .Table<SalaTipoModel>()
                .Filter("id", Operator.Equals, id)
                .Delete();

            return true;
        }
    }
}
