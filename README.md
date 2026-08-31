# Virtual Interviewee

This project is an Angular + C# .NET web application that acts as a **virtual version of yourself**, allowing users to interact with an AI interviewee based on information extracted from their resume.

## Features

- Chat with a virtual interviewee
- Generate responses based on information from your resume

## Usage Guide 😎

### Initialization

#### 1. Configure the Groq API Key

Add your Groq API key to `appsettings.json` in `VirtualInterviewee.Api`.

<img width="1246" height="466" alt="image" src="https://github.com/user-attachments/assets/77624af8-87e2-44e7-ab1f-961e47af691a" />

#### 2. Add Your Resume

Place your PDF resume in:

```text
VirtualInterviewee\VirtualInterviewee.Service\VirtualInterviewee.Api\Resume
```

<img width="1400" height="240" alt="image" src="https://github.com/user-attachments/assets/d9f6fb1f-662d-4c2b-80dd-4032fe2e5e21" />

#### 3. Start the Application

Run both the backend and frontend:

**Backend**

Run the `VirtualInterviewee.Api` project.

**Frontend**

Navigate to `virtualinterviewee.web` and run:

```
npm run dev
```

Once both applications are running, you can start chatting with your virtual interviewee.
