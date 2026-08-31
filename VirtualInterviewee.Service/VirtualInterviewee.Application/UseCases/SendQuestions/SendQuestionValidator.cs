using FluentValidation;

namespace VirtualInterviewee.Application
{
    public class SendQuestionValidator : AbstractValidator<SendQuestionCommand>
    {
        public SendQuestionValidator()
        {
            RuleFor(c => c.Question).NotEmpty();
        }
    }
}
