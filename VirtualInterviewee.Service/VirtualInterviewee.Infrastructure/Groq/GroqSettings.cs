namespace VirtualInterviewee.Infrastructure
{
    public class GroqSettings
    {
        public string ApiKey { get; set; } = string.Empty;
        public string BaseUrl { get; set; } = string.Empty;
        public string Model { get; set; } = string.Empty;
        public int MaxTokens { get; set; } = 1024;
        public double Temperature { get; set; } = 0.7;
    }
}
