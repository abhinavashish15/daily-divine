import app from './app';
import { env } from './config/env';
import { prisma } from './config/prisma';
import { initScheduler } from './scheduler/cron';

const startServer = async () => {
  try {
    // Connect to database
    await prisma.$connect();
    console.log('📦 Connected to PostgreSQL database via Prisma');

    // Initialize CRON scheduler
    initScheduler();

    // Start server
    const server = app.listen(env.PORT, () => {
      console.log(`🚀 Server is running on port ${env.PORT}`);
    });

    // Handle graceful shutdown
    const shutdown = async () => {
      console.log('Shutting down gracefully...');
      await prisma.$disconnect();
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
