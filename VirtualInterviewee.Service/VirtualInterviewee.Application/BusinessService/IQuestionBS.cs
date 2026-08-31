namespace VirtualInterviewee.Application
{
    public interface IQuestionBS
    {
        Task<string> SendQuestionAsync(string question, CancellationToken cancellationToken);
    }
}
