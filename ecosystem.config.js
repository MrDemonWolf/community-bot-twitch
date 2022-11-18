module.exports = {
  apps: [
    {
      name: "Community Bot [Server]",
      script: "./server/index.js",
      exec_mode: "cluster",
      autorestart: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "Community Bot [Worker]",
      script: "./worker/index.js",
      exec_mode: "cluster",
      autorestart: true,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
