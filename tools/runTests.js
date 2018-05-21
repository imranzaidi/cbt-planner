/**
 * Module Dependencies
 */
const { spawn } = require('child_process');


// const process = spawn('ls', ['-lh', '/usr']);
const process = spawn('./node_modules/.bin/mocha', ['--recursive']);

process.stdout.on('data', (data) => {
  console.log(`stdout: \n${data}`); // eslint-disable-line no-console
});

process.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`); // eslint-disable-line no-console
});

process.on('close', (code) => {
  console.log(`child process exited with code ${code}`); // eslint-disable-line no-console
});
