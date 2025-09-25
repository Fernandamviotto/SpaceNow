﻿using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Repositories
{
    public class UsuarioRepository
    {
        private readonly Supabase.Client _client;

        public UsuarioRepository(Supabase.Client client)
        {
            _client = client;
        }

        public async Task<Usuario> GetUserById(Guid id)
        {
            var table = _client.From<Usuario>();

            var users = await table
                .Where(u => u.Id == id)
                .Get();

            return users.Models.FirstOrDefault();
        }
    }
}
