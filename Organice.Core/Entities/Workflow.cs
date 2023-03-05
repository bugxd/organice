using Organice.Core.Entities;

namespace backend.Models
{
    public class Workflow : BaseEntity
    {
        public string Title { get; set; } = null!;

        public string Description { get; set; } = string.Empty;

        public List<Node> Nodes { get; set; } = new List<Node>();

        public List<Edge> Edges { get; set; } = new List<Edge>();

        public List<string> Tags { get; set; } = new List<string>();

        public string OwnerId { get; set; } = string.Empty;
    }
}
