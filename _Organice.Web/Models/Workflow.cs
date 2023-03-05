using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class Workflow
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string Title { get; set; } = null!;

        public decimal Description { get; set; }

        public List<Node> Nodes { get; set; } = new List<Node>();

        public List<Edge> Edges { get; set; } = new List<Edge>();

        public List<string> Tags { get; set; } = new List<string>();
    }
}
