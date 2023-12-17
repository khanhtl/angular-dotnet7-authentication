using Backend.Interfaces;
using Backend.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.Extensions
{
    public static class ServiceExtension
    {
        public static void ProvideServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<IJwtService, JwtService>();
        }
    }
}
