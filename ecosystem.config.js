// /var/www/elecconnect-server/ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'elecconnect-server',
      cwd: '/var/www/elecconnect-server',   // ← chemin du projet
      script: 'npm',
      args: 'run start',                    // équivaut à: NODE_ENV=production strapi start
      env: {
        NODE_ENV: 'production',             // Strapi lira aussi ton .env
      },
      watch: false,                         // pas de watch en prod
      max_memory_restart: '512M',           // redémarre si >512 Mo
      // Optionnel: fichiers de logs (sinon ~/.pm2/logs par défaut)
      // error_file: '/var/www/elecconnect-server/.logs/err.log',
      // out_file: '/var/www/elecconnect-server/.logs/out.log',
      // merge_logs: true,
    },
  ],
};
