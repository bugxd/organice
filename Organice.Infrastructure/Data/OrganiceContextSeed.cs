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
                        Description = $"# First Workflow  \r\n" +
                        $"This is just an example description.  \r\n" +
                        $"## Nodes:  \r\n" +
                        $"- Start  \r\n" +
                        $"- End  \r\n" +
                        $"## Edges:  \r\n" +
                        $"- Start -> End",
                        Nodes = new List<Node>{
                            new Node()
                            {
                                Id="640462c4e364bf1ce9007ffe",
                                Label = "Start",
                                Description = "First Node",
                                Deletable = false,
                                NodeType = NodeType.Input,
                                Position = new Point()
                                {
                                    X = 0,
                                    Y = 0,
                                }
                            },
                            new Node()
                            {
                                Id="640462fe9bf58030973e1a1e",
                                Label = "End",
                                Description = "Last Node",
                                Deletable = false,
                                NodeType = NodeType.Output,
                                Position = new Point()
                                {
                                    X = 0,
                                    Y = 100,
                                }
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
                            "test","showout"
                        },
                        OwnerId = "605fbfdda571444fd7ade05b",
                    },
                    new Workflow
                    {
                        Id = "640c9ba2e03f01114322f9a3",
                        Title = "Second Workflow",
                        Description = $"# First Workflow  \r\n" +
                        $"This is just an example description.  \r\n" +
                        $"## Nodes:  \r\n" +
                        $"- Start  \r\n" +
                        $"- End  \r\n" +
                        $"## Edges:  \r\n" +
                        $"- Start -> End",
                        Nodes = new List<Node>{
                            new Node()
                            {
                                Id="640c9bb25de24839d1a4c965",
                                Label = "Start",
                                Description = "First Node",
                                Deletable = false,
                                NodeType = NodeType.Input,
                                Position = new Point()
                                {
                                    X = 0,
                                    Y = 0,
                                }
                            },
                            new Node()
                            {
                                Id="640c9bb8ea6390ff3ea8842f",
                                Label = "End",
                                Description = "Last Node",
                                Deletable = false,
                                NodeType = NodeType.Output,
                                Position = new Point()
                                {
                                    X = 0,
                                    Y = 100,
                                }
                            }
                        },
                        Edges = new List<Edge>
                        {
                            new Edge()
                            {
                                Id = "640c9bbcea15e8715ae06872",
                                Label = "Start -> End",
                                SourceId = "640c9bb25de24839d1a4c965",
                                TargetId = "640c9bb8ea6390ff3ea8842f"
                            }
                        },
                        Tags = new List<string>
                        {
                            "test","showout"
                        },
                        OwnerId = "605fbfdda571444fd7ade05b",
                    },
                    new Workflow
                    {
                        Id = "640c9bc99506dbee1dd3ba95",
                        Title = "Third Workflow",
                        Description = $"# First Workflow  \r\n" +
                        $"This is just an example description.  \r\n" +
                        $"## Nodes:  \r\n" +
                        $"- Start  \r\n" +
                        $"- End  \r\n" +
                        $"## Edges:  \r\n" +
                        $"- Start -> End",
                        Nodes = new List<Node>{
                            new Node()
                            {
                                Id="640c9bcc8e2b93af605db1d3",
                                Label = "Start",
                                Description = "First Node",
                                Deletable = false,
                                NodeType = NodeType.Input,
                                Position = new Point()
                                {
                                    X = 0,
                                    Y = 0,
                                }
                            },
                            new Node()
                            {
                                Id="640c9bd0002f43b02234fc81",
                                Label = "End",
                                Description = "Last Node",
                                Deletable = false,
                                NodeType = NodeType.Output,
                                Position = new Point()
                                {
                                    X = 0,
                                    Y = 100,
                                }
                            }
                        },
                        Edges = new List<Edge>
                        {
                            new Edge()
                            {
                                Id = "640c9bd5b2524113b8be8a23",
                                Label = "Start -> End",
                                SourceId = "640c9bcc8e2b93af605db1d3",
                                TargetId = "640c9bd0002f43b02234fc81"
                            }
                        },
                        Tags = new List<string>
                        {
                            "test","showout"
                        },
                        OwnerId = "605fbfdda571444fd7ade05b",
                    },
               });
        }
    }
}
