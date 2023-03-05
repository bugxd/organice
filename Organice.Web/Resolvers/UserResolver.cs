using backend.Models;
using Organice.Core.Entities;
using Organice.Core.Repositories;

namespace Organice.Web.Resolvers
{
    [ExtendObjectType(Name = "SearchTag")]
    public class UserResolver
    {
        public Task<User> GetUserAsync(
         [Parent] Workflow workflow,
         [Service] IUserRepository userRepository) => userRepository.GetByIdAsync(workflow.OwnerId);
    }
}
