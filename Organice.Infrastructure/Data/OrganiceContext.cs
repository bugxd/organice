using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Organice.Infrastructure.Configurations;

namespace Organice.Infrastructure.Data
{
    public class OrganiceContext : IOrganiceContext
    {
        private readonly IMongoDatabase database;

        public OrganiceContext(IOptions<MongoDbConfiguration> mongoDbConfiguration)
        {
            var client = new MongoClient(mongoDbConfiguration.Value.ConnectionString);

            this.database = client.GetDatabase(mongoDbConfiguration.Value.Database);

            OrganiceContextSeed.SeedData(this.database);
        }

        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return this.database.GetCollection<T>(name);
        }
    }
}
