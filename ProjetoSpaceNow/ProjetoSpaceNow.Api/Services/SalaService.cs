using ProjetoSpaceNow.Api.Models;

namespace ProjetoSpaceNow.Api.Services
{
    public class SalaService : IBaseService<SalaModel>
    {
        private readonly List<SalaModel> _salas = new();

        public Task<IEnumerable<SalaModel>> GetAll() =>
            Task.FromResult<IEnumerable<SalaModel>>(_salas);

        public Task<SalaModel> GetById(int id) =>
            Task.FromResult(_salas.FirstOrDefault(s => s.SalaId == id));

        public Task<SalaModel> Create(SalaModel sala)
        {
            sala.SalaId = _salas.Count + 1;
            _salas.Add(sala);
            return Task.FromResult(sala);
        }

        public Task<SalaModel> Update(SalaModel sala)
        {
            var existing = _salas.FirstOrDefault(s => s.SalaId == sala.SalaId);
            if (existing == null) return Task.FromResult<SalaModel>(null);

            existing.Apelido = sala.Apelido;
            existing.Capacidade = sala.Capacidade;
            existing.PublicoExterno = sala.PublicoExterno;
            existing.AndarId = sala.AndarId;
            existing.SalaTipoId = sala.SalaTipoId;
            return Task.FromResult(existing);
        }

        public Task<bool> Delete(int id)
        {
            var sala = _salas.FirstOrDefault(s => s.SalaId == id);
            if (sala == null) return Task.FromResult(false);
            _salas.Remove(sala);
            return Task.FromResult(true);
        }
    }
}
