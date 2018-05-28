using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using QuizzGame.Data;
using QuizzGame.Models;
using QuizzGame.Services;

namespace QuizzGame
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;


        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            /*
            services.AddAuthentication().AddFacebook(options =>
            {
                options.AppId = Configuration["Authentication:Facebook:AppId"];
                options.AppSecret = Configuration["Authentication:Facebook:AppSecret"];
            });
            */
            services.AddDbContext<QuizzGameContext>(options => options.UseSqlServer(Configuration.GetConnectionString("LocalDb")));

            services.AddIdentity<User, IdentityRole>().AddEntityFrameworkStores<QuizzGameContext>().AddDefaultTokenProviders();

            services.AddScoped<RoleManager<IdentityRole>>();

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            IServiceScopeFactory scopeFactory = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>();

            using (IServiceScope scope = scopeFactory.CreateScope())
            {
                var context = scope.ServiceProvider.GetService<QuizzGameContext>();

               // context.Database.EnsureDeleted();
                context.Database.Migrate();
/*
                RoleManager<IdentityRole> roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                UserManager<User> userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();

                if (!roleManager.Roles.Any(r => r.Name == "Admin"))
                {
                    roleManager.CreateAsync(new IdentityRole("Admin")).Wait();
                }

                if (!roleManager.Roles.Any(r => r.Name == "User"))
                {
                    roleManager.CreateAsync(new IdentityRole("User")).Wait();
                }

                if (!userManager.Users.Any(u => u.Email == "admin@admin.com"))
                {
                    var user = new User { UserName = "admin@admin.com", Email = "admin@admin.com" };
                    userManager.CreateAsync(user, "Admin1!").Wait();
                    userManager.AddToRoleAsync(user, "Admin").Wait();
                }

    */

                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                    app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                    {
                        HotModuleReplacement = true,
                        ReactHotModuleReplacement = true
                    });
                }
                else
                {
                    app.UseExceptionHandler("/Home/Error");
                }

                app.UseStaticFiles();

                app.UseAuthentication();

                app.UseMvc(routes =>
                {
                    routes.MapRoute(
                        name: "default",
                        template: "{controller=Account}/{action=Login}/{id?}");

                    routes.MapSpaFallbackRoute(
                        name: "spa-fallback",
                        defaults: new { controller = "Home", action = "Index" });
                });

                try
                {
                    //context.Database.EnsureDeleted();
                    context.Database.Migrate();

                    if (!context.Questions.Any())
                    {
                        context.SeedQuestions();
                    }
                }

                catch (Exception e)
                {
                    var msg = e.Message;
                    var stacktrace = e.StackTrace;
                }


            }
        }
    }
}
  