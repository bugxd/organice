using Organice.Core.Entities;

namespace backend.Models
{
    public class Edge : BaseEntity
    {
        public string Label { get; set; } = string.Empty;

        /// <summary>
        /// Source Node Id
        /// </summary>
        public string SourceId { get; set; } = string.Empty;

        /// <summary>
        /// Target Node Id
        /// </summary>
        public string TargetId { get; set; } = string.Empty;
    }
}
