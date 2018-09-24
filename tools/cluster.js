const cluster = require('cluster');
const os = require('os');


if (cluster.isMaster) {
  // determines number of CPUs available and create a worker using fork
  const numCPUs = os.cpus().length;

  console.log(`Forking for ${numCPUs} CPUs`); // eslint-disable-line no-console
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  // start a new instance if the worker crashes
  const workers = Object.values(cluster.workers);
  const restartWorker = (workerIndex) => {
    const worker = workers[workerIndex];
    if (!worker) return;

    worker.on('exit', () => {
      if (!worker.exitedAfterDisconnect) return;
      console.log(`Exited process ${worker.process.pid}`);

      cluster.fork().on('listening', () => {
        restartWorker(workerIndex + 1);
      });
    });

    worker.disconnect();
  };

  restartWorker(0);
} else {
  // starts the server if the cluster script is not the master process (isWorker === true)
  require('../server'); // eslint-disable-line global-require
}
