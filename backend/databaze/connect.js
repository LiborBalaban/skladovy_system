const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

// Inicializace Prisma klienta
const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    // Testovací dotaz na připojení
    await prisma.$queryRaw`SELECT 1`;
    console.log("Databáze je připojená!");
  } catch (error) {
    console.error("Databáze negunguje:", error);
    process.exit(1); // Ukončí aplikaci při chybě
  }
};

module.exports = { connectDB, prisma };