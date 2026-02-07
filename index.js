/**
 * MiniMax M2.1 Model Test Application
 * 
 * This simple app tests the MiniMax M2.1 model integration
 * by making a simple API call.
 */

const https = require('https');

// Configuration
const API_KEY = process.env.MINIMAX_API_KEY || 'your-api-key-here';
const API_BASE = process.env.MINIMAX_API_BASE || 'api.minimax.chat';
const MODEL = 'MiniMax-M2.1';

// Test prompt
const testPrompt = 'Hello, please introduce yourself briefly.';

async function testMiniMaxAPI() {
  console.log(`Testing MiniMax ${MODEL} Model...\n`);
  
  const postData = JSON.stringify({
    model: MODEL,
    messages: [
      {
        role: 'user',
        content: testPrompt
      }
    ],
    temperature: 0.7,
    max_tokens: 100
  });

  const options = {
    hostname: API_BASE,
    port: 443,
    path: '/v1/chat/completions',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  console.log('Making API request to MiniMax...');
  
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`Response Status: ${res.statusCode}\n`);
        
        if (res.statusCode === 200) {
          try {
            const parsed = JSON.parse(data);
            const response = parsed.choices[0].message.content;
            console.log('✅ API Call Successful!');
            console.log('\nResponse:');
            console.log(response);
            console.log('\n---');
            console.log(`Model: ${MODEL}`);
            console.log(`Tokens used: ${parsed.usage?.total_tokens || 'N/A'}`);
            resolve({ success: true, response, usage: parsed.usage });
          } catch (error) {
            console.error('❌ Error parsing response:', error.message);
            reject(error);
          }
        } else {
          console.error('❌ API Call Failed!');
          console.error('Response:', data);
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request error:', error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Run the test
testMiniMaxAPI()
  .then((result) => {
    console.log('\n✅ Test completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test failed:', error.message);
    console.log('\nNote: Make sure to set MINIMAX_API_KEY environment variable');
    process.exit(1);
  });
