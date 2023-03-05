using Organice.Core.Entities;
using Organice.Core.Repositories;
using Organice.Infrastructure.Data;

namespace Organice.Infrastructure.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(IOrganiceContext organiceContext) : base(organiceContext)
        {
        }
    }
}
