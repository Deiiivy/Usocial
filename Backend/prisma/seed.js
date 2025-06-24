import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Insertando datos de prueba...');

  const users = [
    { name: 'Alice', email: 'alice@example.com', password: 'alice123' },
    { name: 'Bob', email: 'bob@example.com', password: 'bob123' },
    { name: 'Deivy', email: 'deivy@gmail.com', password: 'deivy123'}
  ];

  await prisma.users.createMany({
    data: users,
    skipDuplicates: true,
  });

  console.log('✅ Usuarios insertados correctamente');
}

main()
  .catch((e) => {
    console.error('❌ Error al insertar datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
