namespace VirtualInterviewee.Application
{
    public class QuestionBS(ILlmClient llmClient, IResumeContextProvider resumeProvider) : IQuestionBS
    {
        public async Task<string> SendQuestionAsync(string question, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(question))
            {
                throw new ArgumentException("Question cannot be empty.", nameof(question));
            }

            var resumeText = await resumeProvider.GetResumeTextAsync(cancellationToken);
            var answer = await llmClient.CompleteAsync(BuildSystemPrompt(resumeText), question, cancellationToken);

            return answer.Trim();
        }

        private static string BuildSystemPrompt(string resumeText)
        {
            return $"""
            You are answering job interview questions AS THE CANDIDATE, in the first person ("I ...").
            Only use the RESUME below as the source of truth about the candidate's background.

            Strict rules:
            - Never invent experience, skills, projects, education, employment history, achievements,
              technologies, responsibilities, dates, or metrics that are not present in the resume.
            - Do not infer facts that are not explicitly supported by the resume.
            - If the resume does not fully support an answer, say so plainly instead of guessing.
            - Keep the answer concise, natural, and conversational, as in a real interview.

            RESUME:
            {resumeText}
            """;
        }
    }
}