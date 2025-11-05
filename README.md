<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1ccj0N2NMPKWP_f1aC9aMJoG37Pqj2Gdh

## Run Locally

**Prerequisites:**  Node.js

### ⚠️ SECURITY WARNING

**This application exposes the Gemini API key to the client-side code.** This is a significant security risk and should only be used for:
- Local development and testing
- Personal use on trusted devices
- Demo/prototype purposes

**DO NOT deploy this application publicly or share your API key!**

For production use, you should:
1. Create a backend service (Node.js/Express, Python/Flask, etc.)
2. Store the API key securely on the server
3. Have the frontend call your backend API instead of calling Gemini directly

### Setup Steps

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root with your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

4. Open your browser to the URL shown in the terminal (typically `http://localhost:5173`)
