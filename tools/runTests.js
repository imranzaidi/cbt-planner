/**
 * Module Dependencies
 */
const { spawn } = require('child_process');


// const process = spawn('ls', ['-lh', '/usr']);
const process = spawn('./node_modules/.bin/mocha', ['--recursive']);

process.stdout.on('data', (data) => {
  // console.log(`stdout: \n${data}`);
  console.log(`${data}`);
});

process.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

process.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
