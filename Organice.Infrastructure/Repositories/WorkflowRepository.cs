using backend.Models;
using Organice.Core.Repositories;
using Organice.Infrastructure.Data;

namespace Organice.Infrastructure.Repositories
{
    public class WorkflowRepository : BaseRepository<Workflow>, IWorkflowRepository
    {
        public WorkflowRepository(IOrganiceContext organiceContext) : base(organiceContext)
        {
        }
    }
}
