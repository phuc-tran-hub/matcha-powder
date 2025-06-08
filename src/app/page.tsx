'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-matcha-dark text-white overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-50"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1589698272390-0501a07619bb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
          }}
        ></div>
        <div className="absolute inset-0 z-5 bg-gradient-to-b from-matcha-dark/80 via-matcha-dark/70 to-matcha-dark/80"></div>
        <div className="container-custom relative z-10 py-16 md:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="heading-1 mb-6">
              <span className="text-matcha-light">抹茶</span> Matcha: A Journey From Japan to America
            </h1>
            <p className="body-text mb-8 text-white">
              Explore the cultural transformation of matcha powder from its sacred Japanese origins 
              to its modern commodification in American markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/journey" className="btn-primary text-center">
                Begin the Journey
              </Link>
              <Link href="/about" className="bg-white hover:bg-white/90 text-matcha-dark font-medium py-2 px-4 rounded-md transition-colors text-center">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Journey Overview Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-black">The Global Trajectory of Matcha</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-800">
              From sacred ritual to trendy superfood, matcha&apos;s journey spans centuries and continents.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false }}
              className="bg-white p-6 rounded-lg shadow-md border border-matcha-light/20"
            >
              <div className="bg-matcha-dark text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">和</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-black">Japanese Tradition</h3>
              <p className="text-gray-800">
                Explore matcha&apos;s sacred roots in Zen Buddhism and the Japanese tea ceremony (Chanoyu), 
                embodying harmony, respect, purity, and tranquility.
              </p>
              <Link href="/tradition" className="inline-block mt-4 text-matcha-dark font-medium hover:underline">
                Discover traditions →
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: false }}
              className="bg-white p-6 rounded-lg shadow-md border border-matcha-light/20"
            >
              <div className="bg-matcha-dark text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">変</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-black">The Transformation</h3>
              <p className="text-gray-800">
                Track matcha&apos;s passage from Japanese monasteries to Western culture, revealing how global trade and 
                cultural exchange have reshaped its meaning and use.
              </p>
              <Link href="/journey" className="inline-block mt-4 text-matcha-dark font-medium hover:underline">
                Trace the journey →
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: false }}
              className="bg-white p-6 rounded-lg shadow-md border border-matcha-light/20"
            >
              <div className="bg-matcha-dark text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">商</span>
              </div>
              <h3 className="text-lg font-bold mb-3 text-black">American Commodification</h3>
              <p className="text-gray-800">
                Witness matcha&apos;s transformation into a trendy commodity and &apos;superfood,&apos; driven by American markets, from NYC cafes 
                to Starbucks, and its portrayal on social media.
              </p>
              <Link href="/commodification" className="inline-block mt-4 text-matcha-dark font-medium hover:underline">
                Explore impacts →
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: false }}
              className="bg-white p-6 rounded-lg shadow-md border border-matcha-light/20"
            >
              <div className="bg-matcha-dark text-white w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold">感</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-black">Sensory Experience</h3>
              <p className="text-gray-800">
                Explore the rich vocabulary and evaluation criteria used to describe matcha&apos;s complex sensory attributes across different cultural contexts.
              </p>
              <Link href="/sensory" className="inline-block mt-4 text-matcha-dark font-medium hover:underline">
                Taste the difference →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-black">Traditional vs. Americanized Matcha</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-800">
              Explore the stark contrasts between matcha&apos;s traditional Japanese preparation and its modern American adaptations.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="bg-white shadow-lg rounded-lg overflow-hidden relative"
          >
            <div className="absolute inset-0 z-0 opacity-15 bg-gradient-to-br from-matcha-light to-matcha-dark pointer-events-none"></div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 bg-matcha-dark text-white">
                <div className="mb-6 rounded-lg overflow-hidden shadow-lg" style={{ height: '240px' }}>
                  <Image 
                    src="https://images.pexels.com/photos/8474099/pexels-photo-8474099.jpeg" 
                    alt="Traditional Japanese Matcha Powder" 
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <h3 className="text-2xl font-bold mb-6 border-b border-matcha-light pb-2">Traditional Japanese Matcha</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-light">•</span>
                    <p>Deeply rooted in Zen Buddhism and the Way of Tea (Chanoyu)</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-light">•</span>
                    <p>Spiritual practice focusing on mindfulness and aesthetic appreciation</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-light">•</span>
                    <p>Meticulously prepared with ceremonial tools: chawan, chasen, chashaku</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-light">•</span>
                    <p>Served with hot water, embracing natural umami and subtle sweetness</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-light">•</span>
                    <p>Consumed in tea houses, during ceremonies, emphasizing cultural context</p>
                  </li>
                </ul>
              </div>
              <div className="p-8 bg-white text-gray-800">
                <div className="mb-6 rounded-lg overflow-hidden shadow-lg" style={{ height: '240px' }}>
                  <Image 
                    src="https://images.pexels.com/photos/8329672/pexels-photo-8329672.jpeg" 
                    alt="Americanized Matcha Latte" 
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <h3 className="text-2xl font-bold mb-6 border-b border-matcha-medium pb-2">Americanized Matcha</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-medium">•</span>
                    <p>Marketed primarily as a health trend and trendy beverage</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-medium">•</span>
                    <p>Valued for health benefits: antioxidants, energy boost, metabolism effects</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-medium">•</span>
                    <p>Often prepared quickly using blenders, frothers, and non-traditional tools</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-medium">•</span>
                    <p>Commonly mixed with milk, sweeteners, syrups, and other additions</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-medium">•</span>
                    <p>Consumed in cafes, chain stores like Starbucks, and as part of daily routines</p>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          <div className="text-center mt-8">
            <Link href="/commodification" className="btn-primary inline-block">
              Explore the Contrasts
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-matcha-deep text-white">
        <div className="container-custom text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
          >
            <h2 className="heading-2 mb-6">Begin Your Matcha Journey</h2>
            <p className="body-text max-w-2xl mx-auto mb-8">
              Discover the fascinating cultural and economic story behind one of the world&apos;s most 
              intriguing beverages, from ancient Japanese temples to modern American cafes.
            </p>
            <Link href="/journey" className="bg-white text-matcha-deep hover:bg-cream font-medium py-3 px-6 rounded-md transition-colors inline-block">
              Start Exploring
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
