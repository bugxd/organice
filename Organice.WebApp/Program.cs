using Net6_Controller_And_VIte;
using Organice.Core.Repositories;
using Organice.Infrastructure.Configurations;
using Organice.Infrastructure.Data;
using Organice.Infrastructure.Repositories;
using Organice.Web.Mutations;
using Organice.Web.Queries;
using Organice.Web.Resolvers;
using Organice.Web.Types;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configuration
builder.Services.Configure<MongoDbConfiguration>(
    builder.Configuration.GetSection("MongoDbConfiguration"));

// Repositories
builder.Services.AddSingleton<IOrganiceContext, OrganiceContext>();
builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IWorkflowRepository, WorkflowRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// In production, the Vite files will be served from this directory
builder.Services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp/dist";
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// GraphQL
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    //.AddSubscriptionType(d => d.Name("Subscription"))
    //    .AddTypeExtension<WorkflowSubscriptions>()
    .AddType<WorkflowType>()
    .AddType<UserResolver>();
//.AddInMemorySubscriptions();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseSpaStaticFiles();


app.UseRouting();
app.UseAuthorization();
app.UseEndpoints(endpoints => {
    endpoints.MapControllers();
    endpoints.MapGraphQL();
});

app.UseSpa(spa =>
{
    if (app.Environment.IsDevelopment())
        spa.UseViteDevelopmentServer(sourcePath: "ClientApp");
});

app.Run();
