
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MusicApp.Identity.API.Data;
using MusicApp.Identity.API.Data.Entities;

namespace MusicApp.Identity.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            var connectionString = builder.Configuration.GetConnectionString("Default");
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<ApplicationDbContext>(opt => opt.UseSqlServer(connectionString));
            builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            builder.Services.AddCors(builder =>
            {
                builder.AddPolicy("AllowAllOrigins",
                     policy => policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
                                     .AllowAnyMethod()
                                     .AllowAnyHeader());
            });
            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            using (var scope = app.Services.CreateScope())
            {
                Console.WriteLine("Inside scope");
                var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

                if (!dbContext.Database.CanConnect())
                {
                    Console.WriteLine("Trying to migrate");
                    dbContext.Database.Migrate();
                }
            }
            app.UseHttpsRedirection();
            app.UseCors("AllowAllOrigins");
            app.UseAuthorization();


            app.MapControllers();
            Console.WriteLine("Starting the app");
            app.Run();
        }
    }
}
