using System.Text.Json.Serialization;

namespace VirtualInterviewee.Infrastructure
{
    public class GroqMessage
    {
        [JsonPropertyName("role")]
        public string Role { get; set; } = string.Empty;

        [JsonPropertyName("content")]
        public string Content { get; set; } = string.Empty;
    }
}
