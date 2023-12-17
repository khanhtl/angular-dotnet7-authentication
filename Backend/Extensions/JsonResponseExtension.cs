using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;

namespace Backend.Extensions
{
    public static class JsonResponseExtension
    {
        public static void UseCustomJsonResponse(this IMvcBuilder builder)
        {
            builder.AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());
        }
    }
}
