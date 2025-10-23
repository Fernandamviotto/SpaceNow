using ProjetoSpaceNow.Api.Interfaces;
using ProjetoSpaceNow.Api.Models;
using ProjetoSpaceNow.Api.Models.Enums;
using Supabase;
using static Supabase.Postgrest.Constants;

namespace ProjetoSpaceNow.Api.Repositories
{
    public class SalaDisponibilidadeRepository : ISalaDisponibilidadeRepository
    {
        private readonly Client _supabaseClient;

        public SalaDisponibilidadeRepository(Client supabaseClient)
        {
            _supabaseClient = supabaseClient ?? throw new ArgumentNullException(nameof(supabaseClient));
        }

        public async Task<IEnumerable<SalaDisponibilidadeModel>> GetAllAsync()
        {
            var response = await _supabaseClient.Postgrest.Table<SalaDisponibilidadeModel>().Get();
            return response.Models ?? Enumerable.Empty<SalaDisponibilidadeModel>();
        }

        public async Task<SalaDisponibilidadeModel> GetByIdAsync(Guid id)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaDisponibilidadeModel>()
                .Filter("id", Operator.Equals, id)
                .Get();
            return response.Models?.FirstOrDefault() ?? throw new Exception("Disponibilidade não encontrada.");
        }

        public async Task<IEnumerable<SalaDisponibilidadeModel>> GetBySalaIdAsync(Guid salaId)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaDisponibilidadeModel>()
                .Filter("sala_id", Operator.Equals, salaId)
                .Get();
            return response.Models ?? Enumerable.Empty<SalaDisponibilidadeModel>();
        }

        public async Task<IEnumerable<SalaDisponibilidadeModel>> GetByDiaSemanaAsync(DiaSemanaEnum dia)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaDisponibilidadeModel>()
                .Filter("dia_semana", Operator.Equals, (int)dia)
                .Get();
            return response.Models ?? Enumerable.Empty<SalaDisponibilidadeModel>();
        }

        public async Task<IEnumerable<SalaDisponibilidadeModel>> GetDisponiveisAsync(Guid salaId, TimeSpan inicio, TimeSpan fim, DiaSemanaEnum dia)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaDisponibilidadeModel>()
                .Filter("sala_id", Operator.Equals, salaId)
                .Filter("dia_semana", Operator.Equals, (int)dia)
                .Filter("hora_inicio", Operator.Lte, inicio)
                .Filter("hora_fim", Operator.Gte, fim)
                .Get();

            return response.Models ?? Enumerable.Empty<SalaDisponibilidadeModel>();
        }

        public async Task<SalaDisponibilidadeModel> CreateAsync(SalaDisponibilidadeModel disponibilidade)
        {
            var response = await _supabaseClient.Postgrest.Table<SalaDisponibilidadeModel>().Insert(disponibilidade);
            return response.Models?.FirstOrDefault() ?? throw new Exception("Falha ao criar a disponibilidade.");
        }

        public async Task<SalaDisponibilidadeModel> UpdateAsync(SalaDisponibilidadeModel disponibilidade)
        {
            var response = await _supabaseClient.Postgrest.Table<SalaDisponibilidadeModel>().Update(disponibilidade);
            return response.Models?.FirstOrDefault() ?? throw new Exception("Falha ao atualizar a disponibilidade.");
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var disponibilidade = await GetByIdAsync(id);
            if (disponibilidade == null) return false;

            await _supabaseClient.Postgrest
                .Table<SalaDisponibilidadeModel>()
                .Filter("id", Operator.Equals, id)
                .Delete();

            return true;
        }
    }
}
