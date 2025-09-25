using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Repositories
{
    public class SalaRepository
    {
        private readonly Supabase.Client _client;

        public SalaRepository(Supabase.Client client)
        {
            _client = client;
        }

        public async Task<IEnumerable<Sala>> GetAllSalas()
        {
            var table = _client.From<Sala>();

            var response = await table.Get();
            return response.Models;
        }
    }
}
