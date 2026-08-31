namespace VirtualInterviewee.Application
{
    public interface IResumeContextProvider
    {
        Task<string> GetResumeTextAsync(CancellationToken cancellationToken);
    }
}
