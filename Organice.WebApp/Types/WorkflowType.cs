using backend.Models;
using Organice.Web.Resolvers;

namespace Organice.Web.Types
{
    public class WorkflowType : ObjectType<Workflow>
    {
        protected override void Configure(IObjectTypeDescriptor<Workflow> descriptor)
        {
            descriptor.Field(_ => _.Id);
            descriptor.Field(_ => _.Title);
            descriptor.Field(_ => _.Description);
            descriptor.Field(_ => _.Nodes);
            descriptor.Field(_ => _.Edges);
            descriptor.Field(_ => _.Tags);
            descriptor.Field(_ => _.OwnerId);

            // Creates the relationship between Workflow x Owner(User)
            descriptor.Field<UserResolver>(_ => _.GetUserAsync(default, default));
        }
    }
}
