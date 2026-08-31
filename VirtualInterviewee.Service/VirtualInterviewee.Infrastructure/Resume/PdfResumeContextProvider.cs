using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using UglyToad.PdfPig;
using VirtualInterviewee.Application;

namespace VirtualInterviewee.Infrastructure
{
    public class PdfResumeContextProvider(
        IOptions<ResumeSettings> settings,
        ILogger<PdfResumeContextProvider> logger) : IResumeContextProvider
    {
        private readonly ResumeSettings _settings = settings.Value;
        private readonly SemaphoreSlim _gate = new(1, 1);
        private string? _cachedText;

        public async Task<string> GetResumeTextAsync(CancellationToken cancellationToken)
        {
            if (_cachedText is not null)
            {
                return _cachedText;
            }

            await _gate.WaitAsync(cancellationToken);
            try
            {
                return _cachedText ??= ReadResumeFolder();
            }
            finally
            {
                _gate.Release();
            }
        }

        private string ReadResumeFolder()
        {
            var folder = Path.IsPathRooted(_settings.FolderPath)
                ? _settings.FolderPath
                : Path.Combine(AppContext.BaseDirectory, _settings.FolderPath);

            if (!Directory.Exists(folder))
            {
                throw new DirectoryNotFoundException($"Resume folder not found: {folder}");
            }

            var pdfFiles = Directory.GetFiles(folder, "*.pdf", SearchOption.TopDirectoryOnly);
            if (pdfFiles.Length == 0)
            {
                throw new FileNotFoundException($"No PDF resume found in {folder}.");
            }

            var sections = pdfFiles.Order().Select(ExtractText);
            var text = string.Join(Environment.NewLine + Environment.NewLine, sections);

            logger.LogInformation("Loaded {Count} resume PDF(s) from {Folder} ({Length} chars).",
                pdfFiles.Length, folder, text.Length);

            return text;
        }

        private static string ExtractText(string filePath)
        {
            using var document = PdfDocument.Open(filePath);
            var pages = document.GetPages()
                .Select(page => string.Join(' ', page.GetWords().Select(w => w.Text)));
            return string.Join(Environment.NewLine, pages);
        }
    }
}
