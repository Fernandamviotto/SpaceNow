using ProjetoSpaceNow.Api.Interfaces.Repository;
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

        public async Task<SalaDisponibilidadeModel> GetByIdAsync(int id)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaDisponibilidadeModel>()
                .Filter("id", Operator.Equals, id)
                .Get();
            return response.Models?.FirstOrDefault() ?? throw new Exception("Disponibilidade não encontrada.");
        }

        public async Task<IEnumerable<SalaDisponibilidadeModel>> GetBySalaIdAsync(int salaId)
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

        public async Task<IEnumerable<SalaDisponibilidadeModel>> GetDisponiveisAsync(int salaId, TimeSpan inicio, TimeSpan fim, DiaSemanaEnum dia)
        {
            var response = await _supabaseClient.Postgrest
                .Table<SalaDisponibilidadeModel>()
                .Filter("sala_id", Operator.Equals, salaId)
                .Filter("dia_semana", Operator.Equals, (int)dia)
                .Filter("hora_inicio", Operator.LessThanOrEqual, inicio)
                .Filter("hora_fim", Operator.GreaterThanOrEqual, fim)
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

        public async Task<bool> DeleteAsync(int id)
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
