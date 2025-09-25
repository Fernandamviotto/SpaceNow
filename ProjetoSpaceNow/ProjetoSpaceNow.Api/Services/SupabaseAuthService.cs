using Microsoft.Extensions.Options;
using ProjetoSpaceNow.Api.Models;
using ProjetoSpaceNow.Models;
using System.Net.Http.Headers;
using System.Text.Json;

namespace ProjetoSpaceNow.Services
{
    public class SupabaseAuthService
    {
        private readonly SupabaseSettings _supabaseSettings;
        private readonly HttpClient _httpClient;

        public SupabaseAuthService(IOptions<SupabaseSettings> options)
        {
            _supabaseSettings = options.Value;

            _httpClient = new HttpClient
            {
                BaseAddress = new Uri(_supabaseSettings.Url)
            };
            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", _supabaseSettings.Key);
        }

        public async Task<string> CreateUserAsync(string email, string password)
        {
            var payload = new
            {
                email,
                password
            };

            var response = await _httpClient.PostAsJsonAsync("auth/v1/signup", payload);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            return json;
        }

        public async Task<string> SignInAsync(string email, string password)
        {
            var payload = new
            {
                email,
                password
            };

            var response = await _httpClient.PostAsJsonAsync("auth/v1/token?grant_type=password", payload);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            return json;
        }

        public async Task<string> LoginAsync(LoginRequest request)
        {
            var payload = new
            {
                email = request.Email,
                password = request.Password
            };

            var response = await _httpClient.PostAsJsonAsync("auth/v1/token?grant_type=password", payload);

            if (!response.IsSuccessStatusCode) return null;

            var json = await response.Content.ReadAsStringAsync();
            var doc = JsonDocument.Parse(json);

            if (doc.RootElement.TryGetProperty("access_token", out var token))
                return token.GetString();

            return null;
        }

        public void PrintConfig()
        {
            Console.WriteLine($"Supabase URL: {_supabaseSettings.Url}");
            Console.WriteLine($"Supabase Key: {_supabaseSettings.Key}");
        }
    }
}
