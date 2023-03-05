using Organice.Core.Entities;

namespace backend.Models
{
    public class Node : BaseEntity
    {
        public string Label { get; set; } = string.Empty;

        /// <summary>
        /// Description formatted usig Markdown
        /// </summary>
        public string Description { get; set; } = string.Empty;

        public bool Deletable { get; set; }

        public NodeType NodeType { get; set; }
    }
}
