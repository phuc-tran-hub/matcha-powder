'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

type ReferenceCategoryProps = {
  title: string;
  references: string[];
};

const ReferenceCategory = ({ title, references }: ReferenceCategoryProps) => (
  <div>
    <h3 className="text-lg font-bold mb-3 text-matcha-dark">{title}</h3>
    <ul className="list-disc pl-5 space-y-2">
      {references.map((reference, index) => (
        <li key={index} className="text-sm text-gray-700">
          {reference}
        </li>
      ))}
    </ul>
  </div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-matcha-dark text-white py-16">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="heading-1 mb-6">About This Project</h1>
            <p className="body-text mb-8">
              Visualizing the cultural journey of matcha powder from its origins in Japan 
              to its commodification in American markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Overview Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-2 mb-4">Project Overview</h2>
              <div className="w-16 h-1 bg-matcha-dark mb-6"></div>
              <p className="body-text mb-4">
                This website offers a visual exploration of matcha&apos;s remarkable journey from its sacred 
                origins in Japanese tea ceremonies to its current status as a globally recognized health 
                trend and commodified product in American markets.
              </p>
              <p className="body-text mb-4">
                Through interactive visualizations and informative content, we examine the cultural, 
                economic, and social dimensions of matcha&apos;s transformation across borders and time.
              </p>
              <p className="body-text">
                The project aims to increase awareness about the complex dynamics of cultural exchange, 
                appropriation, and commodification in our globalized world, using matcha as a compelling 
                case study of these broader anthropological phenomena.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-matcha-powder/30 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Purpose</h3>
                <p>
                  To visualize and analyze the cultural transformation of matcha as it moves from 
                  its traditional context in Japan to its reinterpretation in American markets.
                </p>
              </div>
              <div className="bg-matcha-powder/30 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Approach</h3>
                <p>
                  Through a cultural anthropological lens, we examine matcha as both a cultural symbol 
                  and a global commodity, revealing how its meaning changes as it crosses borders.
                </p>
              </div>
              <div className="bg-matcha-powder/30 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-3">Audience</h3>
                <p>
                  This resource is designed for students, researchers, and anyone interested in 
                  food culture, globalization, cultural appropriation, and Japanese traditions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* References Section */}
      <section id="references" className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="heading-2 mb-4">References</h2>
            <p className="body-text max-w-3xl text-gray-800">
              This project draws from academic sources, market reports, and cultural studies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="p-6 space-y-6">
              <ReferenceCategory 
                title="Academic Sources" 
                references={[
                  "Dreher, Nick. \"Complicating Cultural Food Colonialism to Understand Matcha as a 'Food from Nowhere.'\" Graduate Journal of Food Studies, 2018.",
                  "Ohnuki-Tierney, Emiko. Rice as Self: Japanese Identities Through Time. Princeton University Press, 1993.",
                  "Scrinis, Gyorgy. Nutritionism: The Science and Politics of Eating. Columbia University Press, 2013."
                ]} 
              />
              
              <ReferenceCategory 
                title="Books & Cultural Studies" 
                references={[
                  "Okakura, Kakuzo. The Book of Tea. Dover Publications, 1964.",
                  "Sen, Soshitsu. Tea Life, Tea Mind. Weatherhill, 1979.",
                  "Varley, H. Paul. Japanese Culture. University of Hawaii Press, 2000."
                ]} 
              />
              
              <ReferenceCategory 
                title="Market & Industry Research" 
                references={[
                  "Grand View Research. \"Matcha Market Size, Share & Trends Analysis Report.\" 2024.",
                  "Mordor Intelligence. \"Matcha Tea Market - Growth, Trends, Impact, and Forecasts.\" 2023.",
                  "The Japan Times. \"Matcha's Global Boom Strains Domestic Supply.\" 2023."
                ]} 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Explore More Section */}
      <section className="section bg-matcha-powder/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4">Explore More</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-800">
              Dive deeper into the fascinating world of matcha through our curated sections.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/tradition" className="block">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="bg-matcha-dark text-white p-8 rounded-lg shadow-md hover:shadow-lg h-full"
              >
                <h3 className="text-xl font-bold mb-3">Japanese Tradition</h3>
                <p>Explore the sacred roots and cultural significance of matcha in Japan.</p>
              </motion.div>
            </Link>
            
            <Link href="/journey" className="block">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="bg-matcha-medium text-white p-8 rounded-lg shadow-md hover:shadow-lg h-full"
              >
                <h3 className="text-xl font-bold mb-3">The Global Journey</h3>
                <p>Visualize how matcha traveled from Japan to become a global phenomenon.</p>
              </motion.div>
            </Link>
            
            <Link href="/commodification" className="block">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="bg-matcha-deep text-white p-8 rounded-lg shadow-md hover:shadow-lg h-full"
              >
                <h3 className="text-xl font-bold mb-3">American Commodification</h3>
                <p>Analyze matcha&apos;s transformation into a trendy superfood in American culture.</p>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
