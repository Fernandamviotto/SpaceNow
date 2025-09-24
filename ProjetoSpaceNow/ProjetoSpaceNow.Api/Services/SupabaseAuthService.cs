using Supabase;
using ProjetoSpaceNow.Models;

namespace ProjetoSpaceNow.Services
{
    public class SupabaseAuthService
    {
        private readonly Client _client;

        public SupabaseAuthService(IConfiguration config)
        {
            var url = config["Supabase:Url"];
            var key = config["Supabase:Key"];
            _client = new Client(url, key);
        }

        public async Task<string?> LoginAsync(LoginRequest request)
        {
            var session = await _client.Auth.SignIn(request.Email, request.Password);
            return session?.AccessToken;
        }
    }
}
