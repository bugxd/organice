using MongoDB.Driver;
using Organice.Core.Entities;
using Organice.Core.Repositories;
using Organice.Infrastructure.Data;

namespace Organice.Infrastructure.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        private readonly IMongoCollection<T> collection;

        public BaseRepository(IOrganiceContext organiceContext)
        {
            if (organiceContext == null)
            {
                throw new ArgumentNullException(nameof(organiceContext));
            }

            this.collection = organiceContext.GetCollection<T>(typeof(T).Name);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await this.collection.Find(_ => true).ToListAsync();
        }

        public async Task<T> GetByIdAsync(string id)
        {
            var filter = Builders<T>.Filter.Eq(_ => _.Id, id);

            return await this.collection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<T> InsertAsync(T entity)
        {
            await this.collection.InsertOneAsync(entity);

            return entity;
        }

        public async Task<bool> RemoveAsync(string id)
        {
            var result = await this.collection.DeleteOneAsync(Builders<T>.Filter.Eq(_ => _.Id, id));

            return result.DeletedCount > 0;
        }
    }
}
