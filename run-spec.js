const readline = require('readline');
const { exec } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter the spec file name (e.g., tests/api-examples.spec.ts): ', (specFile) => {
  if (specFile) {
    const command = `npm run test:spec -- ${specFile}`;
    console.log(`Running: ${command}`);
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(stdout);
    });
  } else {
    console.log('No spec file provided. Exiting.');
  }
  rl.close();
});