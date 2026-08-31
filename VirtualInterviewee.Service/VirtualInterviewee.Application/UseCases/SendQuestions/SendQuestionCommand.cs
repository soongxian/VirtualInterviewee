using MediatR;

namespace VirtualInterviewee.Application
{
    public class SendQuestionCommand : IRequest<SendQuestionResponse>
    {
        public string Question { get; set; } = string.Empty;
    }

    public record SendQuestionResponse(string Answer);
}
