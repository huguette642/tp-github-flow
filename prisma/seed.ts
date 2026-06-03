import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.task.createMany({
    data: [
      {
        title: 'Mettre à jour le README',
        content: 'Ajouter les instructions de lancement et les exemples curl',
        done: false,
      },
      {
        title: 'Corriger le bug #42',
        content: 'Le endpoint GET /tasks renvoie une erreur 500 quand la liste est vide',
        done: true,
      },
      {
        title: 'Ajouter les tests unitaires',
        content: 'Couvrir les cas limites du service TasksService',
        done: false,
      },
      {
        title: 'Revoir la PR de Sarah',
        content: null,
        done: false,
      },
      {
        title: 'Préparer la démo sprint',
        content: 'Préparer les données de démonstration et le scénario de présentation',
        done: true,
      },
    ],
    skipDuplicates: true,
  })

  console.log('Base de données initialisée avec les données placeholder ✓')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
