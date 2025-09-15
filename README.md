# Gemini Flash API

A modern, full-stack Node.js application for interacting with Google Gemini's generative AI models. Features a responsive dashboard frontend for text, image, document, and audio processing.

## Features
- **Text Generation**: Generate text from prompts using Gemini API.
- **Image Analysis**: Upload images and get AI-generated descriptions or analysis.
- **Document Analysis**: Upload documents (PDF, DOC, DOCX, TXT) and receive markdown-formatted AI analysis.
- **Audio Analysis**: Upload audio files for transcription or analysis.
- **Modern Dashboard UI**: Responsive, client-side routed dashboard for easy navigation between features.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- Google Gemini API key

### Installation
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd gemini-flash-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key
   PORT=3000
   ```

### Running the App
```sh
npm start
```
Visit [http://localhost:3000/text](http://localhost:3000/text) in your browser.

## API Endpoints
- `POST /generate-text` — Generate text from a prompt (JSON: `{ prompt: string }`)
- `POST /generate-from-image` — Generate from an uploaded image (form-data: `image`, `prompt` optional)
- `POST /generate-from-document` — Analyze an uploaded document (form-data: `document`)
- `POST /generate-from-audio` — Analyze/transcribe an uploaded audio file (form-data: `audio`)

## Frontend
- Modern dashboard with sidebar navigation
- Client-side routing for `/text`, `/image`, `/document`, `/audio`
- Markdown rendering for document analysis results

## Project Structure
```
├── index.js           # Express backend
├── public/            # Frontend static files
│   ├── index.html
│   ├── style.css
│   └── script.js
├── uploads/           # Temporary upload storage
├── .env               # Environment variables
├── package.json
└── README.md
```

## License
ISC

---
Built with ❤️ using Express, Multer, and Google Gemini API.
