using backend.Models;
using MongoDB.Driver;
using Organice.Core.Entities;

namespace Organice.Infrastructure.Data
{
    public class OrganiceContextSeed
    {
        public static void SeedData(IMongoDatabase database)
        {
            InsertUserSeed(database.GetCollection<User>(nameof(User)));
            InsertWorkflowSeed(database.GetCollection<Workflow>(nameof(Workflow)));
        }

        private static void InsertUserSeed(IMongoCollection<User> userCollection)
        {
            userCollection.DeleteMany(_ => true);
            userCollection.InsertMany(
               new List<User>
               {
                    new User
                    {
                        Id = "605fbfdda571444fd7ade05b",
                        Email = "admin@email.com"
                    }
               });
        }

        private static void InsertWorkflowSeed(IMongoCollection<Workflow> workflowCollection)
        {
            workflowCollection.DeleteMany(_ => true);
            workflowCollection.InsertMany(
               new List<Workflow>
               {
                    new Workflow
                    {
                        Id = "605fbfdda571444fd7ade05b",
                        Title = "First Workflow",
                        Description = "#First Workflow\n##Nodes:\n- Start\n- End\n##Edges:\n- Start -> End",
                        Nodes = new List<Node>{
                            new Node()
                            {
                                Id="640462c4e364bf1ce9007ffe",
                                Label = "Start",
                                Description = "First Node",
                                Deletable = false,
                                NodeType = NodeType.Output,
                            },
                            new Node()
                            {
                                Id="640462fe9bf58030973e1a1e",
                                Label = "End",
                                Description = "Last Node",
                                Deletable = false,
                                NodeType = NodeType.Input,
                            }
                        },
                        Edges = new List<Edge>
                        {
                            new Edge()
                            {
                                Id = "64046350408d5778d2d3e6a2",
                                Label = "Start -> End",
                                SourceId = "640462c4e364bf1ce9007ffe",
                                TargetId = "640462fe9bf58030973e1a1e"
                            }
                        },
                        Tags = new List<string>
                        {
                            "#test","#showout"
                        },
                        OwnerId = "605fbfdda571444fd7ade05b",
                    }
               });
        }
    }
}
