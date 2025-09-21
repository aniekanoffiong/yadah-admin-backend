module.exports = {
  apps: [
    {
      name: 'yadah-admin',
      script: './dist/index.js',
      instances: 1,
      max_memory_restart: '2G', // Increased from 1G
      exp_backoff_restart_delay: 100,
      max_restarts: 10,
      min_uptime: 2000,
      // Monitor memory usage
      pmx: true,
      // Log memory usage
      log_type: 'json',
      merge_logs: true,
      node_args: '--max-old-space-size=2048', // Set Node.js heap size
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};