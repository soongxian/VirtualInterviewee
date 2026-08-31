using System.Net.Http.Json;
using Microsoft.Extensions.Options;
using VirtualInterviewee.Application;

namespace VirtualInterviewee.Infrastructure
{
    public class GroqChatClient(HttpClient httpClient, IOptions<GroqSettings> settings) : ILlmClient
    {
        private readonly GroqSettings _settings = settings.Value;

        public async Task<string> CompleteAsync(string systemPrompt, string userMessage, CancellationToken cancellationToken)
        {
            var requestBody = new GroqChatRequest
            {
                Model = _settings.Model,
                MaxTokens = _settings.MaxTokens,
                Temperature = _settings.Temperature,
                Messages =
                [
                    new GroqMessage { Role = "system", Content = systemPrompt },
                    new GroqMessage { Role = "user", Content = userMessage }
                ]
            };

            var response = await httpClient.PostAsJsonAsync("chat/completions", requestBody, cancellationToken);
            response.EnsureSuccessStatusCode();

            var payload = await response.Content.ReadFromJsonAsync<GroqChatResponse>(cancellationToken);
            return payload?.Choices?.FirstOrDefault()?.Message?.Content ?? string.Empty;
        }
    }
}
