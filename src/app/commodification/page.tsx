'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Citation, InlineCitation, Bibliography } from '../../components/Citation';
import { getCommodificationPageSources } from '../../data/bibliography';

export default function CommodificationPage() {
  const marketChartRef = useRef<HTMLDivElement>(null);

  // D3 chart for market growth
  useEffect(() => {
    if (typeof window === 'undefined' || !marketChartRef.current) return;

    // Clear previous SVG
    d3.select(marketChartRef.current).selectAll("*").remove();

    const margin = { top: 40, right: 30, bottom: 60, left: 60 };
    const width = marketChartRef.current?.clientWidth ? marketChartRef.current.clientWidth - margin.left - margin.right : 500;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG
    const svg = d3.select(marketChartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Market data
    interface DataPoint {
      year: number;
      value: number;
    }
    
    const data: DataPoint[] = [
      { year: 2010, value: 0.5 },
      { year: 2015, value: 1.2 },
      { year: 2020, value: 2.8 },
      { year: 2025, value: 5.5 }, // Projected
    ];

    // X scale
    const x = d3.scaleLinear()
      .domain([2010, 2025])
      .range([0, width]);

    // Y scale
    const y = d3.scaleLinear()
      .domain([0, 6])
      .range([height, 0]);

    // Line generator
    const line = d3.line<DataPoint>()
      .x(d => x(d.year))
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    // Add X axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5).tickFormat(d => d.toString()))
      .style("font-size", "12px");

    // Add X axis label
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height + 40)
      .text("Year")
      .style("font-size", "14px");

    // Add Y axis
    svg.append("g")
      .call(d3.axisLeft(y).ticks(5))
      .style("font-size", "12px");

    // Add Y axis label
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", -height / 2)
      .text("Global Market Size (Billion USD)")
      .style("font-size", "14px");

    // Add the line
    const path = svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#4b830d") // matcha-dark
      .attr("stroke-width", 3)
      .attr("d", line);

    // Add line animation
    const pathNode = path.node();
    if (pathNode) {
      const pathLength = pathNode.getTotalLength();
      path
        .attr("stroke-dasharray", pathLength)
        .attr("stroke-dashoffset", pathLength)
        .transition()
        .duration(2000)
        .attr("stroke-dashoffset", 0);
    }

    // Add the points
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.year))
      .attr("cy", d => y(d.value))
      .attr("r", 0)
      .attr("fill", d => d.year === 2025 ? "#ff5722" : "#8bc34a") // accent for projection, matcha-medium for historical
      .transition()
      .delay((d, i) => 2000 + i * 300)
      .duration(500)
      .attr("r", 6);

    // Add labels
    svg.selectAll(".label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("x", d => x(d.year))
      .attr("y", d => y(d.value) - 15)
      .attr("text-anchor", "middle")
      .text(d => `$${d.value}B`)
      .style("font-size", "12px")
      .style("font-weight", "bold")
      .style("opacity", 0)
      .transition()
      .delay((d, i) => 2500 + i * 300)
      .duration(500)
      .style("opacity", 1);

    // Add "Projected" annotation
    svg.append("text")
      .attr("x", x(2025))
      .attr("y", y(5.5) - 30)
      .attr("text-anchor", "middle")
      .text("Projected")
      .style("font-size", "12px")
      .style("font-style", "italic")
      .style("fill", "#ff5722")
      .style("opacity", 0)
      .transition()
      .delay(3600)
      .duration(500)
      .style("opacity", 1);

    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", -15)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("font-weight", "bold")
      .text("Global Matcha Market Growth (2010-2025)");

    return () => {
      // Cleanup
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-matcha-medium text-white overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1621446109865-6a6c3b095c38?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
          }}
        ></div>
        <div className="absolute inset-0 z-5 bg-gradient-to-b from-matcha-medium/60 via-matcha-medium/50 to-matcha-medium/60"></div>
        <div className="container-custom relative z-10 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="heading-1 mb-6 text-white">American Commodification</h1>
            <p className="body-text mb-8 text-white">
              Examine how matcha has transformed from a sacred Japanese tea ceremony ingredient 
              into a trendy &quot;superfood&quot; and aesthetic product in American markets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Matcha Boom Section */}
      <section className="section bg-matcha-powder/10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-white">The American &quot;Matcha Boom&quot;</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-500">
              Once an obscure ceremonial tea, matcha has exploded in popularity in the U.S., becoming a mainstream beverage, wellness supplement, and culinary ingredient<InlineCitation sourceNumber={12} />, driven by a unique confluence of factors.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: false }}
              className="bg-white p-6 rounded-lg shadow-md h-full"
            >
              <div className="bg-matcha-dark text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-black text-center">Wellness Industry Embrace</h3>
              <p className="text-gray-800">
                The wellness industry has enthusiastically embraced matcha for its perceived health benefits, including high antioxidant levels (especially EGCG), the presence of L-theanine which promotes calm alertness, and its potential to boost metabolism and support heart health<Citation sources={[16, 17]} />.
              </p>
              <p className="text-gray-800 mt-3">
                Marketed as providing a &quot;smooth energy boost&quot; without the &quot;jitters&quot; often associated with coffee, matcha aligns perfectly with the &quot;intentional living&quot; and &quot;clean caffeine&quot; trends<InlineCitation sourceNumber={13} />. This framing as a &quot;wellness drink&quot; has been pivotal to its widespread adoption.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false }}
              className="bg-white p-6 rounded-lg shadow-md h-full"
            >
              <div className="bg-matcha-dark text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-black text-center">Social Media Amplification</h3>
              <p className="text-gray-800">
                Social media platforms, especially Instagram and TikTok, have acted as powerful amplifiers for matcha&#39;s popularity<InlineCitation sourceNumber={13} />. Its vibrant green color and the aesthetic appeal of matcha lattes make it highly &quot;Instagrammable.&quot;
              </p>
              <p className="text-gray-800 mt-3">
                Influencers showcase matcha as part of an aspirational lifestyle, often linked to the &#39;clean girl aesthetic,&#39; further fueling its trendiness among younger demographics like Gen Z and millennials<InlineCitation sourceNumber={13} />. Videos tagged #Matcha have garnered billions of views, demonstrating the immense reach and impact of these platforms<InlineCitation sourceNumber={13} />.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: false }}
              className="bg-white p-6 rounded-lg shadow-md h-full"
            >
              <div className="bg-matcha-dark text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-black text-center">Economic Implications</h3>
              <p className="text-gray-800">
                The matcha market in the U.S. has seen substantial growth, with projections indicating continued expansion<InlineCitation sourceNumber={12} />. Matcha is no longer confined to traditional tea preparations; it is widely incorporated into lattes, smoothies, ice cream, baked goods, and even savory dishes.
              </p>
              <p className="text-gray-800 mt-3">
                This rapid growth has led to challenges including supply chain issues, shortages, and rising prices as Japanese production struggles to keep pace with global demand<InlineCitation sourceNumber={11} />. The intense demand, amplified by social media trends, can outstrip the capacities of traditional, often artisanal, production methods.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Growth Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-black">Explosive Market Growth</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-500">
              The American matcha market has seen unprecedented growth, transforming from a niche 
              product to a mainstream phenomenon.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="bg-cream p-6 rounded-lg shadow-lg mb-8"
          >
            <div ref={marketChartRef} className="w-full h-[400px]">
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-800">Loading market data visualization...</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: false }}
              className="bg-matcha-powder/20 p-6 rounded-lg shadow-md"
            >
              <div className="text-4xl font-bold text-matcha-dark mb-2">$10B+</div>
              <h3 className="text-xl font-semibold mb-2">U.S. Sales</h3>
              <p className="text-gray-800">
                Matcha sales in the United States have exceeded $10 billion over the past 25 years, showing remarkable market penetration<InlineCitation sourceNumber={12} />.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: false }}
              className="bg-matcha-powder/20 p-6 rounded-lg shadow-md"
            >
              <div className="text-4xl font-bold text-matcha-dark mb-2">9.44%</div>
              <h3 className="text-xl font-semibold mb-2">Annual Growth</h3>
              <p className="text-gray-800">
                The compound annual growth rate (CAGR) for the global matcha market is projected at 9.44% from 2022 to 2027.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: false }}
              className="bg-matcha-powder/20 p-6 rounded-lg shadow-md"
            >
              <div className="text-4xl font-bold text-matcha-dark mb-2">24%</div>
              <h3 className="text-xl font-semibold mb-2">Import Tariff</h3>
              <p className="text-gray-800">
                Recent trade policies have increased costs for U.S. businesses and consumers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Health Marketing Section */}
      <section className="section bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-black">The &quot;Superfood&quot; Phenomenon</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-500">
              In American markets, matcha has been reframed primarily as a health product, with marketing 
              focusing on its nutritional properties rather than cultural significance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <h3 className="text-xl font-bold mb-4 text-black">The &quot;Nutritionism&quot; Paradigm</h3>
              <p className="body-text mb-4 text-black">
                American health-conscious consumers have embraced matcha primarily for its nutritional qualities, 
                embodying what scholars call the &quot;nutritionism&quot; paradigm, where food is reduced to its isolated components<InlineCitation sourceNumber={4} />.
              </p>
              <p className="body-text mb-4 text-black">
                Marketing emphasizes scientific claims about health benefits, often with taglines like 
                &quot;Energy, Focus, and Antioxidant&quot; rather than cultural heritage.
              </p>
              <p className="body-text text-black">
                This approach decontextualizes matcha from its rich cultural origins, transforming it into 
                what anthropologist Nick Dreher calls a &quot;food from nowhere.&quot;<InlineCitation sourceNumber={1} />
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4 text-black">Marketed Health Benefits</h3>
              <div className="space-y-4">
                <HealthBenefit 
                  title="Antioxidant Powerhouse" 
                  description="Contains catechins, particularly EGCG (epigallocatechin gallate), which are potent antioxidants that may help prevent cell damage."
                  sourceNumber={16}
                />
                <HealthBenefit 
                  title="Cognitive Enhancement" 
                  description="Contains L-theanine which promotes calm alertness and may improve focus, memory, and cognitive performance."
                  sourceNumber={17}
                />
                <HealthBenefit 
                  title="Metabolism Booster" 
                  description="May enhance metabolism and increase fat oxidation, often marketed for weight management."
                  sourceNumber={16}
                />
                <HealthBenefit 
                  title="Energy Without Jitters" 
                  description="Provides sustained energy without the crash associated with coffee, due to the combined effect of caffeine and L-theanine."
                />
                <HealthBenefit 
                  title="Heart Health" 
                  description="May help reduce cholesterol levels and improve heart health markers."
                  sourceNumber={16}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Americanized Consumption Contexts */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-gray-900">Americanized Consumption Contexts</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-500">
              Matcha&apos;s integration into American culture reveals a spectrum of adaptations, 
              from attempts at authenticity to complete transformation.
            </p>
          </motion.div>

          <div className="space-y-12">
            <ConsumptionContext
              title="Starbucks & Chain Cafes"
              description="Major chains like Starbucks serve matcha primarily as sweetened lattes with milk, syrup, and other additions that mask its natural flavor. These highly modified versions cater to American palates that may find traditional matcha's bitter or umami notes less appealing."
              alignment="left"
              delay={0.2}
            />

            <ConsumptionContext
              title="Home Wellness Routines"
              description="Many Americans have integrated matcha into daily wellness routines. While some follow traditional preparation methods, most adopt simplified approaches, often adding supplements like collagen or blending matcha into smoothies for convenience."
              alignment="right"
              delay={0.4}
            />

            <ConsumptionContext
              title="Social Media Aesthetics"
              description="Platforms like Instagram have accelerated matcha's popularity through visually appealing content. The distinctive green color and aesthetic presentation of matcha drinks often take precedence over traditional preparation methods or cultural context."
              alignment="left"
              delay={0.6}
            />

            <ConsumptionContext
              title="Traditional Japanese Shops"
              description="Some Japanese-owned establishments in major U.S. cities strive to maintain cultural authenticity, using traditional tools and methods. These spaces represent resistance to complete commodification and serve as cultural education centers."
              alignment="right"
              delay={0.8}
            />
          </div>
        </div>
      </section>

      {/* Cultural Appropriation Section */}
      <section className="section bg-matcha-powder/20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-white">Cultural Appropriation vs. Appreciation</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-500">
              The global spread of matcha navigates a complex boundary between respectful cultural 
              exchange and problematic appropriation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold border-b border-matcha-dark pb-2 mb-6 text-gray-900">Cultural Appropriation Concerns</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-2 text-matcha-dark">•</span>
                  <p className="text-black">Marketing that erases origins and cultural context to enhance Western appeal<InlineCitation sourceNumber={1} /></p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-matcha-dark">•</span>
                  <p className="text-black">Dismissal of traditional tools and preparation methods as unnecessary or inefficient</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-matcha-dark">•</span>
                  <p className="text-black">Selling low-quality, mass-produced matcha at premium prices</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-matcha-dark">•</span>
                  <p className="text-black">Misrepresenting historical facts (e.g., claiming &quot;not from China, Japan only!&quot; despite Chinese origins)</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-matcha-dark">•</span>
                  <p className="text-black">Gentrification where &quot;exotic&quot; appeal is exploited for commercial gain while erasing cultural labor<InlineCitation sourceNumber={1} /></p>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: false }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold border-b border-matcha-medium pb-2 mb-6 text-gray-900">Strategic Authenticity Efforts</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-2 text-matcha-medium">•</span>
                  <p className="text-black">Supporting Japanese-owned businesses that prioritize traditional practices</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-matcha-medium">•</span>
                  <p className="text-black">Educational initiatives that explain matcha&apos;s cultural significance alongside health benefits</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-matcha-medium">•</span>
                  <p className="text-black">Transparent sourcing and grading information on packaging</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-matcha-medium">•</span>
                  <p className="text-black">Fair trade models that recognize the true cost of traditional production</p>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-matcha-medium">•</span>
                  <p className="text-black">Japanese-American cultural advocates who promote respectful adoption and adaptation</p>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: false }}
            className="mt-12 text-center"
          >
            <blockquote className="text-xl italic max-w-3xl mx-auto">
              &quot;While cultural exchange and the evolution of food traditions are acknowledged as inevitable, 
              the fundamental issue arises when commercialization actively erases the cultural knowledge, 
              history, and labor behind it.&quot;<InlineCitation sourceNumber={1} />
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* Sustainability Challenges Section */}
      <section className="section bg-matcha-dark text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-white">Sustainability Challenges</h2>
            <p className="body-text max-w-3xl mx-auto text-white">
              The rapid rise in matcha&apos;s global popularity has brought significant challenges to the industry, threatening both traditional production methods and cultural integrity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">Supply Chain Pressures</h3>
                <p className="text-white">
                  Only about 6% of all Japanese tea is processed into matcha, creating inherent scarcity<InlineCitation sourceNumber={11} />. 
                  The labor-intensive traditional methods face pressure to industrialize as global demand soars.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">Declining Farmer Population</h3>
                <p className="text-white">
                  The number of Japanese tea farmers is decreasing, limiting the capacity to scale up production. 
                  The Japanese Ministry of Agriculture is providing subsidies to encourage increased production.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">Quality vs. Quantity Trade-off</h3>
                <p className="text-white">
                  As demand outpaces authentic production capacity, there&apos;s concern that companies may 
                  sell lower-quality green tea powders as &ldquo;matcha,&rdquo; diluting market authenticity and misleading consumers about what constitutes genuine matcha<InlineCitation sourceNumber={11} />.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 text-white">Traditional Methods Under Threat</h3>
                <p className="text-white">
                  The pressure to increase production volume can lead to compromises in traditional, often more sustainable, farming practices. The intensive shading process essential for developing matcha&apos;s characteristic flavor compounds and vibrant color is particularly at risk of being shortened or modified.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="bg-matcha-deep/80 p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-4 text-white border-b border-white/50 pb-2">Balancing Future Growth</h3>
              <p className="mb-6 text-white">
                The future of matcha depends on successfully navigating the balance between cultural 
                preservation and commercial expansion.
              </p>
              <div className="space-y-4">
                <div className="bg-matcha-deep/90 p-4 rounded border border-white/20">
                  <h4 className="font-bold text-white mb-2">Ethical Sourcing</h4>
                  <p className="text-sm text-white">
                    Supporting sustainable farming practices and fair compensation for traditional producers.
                  </p>
                </div>
                <div className="bg-matcha-deep/90 p-4 rounded border border-white/20">
                  <h4 className="font-bold text-white mb-2">Cultural Education</h4>
                  <p className="text-sm text-white">
                    Promoting consumer awareness about matcha&apos;s cultural heritage alongside its health benefits.
                  </p>
                </div>
                <div className="bg-matcha-deep/90 p-4 rounded border border-white/20">
                  <h4 className="font-bold text-white mb-2">Innovation with Respect</h4>
                  <p className="text-sm text-white">
                    Finding balance between modern adaptations and honoring traditional practices.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Supply Chain & Future Challenges Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-black">Supply Chain Challenges & Sustainability</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-500">
              The explosive global popularity of matcha has created significant pressures on traditional Japanese tea production, leading to supply chain challenges and raising important questions about long-term sustainability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <h3 className="text-xl font-bold mb-4 text-black text-gray-900">The Supply-Demand Dilemma</h3>
              <div className="w-16 h-1 bg-matcha-dark mb-6"></div>
              <p className="body-text mb-4 text-black">
                Japanese matcha production is struggling to keep pace with exponential growth in global demand. This has led to shortages, order backlogs, and significant price increases across the industry.
              </p>
              <p className="body-text mb-4 text-gray-800">
                Premium matcha requires labor-intensive cultivation methods and specialized processing techniques that cannot be easily scaled. Each step—from shading the plants to stone-grinding the leaves—involves meticulous attention that resists industrial automation.
              </p>
              <p className="body-text text-gray-800">
                As American cafes and food manufacturers compete for limited supply, many Japanese producers face immense pressure to increase output, often at the expense of traditional methods and quality standards that have been maintained for centuries.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                <div className="text-white text-center px-6">
                  <h3 className="text-2xl font-bold mb-3">Capacity vs. Demand</h3>
                  <div className="w-16 h-1 bg-white mx-auto mb-6"></div>
                  <p className="text-lg">
                    &ldquo;The pressure to meet Western demand has created a situation where centuries-old production methods are being compressed or modified, threatening the very essence of what makes premium matcha special.&rdquo;
                  </p>
                </div>
              </div>
              <div className="w-full h-full bg-[url('/matcha-supply-chain.jpg')] bg-cover bg-center"></div>
            </motion.div>
          </div>

          <div className="bg-cream p-8 rounded-lg shadow-lg mb-16">
            <h3 className="text-xl font-bold mb-6 text-center text-gray-900 border-b border-matcha-medium pb-3">Key Supply Chain Vulnerabilities</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false }}
                className="bg-white p-5 rounded-lg shadow-md"
              >
                <div className="w-12 h-12 bg-matcha-dark text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-xl">1</span>
                </div>
                <h4 className="text-lg font-bold mb-3 text-black text-center">Aging Workforce</h4>
                <p className="text-gray-800 text-center">
                  The average age of Japanese tea farmers has risen to over 70 years. With younger generations moving to cities and fewer apprentices entering the trade, traditional knowledge risks being lost forever.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: false }}
                className="bg-white p-5 rounded-lg shadow-md"
              >
                <div className="w-12 h-12 bg-matcha-dark text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-xl">2</span>
                </div>
                <h4 className="text-lg font-bold mb-3 text-black text-center">Long Production Cycle</h4>
                <p className="text-gray-800 text-center">
                  Tea plants require 3-5 years before first harvest and decades to reach peak production. This long maturation period makes it impossible to rapidly increase supply in response to market trends.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: false }}
                className="bg-white p-5 rounded-lg shadow-md"
              >
                <div className="w-12 h-12 bg-matcha-dark text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-xl">3</span>
                </div>
                <h4 className="text-lg font-bold mb-3 text-black text-center">Quality Control Issues</h4>
                <p className="text-gray-800 text-center">
                  As demand outstrips supply, there&apos;s increasing risk of lower-quality products entering the market, potentially diluting authentic matcha&apos;s reputation or misleading consumers about what they&apos;re purchasing.
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="mb-16"
          >
            <h3 className="text-xl font-bold mb-6 text-center text-gray-900">The Quality-Quantity Trade-off</h3>
            
            <div className="relative pt-12 pb-16">
              {/* Central line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-matcha-medium/30"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative mb-12">
                <div className="md:text-right md:pr-12">
                  <div className="bg-matcha-light/10 p-6 rounded-lg shadow-md relative">
                    <h4 className="font-bold text-matcha-dark mb-2">Traditional Production</h4>
                    <ul className="space-y-2 text-gray-800">
                      <li>Carefully shaded for 20-30 days</li>
                      <li>Meticulously hand-picked</li>
                      <li>Stone-ground at slow speeds</li>
                      <li>Limited daily output</li>
                      <li>Multi-generational expertise</li>
                    </ul>
                  </div>
                </div>
                <div className="md:pl-12"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <div className="md:pr-12"></div>
                <div className="md:pl-12">
                  <div className="bg-matcha-light/10 p-6 rounded-lg shadow-md relative">
                    <h4 className="font-bold text-matcha-medium mb-2">Mass Production Pressures</h4>
                    <ul className="space-y-2 text-gray-800">
                      <li>Reduced shading periods</li>
                      <li>Mechanical harvesting</li>
                      <li>High-speed grinding</li>
                      <li>Increased output focus</li>
                      <li>Standardized processes</li>
                    </ul>
                  </div>
                </div>
              </div>
              
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="p-6 bg-matcha-dark text-white rounded-lg shadow-lg mb-8"
          >
            <h3 className="text-xl font-bold mb-4 text-white text-center">Sustainable Future Pathways</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-white border-b border-white/20 pb-2 mb-3">Producer-Side Solutions</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center mr-3 mt-1">✓</span>
                    <p className="text-white">Investment in training programs for young tea farmers</p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center mr-3 mt-1">✓</span>
                    <p className="text-white">Government subsidies to preserve traditional cultivation</p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center mr-3 mt-1">✓</span>
                    <p className="text-white">Selective innovation that respects traditional methods</p>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-white border-b border-white/20 pb-2 mb-3">Consumer-Side Solutions</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center mr-3 mt-1">✓</span>
                    <p className="text-white">Education about authentic matcha and its true value</p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center mr-3 mt-1">✓</span>
                    <p className="text-white">Willingness to pay premium prices for ethically sourced tea</p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-5 h-5 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center mr-3 mt-1">✓</span>
                    <p className="text-white">Support for transparent supply chains and direct trade</p>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bibliography Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <Bibliography sources={getCommodificationPageSources()} />
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
                <p className="text-white">Explore the sacred roots and cultural significance of matcha in Japan.</p>
              </motion.div>
            </Link>
            
            <Link href="/about" className="block">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="bg-matcha-medium text-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-3">About This Project →</h3>
                <p className="text-white">Learn more about this visualization and the research behind it.</p>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Health Benefit Component
interface HealthBenefitProps {
  title: string;
  description: string;
  sourceNumber?: number;
}

function HealthBenefit({ title, description, sourceNumber }: HealthBenefitProps) {
  return (
    <div className="border-l-4 border-matcha-medium pl-4 py-1">
      <h4 className="font-bold text-black">{title}</h4>
      <p className="text-sm text-gray-800">
        {description}
        {sourceNumber && <InlineCitation sourceNumber={sourceNumber} />}
      </p>
    </div>
  );
}

// Consumption Context Component
interface ConsumptionContextProps {
  title: string;
  description: string;
  alignment: 'left' | 'right';
  delay?: number;
}

function ConsumptionContext({ title, description, alignment, delay = 0 }: ConsumptionContextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: alignment === 'left' ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: false }}
      className={`flex ${alignment === 'right' ? 'flex-row-reverse' : 'flex-row'} items-center gap-8`}
    >
      <div className="w-20 h-20 bg-matcha-medium text-white rounded-full flex items-center justify-center shrink-0">
        <div className="text-xl font-bold">{title.charAt(0)}</div>
      </div>
      <div className={`text-${alignment === 'right' ? 'right' : 'left'}`}>
        <h3 className="text-xl font-bold mb-2 text-black text-gray-900">{title}</h3>
        <p className="text-gray-800">{description}</p>
      </div>
    </motion.div>
  );
}
