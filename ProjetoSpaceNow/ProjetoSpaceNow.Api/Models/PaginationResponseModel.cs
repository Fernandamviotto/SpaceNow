namespace ProjetoSpaceNow.Api.Models
{
    public class PaginationResponseModel<T>
    {
        public IEnumerable<T> Items { get; set; }
        public int TotalCount { get; set; }
    }
}
