using ProjetoSpaceNow.Api.Interfaces;
using ProjetoSpaceNow.Api.Models;
using Supabase;
using static Supabase.Postgrest.Constants;

namespace ProjetoSpaceNow.Api.Repositories
{
    public class SalaRecursoRepository : ISalaRecursoRepository
    {
        private readonly Client _supabaseClient;

        public SalaRecursoRepository(Client supabaseClient)
        {
            _supabaseClient = supabaseClient ?? throw new ArgumentNullException(nameof(supabaseClient));
        }

        public async Task<IEnumerable<SalaRecursoModel>> GetAllAsync()
        {
            var response = await _supabaseClient.Postgrest.Table<SalaRecursoModel>().Get();
            return response.Models ?? Enumerable.Empty<SalaRecursoModel>();
        }

        public async Task<SalaRecursoModel> GetByIdAsync(Guid id)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaRecursoModel>()
                .Filter("id", Operator.Equals, id)
                .Get();
            return response.Models?.FirstOrDefault() ?? throw new Exception("Recurso não encontrado.");
        }

        public async Task<IEnumerable<SalaRecursoModel>> GetBySalaIdAsync(Guid salaId)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaRecursoModel>()
                .Filter("sala_id", Operator.Equals, salaId)
                .Get();
            return response.Models ?? Enumerable.Empty<SalaRecursoModel>();
        }

        public async Task<SalaRecursoModel> CreateAsync(SalaRecursoModel recurso)
        {
            var response = await _supabaseClient.Postgrest.Table<SalaRecursoModel>().Insert(recurso);
            return response.Models?.FirstOrDefault() ?? throw new Exception("Falha ao criar o recurso.");
        }

        public async Task<SalaRecursoModel> UpdateAsync(SalaRecursoModel recurso)
        {
            var response = await _supabaseClient.Postgrest.Table<SalaRecursoModel>().Update(recurso);
            return response.Models?.FirstOrDefault() ?? throw new Exception("Falha ao atualizar o recurso.");
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var recurso = await GetByIdAsync(id);
            if (recurso == null) return false;

            await _supabaseClient.Postgrest
                .Table<SalaRecursoModel>()
                .Filter("id", Operator.Equals, id)
                .Delete();

            return true;
        }
    }
}
