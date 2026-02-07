#!/usr/bin/env node

/**
 * Validation script for MiniMax Test App
 * This checks the app structure without making API calls
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Validating MiniMax Test App Structure...\n');

const requiredFiles = [
  'index.js',
  'package.json',
  'README.md',
  '.gitignore'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  const exists = fs.existsSync(filePath);
  console.log(`${exists ? '✓' : '✗'} ${file}`);
  if (!exists) allFilesExist = false;
});

console.log('\n📋 Checking package.json configuration...');
try {
  const packageJson = require('./package.json');
  console.log(`✓ Name: ${packageJson.name}`);
  console.log(`✓ Version: ${packageJson.version}`);
  console.log(`✓ Scripts: ${Object.keys(packageJson.scripts).join(', ')}`);
  console.log(`✓ Main: ${packageJson.main}`);
  
  if (packageJson.scripts.start === 'node index.js') {
    console.log('✓ Start script configured correctly');
  }
} catch (error) {
  console.error('✗ Error reading package.json:', error.message);
  allFilesExist = false;
}

console.log('\n📝 Checking index.js...');
try {
  const indexJs = fs.readFileSync(path.join(__dirname, 'index.js'), 'utf8');
  
  const checks = [
    { pattern: /https\.request/, name: 'HTTPS request' },
    { pattern: /MiniMax-M2\.1/, name: 'M2.1 model reference' },
    { pattern: /MINIMAX_API_KEY/, name: 'API key environment variable' },
    { pattern: /async function testMiniMaxAPI/, name: 'Async test function' },
    { pattern: /process\.exit/, name: 'Exit handling' }
  ];
  
  checks.forEach(check => {
    if (check.pattern.test(indexJs)) {
      console.log(`✓ ${check.name} implementation found`);
    } else {
      console.log(`✗ ${check.name} missing`);
      allFilesExist = false;
    }
  });
} catch (error) {
  console.error('✗ Error reading index.js:', error.message);
  allFilesExist = false;
}

console.log('\n' + '='.repeat(50));
if (allFilesExist) {
  console.log('✅ All validations passed!');
  console.log('\n🚀 To run the app:');
  console.log('   cd minimax-test-app');
  console.log('   export MINIMAX_API_KEY=your-api-key');
  console.log('   npm start');
  process.exit(0);
} else {
  console.log('❌ Some validations failed');
  process.exit(1);
}
