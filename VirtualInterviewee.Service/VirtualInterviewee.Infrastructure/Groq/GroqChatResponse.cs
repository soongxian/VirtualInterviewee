using System.Text.Json.Serialization;

namespace VirtualInterviewee.Infrastructure
{
    public class GroqChatResponse
    {
        [JsonPropertyName("choices")]
        public List<GroqChoice>? Choices { get; set; }
    }
}
