namespace ProjetoSpaceNow.Api.Services
{
    public interface IBaseService<T>
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> GetById(int id);
        Task<T> Create(T entity);
        Task<T> Update(T entity);
        Task<bool> Delete(int id);
    }
}
