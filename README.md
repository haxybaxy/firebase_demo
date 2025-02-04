# PDF Chat with Gemini

A command-line application that allows you to chat with Google's Gemini AI about the contents of a PDF file.

## Prerequisites

- Node.js (v16 or higher recommended)
- Google API key for Gemini

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Google API key:

```bash
GOOGLE_API_KEY=your_google_api_key_here
```

## Usage

Run the application with the path to your PDF file and an optional prompt:

```bash
node index.ts <pdf_file_path> 
```


You can also provide a custom system prompt:

```bash
node index.ts <pdf_file_path> [prompt]
```

Once running:
- Type your questions at the prompt (>)
- Press Enter to send your question
- Press Ctrl+C to exit

## Features

- PDF text extraction
- Interactive chat interface
- Configurable system prompt
- Automatic size checking for PDF content
- Environment variable configuration

## Dependencies

- @genkit-ai/googleai - Google AI integration
- genkit - AI interaction framework
- pdf-parse - PDF text extraction
- dotenv - Environment variable management

## Notes

- The application has a default text limit of 30,000 characters to prevent context window overflow
- Large PDFs may need to be split into smaller segments
