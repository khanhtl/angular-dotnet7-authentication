using Microsoft.Extensions.DependencyInjection;

namespace Backend.Extensions
{
    public static class CorsExtension
    {
        public static void AddAppCors(this IServiceCollection services, string policy)
        {
            services.AddCors(option =>
            {
                option.AddPolicy(policy, policy =>
                {
                    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                });
            });
        }
    }
}
