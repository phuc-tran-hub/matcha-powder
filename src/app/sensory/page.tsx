'use client';

// Import removed to fix lint error
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Citation, InlineCitation, Bibliography } from '../../components/Citation';
import { getSensoryPageSources } from '../../data/bibliography';

export default function SensoryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-matcha-deep text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-matcha-dark/30 bg-cover bg-center"></div>
        <div className="container-custom relative z-10 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="heading-1 mb-6">The Sensory World of Matcha</h1>
            <p className="body-text mb-8 text-matcha-light">
              Explore the nuanced vocabulary, meticulous evaluation criteria, and cultural dimensions of 
              how matcha is experienced through the senses in Japanese and American contexts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Japanese Tasting Lexicon Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4">The Japanese Tea Lexicon</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-800">
              Japanese tea culture possesses a rich and nuanced vocabulary for describing the sensory characteristics of tea, 
              reflecting centuries of refined appreciation and cultural significance<InlineCitation sourceNumber={14} />.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Describing the Indescribable</h3>
              <div className="w-16 h-1 bg-matcha-dark mb-6"></div>
              <p className="body-text mb-4">
                The challenge of translating sensory experiences across cultures is significant, as taste and smell 
                are inherently difficult to describe accurately with language, often relying on analogy or metaphor 
                which can be culturally specific<InlineCitation sourceNumber={17} />.
              </p>
              <p className="body-text mb-4 text-gray-800">
                In Japan, matcha evaluation relies heavily on tacit knowledge and cultivated sensory expertise, 
                similar to how wine sommeliers develop their palate through years of practice and study<InlineCitation sourceNumber={13} />.
              </p>
              <p className="body-text text-gray-800">
                While American descriptions of matcha often rely on broader, more generalized terms, the Japanese 
                lexicon offers subtle distinctions that reflect a deeper cultural relationship with tea.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="bg-matcha-powder/10 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold mb-6 border-b border-matcha-medium pb-2 text-center">Japanese Sensory Terms</h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-matcha-dark text-white w-16 h-16 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-2xl font-bold">旨味</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Umami</h4>
                    <p className="text-gray-700">
                      A savory, full-bodied taste central to high-quality matcha, arising from amino 
                      acids like L-theanine which are enhanced by the shading process.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-matcha-dark text-white w-16 h-16 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-2xl font-bold">渋味</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Shibumi</h4>
                    <p className="text-gray-700">
                      A desirable astringency or subtle dryness that provides structure and a clean finish, 
                      distinct from unpleasant bitterness.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-matcha-dark text-white w-16 h-16 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-2xl font-bold">コク味</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Kokumi</h4>
                    <p className="text-gray-700">
                      Richness, body, and a velvety mouthfeel—a sensation that contributes to the 
                      luxurious texture of high-quality matcha.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-matcha-dark text-white w-16 h-16 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-2xl font-bold">甘い</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Amai</h4>
                    <p className="text-gray-700">
                      Sweetness, often a subtle, natural sweetness in high-quality matcha that balances 
                      the other flavor components.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Assessment Section */}
      <section className="section bg-matcha-powder/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4">Evaluating Matcha Quality</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-800">
              In Japan, the evaluation of matcha quality is a meticulous process that goes beyond simple taste, 
              incorporating multiple sensory dimensions and production factors<Citation sources={[10, 14]} />.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="bg-white p-8 rounded-lg shadow-lg mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div>
                <h3 className="text-xl font-bold mb-6 border-b border-matcha-medium pb-2">Sensory Criteria</h3>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="bg-matcha-dark text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-xl font-bold">色</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Color</h4>
                      <p className="text-gray-700">
                        A vibrant, lively green is paramount, indicating freshness and proper shading. 
                        Yellowish or dull tones suggest lower quality or staleness.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-matcha-dark text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-xl font-bold">質</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Texture</h4>
                      <p className="text-gray-700">
                        The powder should be extremely fine, like talcum powder, with no graininess. 
                        The electrostatic cling of very fine powder can cause clumping, necessitating sifting.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-matcha-dark text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-xl font-bold">香</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Aroma</h4>
                      <p className="text-gray-700">
                        A fresh, inviting fragrance is expected. The aroma should suggest vitality 
                        and freshness, without any staleness or mustiness.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-matcha-dark text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-xl font-bold">味</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Taste</h4>
                      <p className="text-gray-700">
                        A complex balance of umami, sweetness, and a pleasant shibumi is sought. 
                        Overpowering bitterness is generally undesirable in high grades.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-6 border-b border-matcha-medium pb-2">Production Factors</h3>
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="bg-matcha-medium text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-xl font-bold">産</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Origin</h4>
                      <p className="text-gray-700">
                        Specific regions in Japan (e.g., Uji, Nishio, Yame) are renowned for high-quality matcha, 
                        each with their own terroir and production methods<InlineCitation sourceNumber={14} />.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-matcha-medium text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-xl font-bold">品</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Cultivar</h4>
                      <p className="text-gray-700">
                        Certain tea plant cultivars are favored for matcha production due to 
                        their leaf characteristics and flavor profiles.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-matcha-medium text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-xl font-bold">摘</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Harvest Time</h4>
                      <p className="text-gray-700">
                        First harvest (shincha) leaves are generally considered the highest quality, 
                        having accumulated nutrients over winter.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 items-start">
                    <div className="bg-matcha-medium text-white w-12 h-12 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-xl font-bold">覆</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Shading Process</h4>
                      <p className="text-gray-700">
                        The duration and method of shading are critical for developing desired 
                        flavor compounds and the vibrant green color<InlineCitation sourceNumber={10} />.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cross-Cultural Comparison Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4">Cross-Cultural Valuation</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-800">
              The way matcha&apos;s sensory attributes are described, valued, and communicated can differ significantly 
              between cultures, notably between Japan and the United States<InlineCitation sourceNumber={17} />.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: false }}
              className="bg-matcha-dark text-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-4 border-b border-matcha-light pb-2">Japanese Perspective</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-2 text-matcha-light">•</span>
                  <p>Values the subtle nuances of flavor including umami, shibumi, and kokumi</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-matcha-light">•</span>
                  <p>Appreciates the cultural and historical significance of preparation methods</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-matcha-light">•</span>
                  <p>Recognizes &ldquo;good bitterness&rdquo; as distinct from &ldquo;bad bitterness&rdquo;</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-matcha-light">•</span>
                  <p>Evaluates matcha holistically based on process, context, and sensory profile</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-matcha-light">•</span>
                  <p>Relies on traditional classifications beyond simple &ldquo;ceremonial&rdquo; vs &ldquo;culinary&rdquo; grades</p>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false }}
              className="bg-matcha-medium text-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-4 border-b border-white pb-2">American Perspective</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-2 text-white">•</span>
                  <p>Tends to prefer milder flavors with lower bitterness and astringency</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-white">•</span>
                  <p>Often views bitterness as a uniformly negative attribute</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-white">•</span>
                  <p>Uses a simplified &ldquo;ceremonial&rdquo; vs &ldquo;culinary&rdquo; grading system as a market adaptation</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-white">•</span>
                  <p>Emphasizes visual appeal, health benefits, and Instagram aesthetics in marketing</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-white">•</span>
                  <p>Values matcha primarily for functional benefits and as a lifestyle signifier</p>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-center mb-8"
          >
            <p className="text-lg text-gray-800 italic max-w-3xl mx-auto">
              &ldquo;The future may see a more mature American market where consumers, having moved past initial trend-driven curiosity, 
              seek out more diverse and high-quality Japanese teas, appreciate the subtleties of different preparation methods, 
              and engage more deeply with the cultural narratives embedded within them.&rdquo;<InlineCitation sourceNumber={1} />
            </p>
          </motion.div>
        </div>
      </section>

      {/* Matcha Grading System Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4">The Nuanced Art of Matcha Grading</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-800">
              In Japan, matcha quality assessment goes far beyond the simplified &ldquo;ceremonial&rdquo; vs &ldquo;culinary&rdquo; binary often used in Western markets. Japanese tea producers evaluate matcha based on multiple factors that collectively determine its quality and intended use.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="bg-white p-6 rounded-lg shadow-lg border border-matcha-light/20"
            >
              <h3 className="text-xl font-bold mb-4 border-b border-matcha-dark pb-2">Japanese Evaluation System</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-matcha-dark mb-2">Appearance & Color</h4>
                  <p className="text-gray-800 mb-2">A vibrant emerald green indicates high quality. Dull or yellowish tones suggest lower grades or improper storage.</p>
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    <div className="h-8 rounded bg-[#48742C] flex items-center justify-center text-white text-xs">Low</div>
                    <div className="h-8 rounded bg-[#4D8A2C] flex items-center justify-center text-white text-xs"></div>
                    <div className="h-8 rounded bg-[#4C9B37] flex items-center justify-center text-white text-xs"></div>
                    <div className="h-8 rounded bg-[#39A950] flex items-center justify-center text-white text-xs">High</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-matcha-dark mb-2">Texture & Particle Size</h4>
                  <p className="text-gray-800 mb-2">Premium matcha should be ultra-fine like talcum powder, with no detectable graininess when rubbed between fingers.</p>
                  <div className="flex items-center mt-3 space-x-3">
                    <div className="w-6 h-6 rounded-full bg-matcha-dark flex-shrink-0"></div>
                    <div className="w-4 h-4 rounded-full bg-matcha-dark flex-shrink-0"></div>
                    <div className="w-2 h-2 rounded-full bg-matcha-dark flex-shrink-0"></div>
                    <div className="w-1 h-1 rounded-full bg-matcha-dark flex-shrink-0"></div>
                    <div className="text-sm text-gray-600">Progressively finer particle size</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-matcha-dark mb-2">Cultivation Method</h4>
                  <p className="text-gray-800">The length of shading before harvest significantly impacts quality. Premium grades are shaded for 20-30 days, allowing chlorophyll and L-theanine to accumulate.</p>
                </div>

                <div>
                  <h4 className="font-bold text-matcha-dark mb-2">Flavor Complexity</h4>
                  <p className="text-gray-800">Higher grades balance umami, subtle sweetness, and pleasant astringency. Lower grades may be more bitter or flat-tasting.</p>
                </div>

                <div>
                  <h4 className="font-bold text-matcha-dark mb-2">Origin</h4>
                  <p className="text-gray-800">Specific regions like Uji, Nishio, and Yame are known for producing premium matcha with distinctive regional characteristics.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <div className="bg-white p-6 rounded-lg shadow-lg border border-matcha-light/20 mb-8">
                <h3 className="text-xl font-bold mb-4 border-b border-matcha-medium pb-2">Western Marketing Classifications</h3>
                <p className="text-gray-800 mb-4">
                  The American market typically uses a simplified binary classification system that doesn&apos;t fully capture the nuanced evaluation criteria used in Japan:
                </p>
                <div className="space-y-6">
                  <div className="bg-matcha-dark/10 p-4 rounded">
                    <h4 className="font-bold text-matcha-dark mb-2">Ceremonial Grade</h4>
                    <p className="text-gray-800 mb-2">Marketing term for higher-quality matcha intended to be consumed traditionally with just hot water.</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Vibrant green color</li>
                      <li>Smooth, fine texture</li>
                      <li>Complex flavor with sweet notes and umami</li>
                      <li>Minimal bitterness</li>
                      <li>Often from first harvest (spring)</li>
                    </ul>
                  </div>

                  <div className="bg-matcha-medium/10 p-4 rounded">
                    <h4 className="font-bold text-matcha-medium mb-2">Culinary/Ingredient Grade</h4>
                    <p className="text-gray-800 mb-2">Designates less expensive matcha intended for cooking, baking, or mixing with other ingredients.</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Less vibrant color (more olive-toned)</li>
                      <li>Coarser texture</li>
                      <li>Stronger, more bitter flavor that can stand up to other ingredients</li>
                      <li>Often from later harvests</li>
                      <li>Less expensive</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-cream p-5 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-3 text-center">The Translation Gap</h3>
                <p className="text-gray-800">
                  The simplified Western grading system emerged as a market adaptation to make matcha more accessible to American consumers unfamiliar with Japanese tea traditions<InlineCitation sourceNumber={10} />. While functional, this binary classification obscures the sophisticated evaluation system used in Japan, where each tea is judged on its individual merits rather than broad categories.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="p-6 bg-matcha-dark text-white rounded-lg shadow-lg mb-8"
          >
            <h3 className="text-xl font-bold mb-4 text-center">Premium Matcha Characteristics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">色</span>
                </div>
                <h4 className="font-bold mb-2">Color</h4>
                <p className="text-sm">Vivid jade green with no yellow or brown tints</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">香</span>
                </div>
                <h4 className="font-bold mb-2">Aroma</h4>
                <p className="text-sm">Fresh, sweet, grassy scent with marine notes</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">味</span>
                </div>
                <h4 className="font-bold mb-2">Taste</h4>
                <p className="text-sm">Rich umami, balanced sweetness and pleasant astringency</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bibliography Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <Bibliography sources={getSensoryPageSources()} />
        </div>
      </section>

      {/* Navigation Links */}
      <section className="section bg-matcha-powder/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/tradition" className="block">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="bg-matcha-dark text-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-3">← Japanese Tradition</h3>
                <p>Explore the sacred roots and cultural significance of matcha in Japan.</p>
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
