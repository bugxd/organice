using backend.Models;
using MongoDB.Bson.Serialization.IdGenerators;
using Organice.Core.Repositories;

namespace Organice.Web.Queries
{
    public partial class Query
    {
        public Task<IEnumerable<Workflow>> GetWorkflowsAsync([Service] IWorkflowRepository workflowRepository) => workflowRepository.GetAllAsync();
        public Task<Workflow> GetWorkflowAsync(string id,[Service] IWorkflowRepository workflowRepository) => workflowRepository.GetByIdAsync(id);
    }
}
