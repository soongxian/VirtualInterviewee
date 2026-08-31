namespace VirtualInterviewee.Domain
{
    public class RESUME
    {
        public string Name { get; set; }
        public double TotalExperienceYears { get; set; }
        public List<EXPERIENCE> Experience { get; set; } = new();
        public List<string> Skills { get; set; } = new();
        public List<string> Education { get; set; } = new();
        public List<string> Certification { get; set; } = new();
    }

    public class EXPERIENCE
    {
        public string? Company { get; set; }
        public string? Role { get; set; }
        public string? Duration { get; set; }
        public List<string> SkillsUsed { get; set; } = new();
    }
}
