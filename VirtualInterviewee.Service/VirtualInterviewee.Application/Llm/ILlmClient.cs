namespace VirtualInterviewee.Application
{
    public interface ILlmClient
    {
        Task<string> CompleteAsync(string systemPrompt, string userMessage, CancellationToken cancellationToken);
    }
}
