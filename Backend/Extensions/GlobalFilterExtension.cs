using Backend.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Backend.Extensions
{
    public static class GlobalFilterExtension
    {
        public static IMvcBuilder AddControllerWithFilter(this IServiceCollection services)
        {
            return services.AddControllers(config =>
             {
                 config.Filters.Add(typeof(ValidateModelStateAttribute));
             });
        }
    }
}
