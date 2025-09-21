import isPortReachable from 'is-port-reachable';
import path from 'path';
import dockerCompose from 'docker-compose';

export default async () => {
  console.time('global-setup');

  const isDBReachable = await isPortReachable(27019, { host: 'localhost' });
  if (!isDBReachable) {
    await dockerCompose.upAll({
      cwd: path.join(__dirname),
      log: true,
    });
  }

  console.timeEnd('global-setup');
};
