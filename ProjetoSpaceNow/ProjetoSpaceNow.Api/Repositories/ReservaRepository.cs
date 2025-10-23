using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Repositories
{
    public class ReservaRepository
    {
        private readonly Supabase.Client _client;

        public ReservaRepository(Supabase.Client client)
        {
            _client = client;
        }

        public async Task<IEnumerable<ReservaModel>> GetReservas(DateTime data)
        {
            var table = _client.From<ReservaModel>();

            var response = await table
                .Where(r => r.DataInicio.Date == data.Date)
                .Get();

            return response.Models;
        }
    }
}
