using Organice.Core.Repositories;
using Organice.Infrastructure.Configurations;
using Organice.Infrastructure.Data;
using Organice.Infrastructure.Repositories;
using Organice.Web.Mutations;
using Organice.Web.Queries;
using Organice.Web.Resolvers;
using Organice.Web.Subscriptions;
using Organice.Web.Types;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();

// Configuration
builder.Services.Configure<MongoDbConfiguration>(
    builder.Configuration.GetSection("MongoDbConfiguration"));

// Repositories
builder.Services.AddSingleton<IOrganiceContext, OrganiceContext>();
builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IWorkflowRepository, WorkflowRepository>();

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
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.MapGraphQL();

app.Run();
