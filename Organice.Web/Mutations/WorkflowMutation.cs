using backend.Models;
using Organice.Core.Repositories;

namespace Organice.Web.Mutations
{
    public partial class Mutation
    {
        public async Task<Workflow> GetWorkflowAsync(Workflow workflow, [Service] IWorkflowRepository workflowRepository)
        {
            var result = await workflowRepository.InsertAsync(workflow);

            return result;
        }
    }
}
