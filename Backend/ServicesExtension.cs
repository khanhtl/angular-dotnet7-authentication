using Backend.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Backend
{
    public static class ServicesExtension
    {
        public static void ProvideServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton<JwtService, JwtService>();
        }
    }
}
