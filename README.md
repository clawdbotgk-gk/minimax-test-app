# MiniMax M2.1 Model Test App

A simple Node.js application to test the MiniMax M2.1 model integration.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MiniMax API key

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set your MiniMax API key:
   ```bash
   export MINIMAX_API_KEY='your-api-key-here'
   # Or on Windows:
   set MINIMAX_API_KEY=your-api-key-here
   ```

3. Run the test:
   ```bash
   npm start
   ```

## Environment Variables

- `MINIMAX_API_KEY` - Your MiniMax API key
- `MINIMAX_API_BASE` - API endpoint base URL (default: api.minimax.chat)

## Project Structure

```
minimax-test-app/
├── index.js          # Main application script
├── package.json      # Project configuration
├── README.md         # This file
└── .gitignore        # Git ignore rules
```

## Expected Output

The app will make a test request to the MiniMax M2.1 model and display:
- The model's response
- Token usage statistics
- Success/failure status

## License

MIT
