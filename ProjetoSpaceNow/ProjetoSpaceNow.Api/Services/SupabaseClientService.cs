using Supabase;

namespace ProjetoSpaceNow.Api.Services
{
    public class SupabaseClientService
    {
        public Client Client { get; private set; }

        public async Task InitAsync()
        {
            var url = Environment.GetEnvironmentVariable("SUPABASE_URL");
            var key = Environment.GetEnvironmentVariable("SUPABASE_KEY");

            Client = new Client(url, key);
            await Client.InitializeAsync();
        }
    }
}
