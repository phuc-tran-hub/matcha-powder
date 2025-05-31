'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TraditionPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-matcha-deep text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('/matcha-texture.jpg')] bg-cover bg-center"></div>
        <div className="container-custom relative z-10 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="heading-1 mb-6">Japanese Matcha Tradition</h1>
            <p className="body-text mb-8 text-matcha-light">
              Explore the sacred cultural roots of matcha in Japan, from its Zen Buddhist origins to its 
              profound cultural significance in Japanese identity and society.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Historical Origins Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-2 mb-4 text-black text-gray-900">Historical Origins</h2>
              <div className="w-16 h-1 bg-matcha-dark mb-6"></div>
              <p className="body-text mb-4 text-black">
                Matcha&apos;s rich history in Japan began in the 12th century, when Zen master Eisai introduced 
                tea seeds from China. Initially embraced by Buddhist monks for its stimulant properties that 
                aided meditation, powdered tea quickly became integral to their spiritual practices.
              </p>
              <p className="body-text mb-4 text-gray-800">
                Eisai&apos;s seminal work, <em>Kissa Yojo-ki</em> (Drink Tea and Prolong Life), stands as Japan&apos;s 
                earliest literary account detailing tea cultivation methods and its benefits.
              </p>
              <p className="body-text text-black">
                By the 16th century, tea master Sen no Rikyu formalized Chanoyu, or the Way of Tea, transforming 
                it into a highly stylized and artistically nuanced practice that became a cornerstone of Japanese culture.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-black/30 z-10 flex items-center justify-center">
                <p className="text-white text-xl font-semibold text-center px-6">
                  &quot;Tea is the ultimate mental and medical remedy and has the ability to make one&apos;s life more full and complete.&quot;
                  <br /><br />
                  <span className="text-sm font-normal">— Eisai, Kissa Yojo-ki (1211)</span>
                </p>
              </div>
              <div className="w-full h-full relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chanoyu - The Way of Tea Section */}
      <section className="section bg-matcha-powder/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-black">Chanoyu: The Way of Tea</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-500">
              Matcha is central to the Japanese tea ceremony, a profound cultural practice embodying 
              core principles of harmony, respect, purity, and tranquility.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <PrincipleCard 
              kanji="和"
              principle="Harmony (Wa)"
              description="Creating harmony between people, nature, and objects during the ceremony."
              delay={0.1}
            />
            <PrincipleCard 
              kanji="敬"
              principle="Respect (Kei)"
              description="Showing sincere respect for others and the tools used in the ceremony."
              delay={0.3}
            />
            <PrincipleCard 
              kanji="清"
              principle="Purity (Sei)"
              description="Physical and spiritual cleanliness in preparation and mindset."
              delay={0.5}
            />
            <PrincipleCard 
              kanji="寂"
              principle="Tranquility (Jaku)"
              description="The inner peace achieved through the practice of the previous three principles."
              delay={0.7}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold mb-4 text-black text-gray-900">The Ceremonial Process</h3>
            <p className="body-text mb-6 text-gray-800">
              The Japanese tea ceremony is a carefully choreographed ritual where each movement has meaning 
              and purpose. It often takes place in a traditional tea room with tatami mats, and can last up 
              to four hours for a formal gathering.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-matcha-powder/30 p-4 rounded">
                <div className="font-bold mb-2 text-black">Preparation</div>
                <p className="text-sm text-black">The host cleans the tea room and tools, preparing the space mentally and physically.</p>
              </div>
              <div className="bg-matcha-powder/30 p-4 rounded">
                <div className="font-bold mb-2 text-black">Guest Arrival</div>
                <p className="text-sm text-black">Guests purify themselves at a stone basin before entering the tea room through a small doorway.</p>
              </div>
              <div className="bg-matcha-powder/30 p-4 rounded">
                <div className="font-bold mb-2 text-black">Tea Preparation</div>
                <p className="text-sm text-black">The host uses specific tools to prepare matcha with hot water in front of guests.</p>
              </div>
              <div className="bg-matcha-powder/30 p-4 rounded">
                <div className="font-bold mb-2 text-black">Appreciation</div>
                <p className="text-sm text-black">Guests appreciate the bowl before drinking, turning it to avoid drinking from the front.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cultivation and Production Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-black">Traditional Cultivation & Production</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-500">
              The labor-intensive process of creating authentic Japanese matcha embodies centuries of tradition and expertise.
            </p>
          </motion.div>

          <div className="space-y-12">
            <ProductionStep
              number="01"
              title="Shading"
              description="Tea plants destined for matcha are shaded for 20-30 days before harvest, typically using bamboo mats or tarps. This shading process increases chlorophyll and L-theanine, creating matcha's vibrant color and unique flavor."
              align="right"
            />

            <ProductionStep
              number="02"
              title="Harvesting"
              description="Only the finest, youngest tea buds are carefully hand-picked. This meticulous selection process ensures the highest quality leaves for premium matcha."
              align="left"
            />

            <ProductionStep
              number="03"
              title="Steaming & Drying"
              description="The leaves are briefly steamed to prevent fermentation, then thoroughly dried. This preserves the vibrant green color and fresh flavor characteristic of high-quality matcha."
              align="right"
            />

            <ProductionStep
              number="04"
              title="Grinding"
              description="Dried leaves become tencha, which is then stone-ground into a fine powder. Traditional stone mills rotate at a precisely slow pace to prevent heat from affecting flavor, producing only 40g per hour."
              align="left"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 bg-matcha-dark text-white p-8 rounded-lg"
          >
            <h3 className="text-xl font-bold mb-4 text-black">Regional Distinction</h3>
            <p className="mb-6">
              Renowned regions like Uji (Kyoto), Shizuoka, and Nishio (Aichi) are celebrated for their specific 
              terroir and centuries of expertise in matcha production, with Uji holding a historical reputation for top-tier quality.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-matcha-light p-4 rounded">
                <h4 className="font-bold mb-2">Uji, Kyoto</h4>
                <p className="text-sm text-matcha-light">Known for Japan&apos;s highest-quality ceremonial matcha, with ideal climate conditions and 800+ years of tea cultivation history.</p>
              </div>
              <div className="border border-matcha-light p-4 rounded">
                <h4 className="font-bold mb-2">Shizuoka</h4>
                <p className="text-sm text-matcha-light">Japan&apos;s largest tea-producing region, known for consistent quality and significant volume production.</p>
              </div>
              <div className="border border-matcha-light p-4 rounded">
                <h4 className="font-bold mb-2">Nishio, Aichi</h4>
                <p className="text-sm text-matcha-light">Renowned for fertile soil rich in nutrients, producing matcha with a distinctive rich flavor profile.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cultural Significance Section */}
      <section className="section bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-black">Cultural Significance</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-500">
              More than just a beverage, matcha is considered a &quot;cultural treasure&quot; in Japan, deeply intertwined with the nation&apos;s identity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold mb-3">A Symbol of Japanese Aesthetics</h3>
                <p>
                  The tea ceremony embodies core Japanese aesthetic principles of wabi (rustic simplicity), 
                  sabi (appreciation of imperfection), and yugen (mysterious grace). Through matcha, these 
                  values are expressed and preserved.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Beyond Ceremony</h3>
                <p>
                  Matcha has integrated into various traditional events, including weddings and seasonal 
                  celebrations. It has also influenced Japanese culinary arts, appearing in traditional 
                  sweets like wagashi, as well as modern desserts.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Resistance to Industrialization</h3>
                <p>
                  The labor-intensive nature of traditional matcha production inherently embodies a 
                  resistance to full industrialization. The continued emphasis on hand-picking and precise 
                  shading for ceremonial grade matcha underscores a valuing of quality over quantity.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-4 text-black">Matcha Tools & Their Significance</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-matcha-dark text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 mr-4">
                    <span className="text-xl">茶</span>
                  </div>
                  <div>
                <h4 className="font-bold text-gray-900">Chawan (Tea Bowl)</h4>
                <p className="text-sm text-gray-700">
                      The vessel for preparing and drinking matcha. Often handcrafted, with seasonal designs 
                      that reflect the time of year. The front of the bowl typically features a decorative element 
                      and is turned away from the drinker as a sign of respect.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-matcha-dark text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 mr-4">
                    <span className="text-xl">筅</span>
                  </div>
                  <div>
                <h4 className="font-bold text-gray-900">Chasen (Bamboo Whisk)</h4>
                <p className="text-sm text-gray-700">
                      A meticulously crafted whisk made from a single piece of bamboo, with numerous fine tines 
                      that create the perfect froth. Different whisks exist for different types of matcha preparations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-matcha-dark text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 mr-4">
                    <span className="text-xl">杓</span>
                  </div>
                  <div>
                <h4 className="font-bold text-gray-900">Chashaku (Bamboo Scoop)</h4>
                <p className="text-sm text-gray-700">
                      A slender bamboo scoop used to measure the perfect amount of matcha powder. Often made 
                      from a single piece of bamboo and sometimes inscribed with poetic names by tea masters.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-matcha-dark text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 mr-4">
                    <span className="text-xl">釜</span>
                  </div>
                  <div>
                <h4 className="font-bold text-gray-900">Kama (Iron Kettle)</h4>
                <p className="text-sm text-gray-700">
                      The kettle used to heat water. Its placement and the sound of boiling water are 
                      important elements of the ceremony, creating a meditative atmosphere.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wabi-Sabi Aesthetics Section */}
      <section className="section bg-neutral-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-black">The Aesthetic of Wabi-Sabi</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-500">
              Wabi-sabi represents a cornerstone of Japanese cultural identity and is fundamental to understanding the tea ceremony.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold mb-4 text-black text-gray-900">Embracing Imperfection</h3>
              <div className="w-16 h-1 bg-matcha-dark mb-6"></div>
              <p className="body-text mb-4 text-black">
                Wabi embodies inner, spiritual experiences, characterized by humility, restraint, simplicity, naturalism, 
                profundity, imperfection, and asymmetry. It emphasizes unadorned objects and spaces, celebrating the beauty 
                that time and care impart to materials.
              </p>
              <p className="body-text mb-4 text-gray-800">
                Sabi refers to the beauty of age, the patina of time, and the appreciation of things that are old and weathered, 
                rather than new and ostentatious. Together, wabi-sabi signifies beauty found in simplicity, rustic elegance, 
                and the acceptance of transience and imperfection.
              </p>
              <p className="body-text text-black">
                Sen no Rikyū codified this aesthetic within chanoyu by favoring simple, rustic tea utensils, often handmade 
                and exhibiting imperfections like cracks or uneven glazes, over the ornate and technically perfect Chinese wares 
                that were previously prized.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-xl"
            >
              <div className="grid grid-cols-1 gap-6">
                <div className="border-l-4 border-matcha-dark pl-4 py-3">
                  <h4 className="font-bold text-lg mb-2 text-black">Kintsugi Philosophy</h4>
                  <p className="text-gray-700">
                    The practice of kintsugi—repairing broken pottery with lacquer mixed with powdered gold—highlights and beautifies 
                    the &ldquo;flaws,&rdquo; embodying the wabi-sabi acceptance of an object&apos;s history and impermanence.
                  </p>
                </div>
                <div className="border-l-4 border-matcha-dark pl-4 py-3">
                  <h4 className="font-bold text-lg mb-2 text-black">Beyond Superficial Interpretation</h4>
                  <p className="text-gray-700">
                    Wabi-sabi is not merely rustic simplicity—it represents a deeper emotional and historical context, rooted in 
                    diligent practice, a profound internal state, and an appreciation for the transient beauty of the natural world.
                  </p>
                </div>
                <div className="border-l-4 border-matcha-dark pl-4 py-3">
                  <h4 className="font-bold text-lg mb-2 text-black">Path to Enlightenment</h4>
                  <p className="text-gray-700">
                    Embracing imperfection was considered a path to spiritual awakening, a reminder to cherish one&apos;s unpolished 
                    nature as a step towards enlightenment (satori).
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sensory Vocabulary Section */}
      <section className="section bg-matcha-powder/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-black">The Sensory World of Matcha</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-500">
              Japanese tea culture possesses a rich and nuanced vocabulary for describing the sensory characteristics of matcha, reflecting centuries of refined appreciation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md h-full"
            >
              <div className="bg-matcha-dark text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">旨味</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black text-center">Umami</h3>
              <p className="text-gray-700 text-center">
                A savory, full-bodied taste central to high-quality matcha. Arises from amino acids like L-theanine, 
                which are enhanced by the shading process used in matcha cultivation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md h-full"
            >
              <div className="bg-matcha-dark text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">渋味</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black text-center">Shibumi</h3>
              <p className="text-gray-700 text-center">
                A desirable astringency or subtle dryness that provides structure and a clean finish, distinct from 
                unpleasant bitterness. Essential for a balanced matcha experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md h-full"
            >
              <div className="bg-matcha-dark text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">コク味</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black text-center">Kokumi</h3>
              <p className="text-gray-700 text-center">
                Describes richness, body, and a velvety mouthfeel—a sensation that contributes to the luxurious texture 
                of high-quality matcha and provides a fuller sensory experience.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-lg mb-12"
          >
            <h3 className="text-xl font-bold mb-6 text-black border-b border-matcha-medium pb-2">Evaluating Matcha Quality</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-4 text-gray-900">Sensory Criteria</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-dark font-bold">•</span>
                    <p className="text-black"><span className="font-medium">Color:</span> Vibrant, lively green indicates freshness and proper shading</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-dark font-bold">•</span>
                    <p className="text-black"><span className="font-medium">Texture:</span> Extremely fine powder, like talcum powder, with no graininess</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-dark font-bold">•</span>
                    <p className="text-black"><span className="font-medium">Aroma:</span> Fresh, inviting fragrance that suggests vitality</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-dark font-bold">•</span>
                    <p className="text-black"><span className="font-medium">Taste:</span> Complex balance of umami, sweetness, and pleasant shibumi</p>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-gray-900">Production Factors</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-dark font-bold">•</span>
                    <p className="text-black"><span className="font-medium">Origin:</span> Specific regions like Uji, Nishio, and Yame are renowned</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-dark font-bold">•</span>
                    <p className="text-black"><span className="font-medium">Cultivar:</span> Certain tea plant varieties are preferred for matcha</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-dark font-bold">•</span>
                    <p className="text-black"><span className="font-medium">Harvest Time:</span> First harvest (shincha) leaves are highest quality</p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-dark font-bold">•</span>
                    <p className="text-black"><span className="font-medium">Processing:</span> Proper steaming, drying, and stone-grinding techniques</p>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gender Roles Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-black">Gender Dynamics in Tea Culture</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-500">
              The relationship between gender and tea practice in Japan has evolved significantly throughout history, reflecting broader societal changes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="bg-neutral-100 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-black text-gray-900 border-b border-matcha-medium pb-2">Historical Evolution</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-medium font-bold">•</span>
                    <p className="text-black">
                      <span className="font-medium">Early Modern Period:</span> Predominantly a male domain within samurai culture, with women often restricted to supporting roles
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-medium font-bold">•</span>
                    <p className="text-black">
                      <span className="font-medium">Meiji Restoration (1868):</span> Major tea schools opened study to women, often incorporating it into girls&apos; school curriculum
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-medium font-bold">•</span>
                    <p className="text-black">
                      <span className="font-medium">Contemporary Japan:</span> Tea practice at the local level is largely dominated by women, both as teachers and students
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-matcha-medium font-bold">•</span>
                    <p className="text-black">
                      <span className="font-medium">Institutional Power:</span> Despite grassroots prevalence, higher echelons of major tea schools often remain controlled by men
                    </p>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <h3 className="text-xl font-bold mb-4 text-black text-gray-900">Cultural Identity Formation</h3>
              <div className="w-16 h-1 bg-matcha-dark mb-6"></div>
              <p className="body-text mb-4 text-black">
                For young women, tea practice has become associated with &ldquo;bridal training,&rdquo; aimed at cultivating culturally valued femininity, 
                including gentility, politeness, and artistic skills. It serves as a way to embody traditional Japanese ideals of womanhood.
              </p>
              <p className="body-text mb-4 text-gray-800">
                For middle-aged and older women, tea practice often serves as a respected hobby and social activity, providing community 
                connection and cultural engagement outside domestic responsibilities.
              </p>
              <p className="body-text text-black">
                Research by scholars like Rebecca Corbett highlights how women utilized chanoyu to gain social and cultural capital, 
                sometimes blurring class distinctions. Their contributions have been vital to preserving and evolving the tradition, 
                even as they navigated gendered expectations and limited institutional recognition.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Production Process Visualization */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-black">The Meticulous Journey of Matcha Production</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-500">
              The creation of authentic matcha is a labor-intensive process refined over centuries. Unlike other teas, matcha requires specialized cultivation techniques and processing methods that contribute to its unique characteristics and premium status.
            </p>
          </motion.div>

          <div className="relative py-12">
            {/* Timeline line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-matcha-medium/30"></div>
            
            <div className="space-y-16 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <ProductionStep 
                  number="1" 
                  title="Shading the Tea Plants" 
                  description="20-30 days before harvest, tea plants are covered with bamboo mats or shade cloths to reduce sunlight exposure by up to 90%. This crucial step increases chlorophyll and L-theanine production, giving matcha its vibrant color, umami flavor, and calming properties." 
                  align="left" 
                />
                <div className="hidden md:block">
                  <div className="h-64 rounded-lg overflow-hidden shadow-lg">
                    <div className="w-full h-full bg-[url('/shading-process.jpg')] bg-cover bg-center"></div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <div className="hidden md:block">
                  <div className="h-64 rounded-lg overflow-hidden shadow-lg">
                    <div className="w-full h-full bg-[url('/hand-picking.jpg')] bg-cover bg-center"></div>
                  </div>
                </div>
                <ProductionStep 
                  number="2" 
                  title="Careful Harvesting" 
                  description="Only the youngest, most tender tea leaves are hand-picked for premium matcha. The first harvest of the season (first flush) in early spring produces the highest quality leaves with the most desirable flavor profile." 
                  align="right" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <ProductionStep 
                  number="3" 
                  title="Steaming & Drying" 
                  description="Immediately after harvesting, leaves are quickly steamed to prevent oxidation, preserving their bright green color and nutritional properties. This differs from Chinese tea processing, which allows oxidation. The leaves are then dried with minimal heat." 
                  align="left" 
                />
                <div className="hidden md:block">
                  <div className="h-64 rounded-lg overflow-hidden shadow-lg">
                    <div className="w-full h-full bg-[url('/steaming-process.jpg')] bg-cover bg-center"></div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <div className="hidden md:block">
                  <div className="h-64 rounded-lg overflow-hidden shadow-lg">
                    <div className="w-full h-full bg-[url('/destemming.jpg')] bg-cover bg-center"></div>
                  </div>
                </div>
                <ProductionStep 
                  number="4" 
                  title="Destemming & Deveining" 
                  description="The dried leaves undergo a meticulous process to remove stems, veins, and any lower-quality portions. Only the purest leaf flesh remains, creating what is called 'tencha' - the precursor to matcha powder. This labor-intensive step significantly affects the final quality." 
                  align="right" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <ProductionStep 
                  number="5" 
                  title="Stone-Grinding" 
                  description="The tencha leaves are ground into an ultra-fine powder using traditional granite stone mills. These mills rotate at a precise, slow speed (about 30 rotations per minute) to prevent heat from friction that would degrade aroma and flavor. Producing just 30 grams of high-quality matcha can take up to an hour." 
                  align="left" 
                />
                <div className="hidden md:block">
                  <div className="h-64 rounded-lg overflow-hidden shadow-lg">
                    <div className="w-full h-full bg-[url('/stone-grinding.jpg')] bg-cover bg-center"></div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <div className="hidden md:block">
                  <div className="h-64 rounded-lg overflow-hidden shadow-lg">
                    <div className="w-full h-full bg-[url('/matcha-storage.jpg')] bg-cover bg-center"></div>
                  </div>
                </div>
                <ProductionStep 
                  number="6" 
                  title="Careful Storage" 
                  description="The finished matcha powder is extremely sensitive to oxygen, light, heat, and moisture. Proper storage in airtight containers away from light and in refrigerated conditions is essential to preserve its delicate flavor compounds, vibrant color, and nutritional properties." 
                  align="right" 
                />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 p-6 bg-cream rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold mb-4 text-black text-gray-900 text-center">Cultural Significance of the Production Process</h3>
            <p className="text-black mb-4">
              The labor-intensive nature of traditional matcha production reflects fundamental Japanese cultural values: meticulous attention to detail, respect for craftsmanship, and patience in pursuing perfection. Each step requires specialized knowledge passed down through generations of tea producers.
            </p>
            <p className="text-black">
              When compared to mass-produced teas, the time and care invested in creating authentic matcha explains both its premium price and its esteemed place in Japanese cultural heritage. This traditional process is increasingly under pressure as global demand soars, creating tension between maintaining quality and meeting market expectations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="section bg-matcha-powder/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/journey" className="block">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="bg-matcha-dark text-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-3">← The Global Journey</h3>
                <p>Explore how matcha traveled from Japan to become a global phenomenon.</p>
              </motion.div>
            </Link>
            
            <Link href="/commodification" className="block">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="bg-matcha-medium text-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-3">American Commodification →</h3>
                <p>See how matcha has been transformed into a trendy superfood in American culture.</p>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Component for Chanoyu Principles
interface PrincipleCardProps {
  kanji: string;
  principle: string;
  description: string;
  delay: number | string;
}

const PrincipleCard = ({ kanji, principle, description, delay }: PrincipleCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: typeof delay === 'string' ? parseFloat(delay) : delay }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-lg shadow-md text-center"
  >
    <div className="bg-matcha-dark text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
      <span className="text-2xl font-bold">{kanji}</span>
    </div>
    <h3 className="text-lg font-bold mb-2">{principle}</h3>
    <p className="text-black text-sm">{description}</p>
  </motion.div>
);

// Component for Production Steps
interface ProductionStepProps {
  number: number | string;
  title: string;
  description: string;
  align: 'left' | 'right';
}

const ProductionStep = ({ number, title, description, align }: ProductionStepProps) => (
  <motion.div
    initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className={`flex ${align === 'left' ? 'flex-row' : 'flex-row-reverse'} items-center gap-6`}
  >
    <div className="w-16 h-16 bg-matcha-dark text-white rounded-full flex items-center justify-center shrink-0">
      <span className="text-xl font-bold">{number}</span>
    </div>
    <div className={`${align === 'left' ? 'text-left' : 'text-right'}`}>
      <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
      <p className="text-black">{description}</p>
    </div>
  </motion.div>
);
