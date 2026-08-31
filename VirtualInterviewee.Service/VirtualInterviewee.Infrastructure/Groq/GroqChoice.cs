using System.Text.Json.Serialization;

namespace VirtualInterviewee.Infrastructure
{
    public class GroqChoice
    {
        [JsonPropertyName("message")]
        public GroqMessage? Message { get; set; }
    }
}
