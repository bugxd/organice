namespace backend.Models
{
    // TODO refactor to appsettings
    public class OrganiceStoreSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string WorkflowCollectionName { get; set; } = null!;
    }
}
