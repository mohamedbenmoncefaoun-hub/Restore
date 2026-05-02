using API.Data;
using API.Entities;
using API.MiddleWare;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<StoreContext>(opt=>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();
builder.Services.AddTransient<ExceptionMiddleWare>();
builder.Services.AddScoped<PaymentsService>();

builder.Services.AddIdentityApiEndpoints<User>(opt =>
{
   opt.User.RequireUniqueEmail = true;
})
.AddRoles<IdentityRole>()
.AddEntityFrameworkStores<StoreContext>();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleWare>();
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://localhost:3000");
}

);

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapGroup("api").MapIdentityApi<User>(); // api / login

DbIntializer.InitDb(app);

app.Run();
