const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding initial CMS data...')

  // 1. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      id: 'global',
      websiteName: 'INTEC.',
      logoPath: null,
      faviconPath: null,
      headerContent: 'EST. 2005 • PREMIER ELECTRICAL SERVICES',
      footerContent: '© 2026 Intec Electric & Rewinding Works. All rights reserved.',
      socialFacebook: '#',
      socialTwitter: '#',
      socialInstagram: '#',
      socialLinkedin: '#'
    }
  })

  // 2. Contact Info
  await prisma.contactInfo.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      id: 'global',
      phone: '+91 98765 43210',
      whatsapp: '1234567890',
      email: 'info@intec.com',
      address: '123 Industrial Estate, Phase II, Mumbai, Maharashtra 400001',
      googleMapLink: null,
      businessHours: 'Monday - Saturday: 8:00 AM - 6:00 PM\nSunday: Closed'
    }
  })

  // 3. Home Content
  await prisma.homeContent.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      id: 'global',
      heroBannerText: 'EST. 2005 • PREMIER ELECTRICAL SERVICES',
      heroHeading: 'Crafting Dynamic Innovations.',
      heroDescription: 'In the electric motor industry, we balance detailed technical expertise with precision engineering. From complex stator rewinding to industrial switchgear contracting.',
      heroButtonText: 'Schedule Repair',
      heroButtonLink: '/book',
      heroBackgroundImage: '/hero.png',
      whyChooseUsPoints: JSON.stringify([
        "ISO 9001:2015 Certified Facility",
        "24/7 Emergency Breakdown Service",
        "1-Year Comprehensive Warranty on Rewinds",
        "Computerized Testing & Reporting"
      ]),
      statsExperience: '20+',
      statsRepaired: '5k+'
    }
  })

  // 4. About Content
  await prisma.aboutContent.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      id: 'global',
      aboutHeading: 'Precision in every phase.',
      aboutDescription: "Since 2005, Intec has set the standard for electrical and mechanical repair. We don't just fix equipment; we engineer reliability into every component that leaves our facility.",
      companyImage: '/panel.png',
      mission: 'To deliver uncompromising quality in electromechanical repairs, ensuring our industrial partners minimize downtime and maximize operational efficiency.',
      vision: 'To be the premier electric motor and pump service center in the region, recognized for technical excellence and rapid response capabilities.',
      experienceYears: '20+'
    }
  })

  console.log('Global settings seeded successfully.')

  // Check if we need to seed lists (if db is empty)
  const serviceCount = await prisma.serviceItem.count()
  if (serviceCount === 0) {
    console.log('Seeding demo Services...')
    await prisma.serviceItem.createMany({
      data: [
        {
          title: "Motor Rewinding",
          shortDescription: "Complete stator and rotor rewinding services using premium Class H insulation.",
          fullDescription: "Our motor rewinding process follows strict ISO standards. We use premium Class H (180°C) insulation, advanced vacuum pressure impregnation (VPI), and computerized core loss testing to ensure your rebuilt motor performs better and lasts longer than factory standard.",
          imagePath: "/slider_motor.png"
        },
        {
          title: "Pump Overhauls",
          shortDescription: "Comprehensive repair of industrial submersible, centrifugal, and vacuum pumps.",
          fullDescription: "We completely dismantle, inspect, and repair all types of industrial pumps. Services include impeller balancing, mechanical seal replacement, shaft remachining, and complete casing pressure testing to guarantee leak-free operation.",
          imagePath: "/slider_pump.png"
        },
        {
          title: "Switchgear Maintenance",
          shortDescription: "Preventative maintenance and repair of electrical control panels and switchgears.",
          fullDescription: "Keep your facility safe with our comprehensive switchgear maintenance. We perform thermographic imaging to detect hot spots, clean contacts, test circuit breakers, and upgrade legacy analog panels to modern digital smart control systems.",
          imagePath: "/panel.png"
        }
      ]
    })
  }

  const testimonialCount = await prisma.testimonial.count()
  if (testimonialCount === 0) {
    console.log('Seeding demo Testimonials...')
    await prisma.testimonial.createMany({
      data: [
        {
          customerName: "John D. - Manufacturing Logistics Corp",
          review: "INTEC has been our go-to for motor rewinding for over a decade. Their turnaround time on our 500HP critical pump motor saved us from a massive production halt.",
          rating: 5
        },
        {
          customerName: "Sarah T. - City Water Authority",
          review: "The team at INTEC understands the urgency of municipal water pumping stations. They had it pulled, diagnosed, repaired, and reinstalled within 48 hours.",
          rating: 5
        }
      ]
    })
  }

  const faqCount = await prisma.fAQItem.count()
  if (faqCount === 0) {
    console.log('Seeding demo FAQs...')
    await prisma.fAQItem.createMany({
      data: [
        {
          question: "What is your standard turnaround time for a motor rewind?",
          answer: "For standard AC motors up to 50HP, our typical turnaround time is 48-72 hours. We also offer 24-hour emergency rush services for critical breakdowns."
        },
        {
          question: "What class of insulation do you use?",
          answer: "We exclusively use Class H (180°C) and Class N (200°C) insulation materials for all our rewinds."
        }
      ]
    })
  }

  const galleryCount = await prisma.galleryItem.count()
  if (galleryCount === 0) {
    console.log('Seeding demo Gallery...')
    await prisma.galleryItem.createMany({
      data: [
        { title: "Workshop Overview", category: "Facility", imagePath: "/hero.png" },
        { title: "Premium Motors", category: "Repairs", imagePath: "/slider_motor.png" },
        { title: "Control Panel", category: "Electrical", imagePath: "/panel.png" },
        { title: "Submersible Pump", category: "Repairs", imagePath: "/slider_pump.png" }
      ]
    })
  }

  const sliderCount = await prisma.productSliderItem.count()
  if (sliderCount === 0) {
    console.log('Seeding demo Product Slider...')
    await prisma.productSliderItem.createMany({
      data: [
        {
          title: "INTEC® Premium Motors",
          subtitle: "Designed for the most demanding applications.",
          imagePath: "/slider_motor.png",
          features: JSON.stringify([
            "Highest efficiency motors performing even in the toughest applications",
            "Created with the highest quality materials",
            "Possibility of introducing modifications at the customer's request"
          ]),
          specs: JSON.stringify({
            box1Title: "Insulation Class", box1Value: "F-H",
            box2Title: "Protection Degree", box2Value: "IP55 - IP67",
            box3Title: "Power Range", box3Value: "0.09 - 315 KW"
          })
        },
        {
          title: "INTEC® Submersible Pumps",
          subtitle: "Unmatched durability for deep well and industrial pumping.",
          imagePath: "/slider_pump.png",
          features: JSON.stringify([
            "Heavy-duty cast iron construction for maximum wear resistance",
            "Advanced waterproofing technology for zero-leak operation",
            "Energy-optimized impellers for high-volume liquid transfer"
          ]),
          specs: JSON.stringify({
            box1Title: "Max Depth", box1Value: "150m",
            box2Title: "Flow Rate", box2Value: "Up to 500m³/h",
            box3Title: "Liquid Temp Range", box3Value: "0°C - 40°C"
          })
        },
        {
          title: "INTEC® Power Generators",
          subtitle: "Reliable backup power for critical infrastructure.",
          imagePath: "/slider_generator.png",
          features: JSON.stringify([
            "Silent operation canopy with advanced acoustic engineering",
            "Smart digital control panels with remote monitoring integration",
            "Rapid start-up capability for seamless power transition"
          ]),
          specs: JSON.stringify({
            box1Title: "Engine Type", box1Value: "Diesel",
            box2Title: "Emissions", box2Value: "Stage V",
            box3Title: "Output Capacity", box3Value: "50 - 1000 kVA"
          })
        }
      ]
    })
  }

  console.log('Database seeding complete!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
