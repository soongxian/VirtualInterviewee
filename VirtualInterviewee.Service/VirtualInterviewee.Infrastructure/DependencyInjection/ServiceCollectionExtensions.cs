using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System.Net.Http.Headers;
using VirtualInterviewee.Application;

namespace VirtualInterviewee.Infrastructure
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddOptions<GroqSettings>()
                .Bind(configuration.GetSection("Groq"))
                .Validate(s => !string.IsNullOrWhiteSpace(s.ApiKey),
                    "Groq:ApiKey is missing.")
                .Validate(s => Uri.IsWellFormedUriString(s.BaseUrl, UriKind.Absolute), "Groq:BaseUrl must be an absolute URL.")
                .ValidateOnStart();

            services.Configure<ResumeSettings>(configuration.GetSection("Resume"));

            services.AddSingleton<IResumeContextProvider, PdfResumeContextProvider>();

            services.AddHttpClient<ILlmClient, GroqChatClient>((sp, client) =>
            {
                var settings = sp.GetRequiredService<IOptions<GroqSettings>>().Value;
                client.BaseAddress = new Uri(settings.BaseUrl.TrimEnd('/') + "/");
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", settings.ApiKey);
            });

            return services;
        }
    }
}
