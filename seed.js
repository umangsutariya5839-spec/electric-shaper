const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  await prisma.serviceItem.create({ data: { title: 'Motor Rewinding', description: 'Complete stator and rotor rewinding for single and three-phase motors up to 500HP. We utilize premium Class-F copper wire and advanced VPI insulation processes for maximum longevity.', imagePath: '/hero.png' }});
  await prisma.serviceItem.create({ data: { title: 'Submersible Pumps', description: 'Complete overhaul of industrial and domestic submersible pumps. From bearing replacement and waterproofing to shaft alignment, ensuring peak operational efficiency.', imagePath: '/pump.png' }});
  await prisma.serviceItem.create({ data: { title: 'Industrial Switchgear', description: 'Custom panel board manufacturing, switchgear installation, and complete factory electrical setups. We design and maintain intelligent control systems for modern facilities.', imagePath: '/panel.png' }});
  console.log('Seeded services');
}
main().catch(console.error).finally(async () => { await prisma.$disconnect() });
