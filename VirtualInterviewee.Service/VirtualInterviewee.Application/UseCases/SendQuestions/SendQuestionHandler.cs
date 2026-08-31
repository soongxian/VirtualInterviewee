using MediatR;

namespace VirtualInterviewee.Application
{
    public class SendQuestionHandler(IQuestionBS questionBS) : IRequestHandler<SendQuestionCommand, SendQuestionResponse>
    {
        public async Task<SendQuestionResponse> Handle(SendQuestionCommand request, CancellationToken cancellationToken)
        {
            var reply = await questionBS.SendQuestionAsync(request.Question, cancellationToken);
            return new SendQuestionResponse(reply);
        }
    }
}
