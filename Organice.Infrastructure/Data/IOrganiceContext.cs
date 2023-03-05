using backend.Models;
using MongoDB.Driver;
using Organice.Core.Entities;

namespace Organice.Infrastructure.Data
{
    public interface IOrganiceContext
    {
        IMongoCollection<T> GetCollection<T>(string name);
    }
}
