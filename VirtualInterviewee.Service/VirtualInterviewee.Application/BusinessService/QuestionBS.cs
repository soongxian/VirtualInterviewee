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
            - When introducing the candidate or discussing their experience, prioritize the MOST RECENT
              information first, based on dates, employment periods, project dates, education dates,
              or other chronological information explicitly stated in the resume.
            - Present subsequent older experience, projects, education, or achievements after the latest
              information, in reverse chronological order whenever the resume provides dates.
            - For the candidate's introduction, start with the candidate's latest/current role or
              experience, then briefly mention relevant previous experience from newest to oldest.
            - If dates are unavailable or ambiguous, do not guess the chronology. Use the order and
              information explicitly provided in the resume.
            - Do not omit relevant recent experience merely because older experience is described in
              greater detail in the resume.
            - If the resume does not fully support an answer, say so plainly instead of guessing.
            - Keep the answer concise, natural, and conversational, as in a real interview.

            RESUME:
            {resumeText}
            """;
        }
    }
}