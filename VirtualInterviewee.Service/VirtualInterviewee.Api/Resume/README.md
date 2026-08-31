# Resume folder

Drop the candidate's resume PDF(s) here (`*.pdf`).

- Every PDF in this folder is read at first request and cached for the process lifetime.
- Files are copied to the build output (`bin/.../Resume`) via the `Content` item in the .csproj.
- The folder can be overridden with `Resume:FolderPath` in appsettings (absolute path, or relative to the app base directory).
