'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
// Define MatchaShop type inline since we can&apos;t import it directly yet
type MatchaShopType = {
  name: string;
  location: [number, number];
  rating: number;
};

// Use the imported MatchaShop type
type MatchaShop = MatchaShopType;

// Define types for component props
interface TimelineEventProps {
  year: string | number;
  title: string;
  description: string;
  align: 'left' | 'right';
  delay: number;
}

interface TradeCardProps {
  title: string;
  description: string;
  icon: string;
  delay: number;
}

// Define types for shipping routes
interface ShippingRoute {
  name: string;
  path: [number, number][];
  color: string;
  pathNames?: string[];
  dasharray?: string;
}

// Dynamically import the Leaflet map component to avoid SSR issues
// Import directly from the correct path relative to the current file
const NYCLeafletMap = dynamic(() => import('./components/NYCLeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-white rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading NYC map...</p>
    </div>
  ),
});

export default function JourneyPage() {
  const globalMapRef = useRef<HTMLDivElement>(null);
  const [matchaShops] = useState<MatchaShop[]>([
    { name: "Cha Cha Matcha", location: [-73.9997, 40.7246], rating: 4.5 },
    { name: "Matcha Cafe Wabi", location: [-73.9882, 40.7320], rating: 4.7 },
    { name: "Chalait", location: [-74.0054, 40.7349], rating: 4.6 },
    { name: "Matchaful", location: [-73.9447, 40.7142], rating: 4.8 },
    { name: "Matcha Bar", location: [-73.9650, 40.6781], rating: 4.4 },
    { name: "Ippodo Tea", location: [-73.9819, 40.7493], rating: 4.9 }
  ]);

  // Global map visualization for shipping routes
  useEffect(() => {
    if (typeof window === 'undefined' || !globalMapRef.current) return;

    // Clear previous SVG
    d3.select(globalMapRef.current).selectAll("*").remove();

    const width = globalMapRef.current.clientWidth;
    const height = 500;

    // Create SVG
    const svg = d3.select(globalMapRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    // Create a projection for our simpleProjection function
    // We'll use this in the shipping routes
    const projection = d3.geoMercator()
      .center([140, 30]) // Centered roughly between Japan and US
      .scale(width / 6)
      .translate([width / 2, height / 2]);

    // Create a path generator - not used in our simplified map approach
    // but keep the projection for possible future use
    // const path = d3.geoPath().projection(projection);

    // Draw a simplified world map with just key areas highlighted
    // Draw a simplified world background
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#f5f5f5")
      .attr("opacity", 0.5);
      
    // Add a simplified Japan region
    svg.append("ellipse")
      .attr("cx", width * 0.75) // Position Japan on the right side
      .attr("cy", height * 0.45)
      .attr("rx", 30)
      .attr("ry", 20)
      .attr("fill", "#4b830d") // matcha-dark
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5);
    
    // Add a simplified USA region
    svg.append("rect")
      .attr("x", width * 0.15) // Position USA on the left side
      .attr("y", height * 0.4)
      .attr("width", 100)
      .attr("height", 60)
      .attr("fill", "#8bc34a") // matcha-medium
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5);
      
    // Add label for Japan
    svg.append("text")
      .attr("x", width * 0.75)
      .attr("y", height * 0.45 - 30)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text("Japan");
      
    // Add label for USA
    svg.append("text")
      .attr("x", width * 0.15 + 50)
      .attr("y", height * 0.4 - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .text("USA");
      
    // Draw a simplified Pacific Ocean
    svg.append("text")
      .attr("x", width * 0.45)
      .attr("y", height * 0.45)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "#2196f3")
      .attr("font-style", "italic")
      .text("Pacific Ocean");
      
    // Add a map background circle just for visual effect
    svg.append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", Math.min(width, height) * 0.45)
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", "5,5");
      
    // Create a simple coordinates mapping function using the projection
    const simpleProjection = (coordinates: [number, number]) => {
      // We could use the projection directly, but we want more control for our simplified map
      // This is a modified version that uses the projection logic but with custom positioning
      // Japan is roughly at [140, 36], USA NYC is roughly at [-74, 40]
      // Use the projection to get a baseline, then adjust
      const projCoords = projection(coordinates);
      if (projCoords) {
        // Apply some custom adjustments to fine-tune the position
        return projCoords;
      } else {
        // Fallback if projection fails
        const x = width * 0.75 - (coordinates[0] - 140) * 2;
        const y = height * 0.45 + (coordinates[1] - 36) * 2;
        return [x, y];
      }
    };
      
    // Function to convert coordinates to SVG position
    const toSvgPosition = (coordinates: [number, number]) => {
      const [x, y] = simpleProjection(coordinates);
      return [x, y];
    };
      
    // Update the path generation to use our simplified projection
    const simplePath = (points: [number, number][]) => {
      let pathData = "M" + toSvgPosition(points[0]).join(",");
      for (let i = 1; i < points.length; i++) {
        pathData += "L" + toSvgPosition(points[i]).join(",");
      }
      return pathData;
    };

    // Global shipping routes data
    const shippingRoutes: ShippingRoute[] = [
      {
        name: "Traditional Route",
        path: [
          // Tokyo, Japan
          [139.6917, 35.6895],
          // San Francisco, USA
          [-122.4194, 37.7749],
          // New York, USA
          [-74.0060, 40.7128]
        ],
        color: "#4b830d" // matcha-dark
      },
      {
        name: "Modern Air Route",
        path: [
          // Tokyo, Japan
          [139.6917, 35.6895],
          // New York, USA
          [-74.0060, 40.7128]
        ],
        color: "#2196f3", // blue
        dasharray: "none"
      }
    ];

    // Define location names for routes
    const locationNames = {
      japan: "Tokyo, Japan",
      sanFrancisco: "San Francisco, USA",
      newYork: "New York, USA"
    };

    // Draw shipping routes using our simplified projection
    shippingRoutes.forEach((route, i) => {
      // Generate path data for this route
      const pathData = simplePath(route.path);
      
      // Create path with animation
      const routePath = svg.append("path")
        .attr("fill", "none")
        .attr("stroke", route.color)
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", route.dasharray || "none")
        .attr("d", pathData);

      // Animate the path
      const pathLength = routePath.node()?.getTotalLength() || 0;
      routePath
        .attr("stroke-dasharray", pathLength)
        .attr("stroke-dashoffset", pathLength)
        .transition()
        .duration(3000)
        .delay(i * 1000)
        .attr("stroke-dashoffset", 0);

      // Add points for key locations
      route.path.forEach((coords, j) => {
        const [x, y] = toSvgPosition(coords);
        
        // Add circle point
        svg.append("circle")
          .attr("class", `route-point-${i}`)
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 0)
          .attr("fill", route.color)
          .transition()
          .delay(i * 1000 + j * 750)
          .duration(500)
          .attr("r", 6);
        
        // Add label
        let label = "";
        if (j === 0) label = locationNames.japan;
        else if (j === 1 && route.name === "Traditional Route") label = locationNames.sanFrancisco;
        else if ((j === 1 && route.name === "Modern Air Route") || 
                (j === 2 && route.name === "Traditional Route")) {
          label = locationNames.newYork;
        }
        
        svg.append("text")
          .attr("class", `route-label-${i}`)
          .attr("x", x)
          .attr("y", y - 10)
          .attr("text-anchor", "middle")
          .style("font-size", "12px")
          .style("font-weight", "bold")
          .style("opacity", 0)
          .text(label)
          .transition()
          .delay(i * 1000 + 500 + j * 750)
          .duration(500)
          .style("opacity", 1);
      });
    });

    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - 200}, ${height - 80})`);

    // Legend background
    legend.append("rect")
      .attr("width", 180)
      .attr("height", 70)
      .attr("fill", "white")
      .attr("opacity", 0.8)
      .attr("rx", 5);

    // Legend title
    legend.append("text")
      .attr("x", 10)
      .attr("y", 20)
      .text("Shipping Routes")
      .style("font-weight", "bold");

    // Legend items
    shippingRoutes.forEach((route, i) => {
      // Line
      legend.append("line")
        .attr("x1", 10)
        .attr("y1", 35 + i * 20)
        .attr("x2", 40)
        .attr("y2", 35 + i * 20)
        .attr("stroke", route.color)
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", route.dasharray || "none");

      // Text
      legend.append("text")
        .attr("x", 50)
        .attr("y", 40 + i * 20)
        .text(route.name)
        .style("font-size", "12px");
    });
    
    // Error handling removed since we're not using asynchronous data loading anymore

    return () => {
      // Cleanup
    };
  }, []);

  // We're now using the Leaflet map component for NYC visualization
  // No need for D3.js code here as we're using the React Leaflet component

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-matcha-light text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-gray-100 bg-cover bg-center"></div>
        <div className="container-custom relative z-10 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="heading-1 mb-6">The Global Journey of Matcha</h1>
            <p className="body-text mb-8 text-white">
              Trace matcha&apos;s fascinating path from Japanese temples to American cafes, 
              and explore how this vibrant green powder transformed across cultures and continents.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Global Map Visualization Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-black">Mapping Matcha&apos;s Global Journey</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-800">
              Visualize the geographical and cultural transformation of matcha as it traveled 
              from its origins in Japan to its new home in American markets.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-cream p-6 rounded-lg shadow-md mb-8"
          >
            <div ref={globalMapRef} className="w-full h-[500px] bg-white rounded-lg">
              <div className="h-full w-full flex items-center justify-center">
                <p className="text-gray-500">Loading global shipping routes visualization...</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 italic text-center">
              Interactive map showing traditional and modern shipping routes of matcha from Japan to America
            </p>
          </motion.div>
        </div>
      </section>

      {/* NYC Matcha Shops Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-green-800 mb-4">New York City: America&apos;s Matcha Capital</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Discover the top matcha cafes and shops across New York City, where matcha culture has
              flourished and transformed into a uniquely American experience.
            </p>
          </motion.div>

          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="h-[500px] w-full bg-gray-100 rounded-lg overflow-hidden">
                {/* The component accepts matchaShops prop */}
                <NYCLeafletMap matchaShops={matchaShops} />
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-4 text-black">The Instagram Effect</h3>
              <p className="text-gray-900 mb-4">
                Social media, particularly Instagram, has played a crucial role in matcha&apos;s popularity in NYC. 
                The vibrant green color and photogenic presentation of matcha drinks and desserts have made them 
                social media favorites.
              </p>
              <p className="text-gray-800">
                Many NYC matcha establishments have designed their spaces and products specifically with 
                &quot;Instagrammability&quot; in mind, creating a feedback loop where social media visibility drives 
                foot traffic, which in turn generates more social media content.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Historical Timeline Section */}
      <section className="section bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-black">Matcha&apos;s Historical Timeline</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-800">
              From ancient Chinese origins to modern American cafes, explore the key moments in matcha&apos;s global journey.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-matcha-medium"></div>

            {/* Timeline events */}
            <TimelineEvent 
              year="8th Century"
              title="Chinese Origins"
              description="Tang Dynasty China sees the development of powdered tea, the precursor to matcha."
              align="left"
              delay={0.1}
            />

            <TimelineEvent 
              year="1191"
              title="Introduction to Japan"
              description="Zen monk Eisai brings tea seeds and the method for preparing powdered tea from China to Japan."
              align="right"
              delay={0.3}
            />

            <TimelineEvent 
              year="16th Century"
              title="Tea Ceremony Formalization"
              description="Sen no Rikyu perfects the Japanese tea ceremony (chanoyu), elevating matcha to cultural prominence."
              align="left"
              delay={0.5}
            />

            <TimelineEvent 
              year="1900s"
              title="Early Western Exposure"
              description="Japanese immigrants bring matcha to Hawaii and the West Coast of the United States."
              align="right"
              delay={0.7}
            />

            <TimelineEvent 
              year="1990s"
              title="Initial Specialty Market"
              description="Matcha begins appearing in specialty tea shops and Japanese restaurants in major US cities."
              align="left"
              delay={0.9}
            />

            <TimelineEvent 
              year="2000s"
              title="Starbucks Introduction"
              description="Major chains like Starbucks introduce matcha lattes, significantly increasing American exposure."
              align="right"
              delay={1.1}
            />

            <TimelineEvent 
              year="2010s"
              title="Instagram Era"
              description="Social media platforms help transform matcha into a photogenic status symbol and wellness trend."
              align="left"
              delay={1.3}
            />

            <TimelineEvent 
              year="Present Day"
              title="Mainstream Adoption"
              description="Matcha has become fully integrated into American food culture, appearing in everything from lattes to desserts to face masks."
              align="right"
              delay={1.5}
            />
          </div>
        </div>
      </section>

      {/* Cultural Transformation Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-black">Cultural Transformation</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-800">
              As matcha traveled across oceans, its meaning, preparation, and cultural context underwent significant changes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-matcha-powder/20 p-8 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-6 border-b border-matcha-dark pb-2 text-black">Shifting Cultural Context</h3>
              <p className="mb-4 text-gray-900">
                In its journey from Japan to America, matcha underwent a profound transformation in cultural meaning. 
                What was once a sacred element of Zen Buddhist practice and Japanese identity became reframed as a 
                trendy superfood and aesthetic product.
              </p>
              <p className="mb-4 text-gray-900">
                This shift represents a form of cultural appropriation where matcha has been largely divorced from its 
                spiritual and ceremonial context. The American market has emphasized matcha&apos;s health benefits and visual 
                appeal while often overlooking its deep cultural significance.
              </p>
              <p className="text-gray-900">
                However, this transformation isn&apos;t simply a story of loss. It also demonstrates how cultural elements 
                evolve and find new meaning when they cross borders, creating hybrid forms that reflect both their origins 
                and their new environments.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-matcha-powder/20 p-8 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-6 border-b border-matcha-dark pb-2 text-black">Changing Preparation Methods</h3>
              <p className="mb-4 text-gray-900">
                Traditional Japanese matcha preparation involves specific tools (chasen, chawan, chashaku) and precise 
                movements that have been refined over centuries. The process itself is considered a meditative practice 
                and an art form.
              </p>
              <p className="mb-4 text-gray-900">
                In contrast, American matcha preparation typically prioritizes convenience and flavor modification. 
                Electric frothers replace bamboo whisks, and matcha is commonly mixed with milk, sweeteners, and other 
                additives to appeal to Western palates.
              </p>
              <p className="text-gray-900">
                This transformation in preparation methods reflects broader cultural differences in how food and drink 
                are valued—with Japanese tradition emphasizing process and mindfulness, while American approaches often 
                focus on efficiency and customization.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Trade Section */}
      <section className="section bg-matcha-powder/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-black">The Economics of Global Matcha Trade</h2>
            <p className="body-text max-w-3xl mx-auto text-white">
              Matcha&apos;s journey represents more than cultural exchange—it&apos;s also a story of global commerce and economic transformation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TradeCard 
              title="Production Challenges"
              description="As global demand increases, traditional Japanese matcha producers face pressure to scale up production while maintaining quality standards. This has led to tensions between tradition and commercialization."
              icon="🌱"
              delay={0.1}
            />
            <TradeCard 
              title="Quality Spectrum"
              description="The global market has created a wide spectrum of matcha quality, from premium ceremonial grades to lower-quality culinary grades, with significant price and quality differences often not understood by Western consumers."
              icon="⭐"
              delay={0.3}
            />
            <TradeCard 
              title="Market Expansion"
              description="Beyond beverages, matcha has expanded into diverse product categories including desserts, skincare, and even household goods, creating new economic opportunities across multiple industries."
              icon="📈"
              delay={0.5}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-900">Did You Know?</h3>
            <p className="body-text text-gray-800">
              Japan exports only about 5% of its matcha production. The highest quality matcha rarely leaves Japan, 
              with most exported matcha being lower culinary grades. This has created a significant quality gap 
              between what Japanese consumers experience as authentic matcha and what most American consumers encounter.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Geographic Origins & Terroir Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-black">The Terroir of Japanese Matcha</h2>
            <p className="body-text max-w-3xl mx-auto text-gray-800">
              Just like fine wine, authentic matcha&apos;s character is deeply influenced by its region of origin. These distinct growing regions impart unique qualities to the tea leaves through their specific climate, soil, and traditional processing methods.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md border border-matcha-light/20"
            >
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <div className="w-full h-full bg-matcha-medium bg-cover bg-center"></div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">Uji Region</h3>
              <p className="text-gray-900 mb-4">&quot;As matcha&#39;s appeal rises, health-conscious millennials and Gen Z consumers view it as both a healthier alternative to coffee and a symbol of mindfulness.&quot;</p>
              <p className="text-gray-900 mb-4">
                Considered the birthplace of Japanese tea culture, Uji (near Kyoto) is the most prestigious matcha-producing region with a 800-year history. Sheltered by mountains and blessed with morning mists and mineral-rich soil.
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-matcha-dark mr-2"></span>
                  <span className="text-sm text-black">Distinctive sweet aroma</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-matcha-dark mr-2"></span>
                  <span className="text-sm text-black">Rich umami flavor</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-matcha-dark mr-2"></span>
                  <span className="text-sm text-black">Vibrant emerald color</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md border border-matcha-light/20"
            >
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <div className="w-full h-full bg-matcha-light bg-cover bg-center"></div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">Nishio Region</h3>
              <p className="text-gray-900 mb-4">
                Located in Aichi Prefecture, Nishio is Japan&apos;s largest matcha producer. The region benefits from abundant rainfall, moderate temperatures, and nutrient-rich soil from the Yahagi River.
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-matcha-medium mr-2"></span>
                  <span className="text-sm text-black">Mild, balanced flavor profile</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-matcha-medium mr-2"></span>
                  <span className="text-sm text-black">Smooth texture</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-matcha-medium mr-2"></span>
                  <span className="text-sm text-black">Slightly sweet finish</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md border border-matcha-light/20"
            >
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <div className="w-full h-full bg-matcha-dark bg-cover bg-center"></div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">Yame Region</h3>
              <p className="text-gray-900 mb-4">
                Located in Fukuoka Prefecture, Yame has been producing tea since the 1400s. The region&apos;s mountainous terrain creates significant temperature differences between day and night, ideal for developing complex flavors.
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-matcha-light mr-2"></span>
                  <span className="text-sm text-black">Deep, complex flavor</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-matcha-light mr-2"></span>
                  <span className="text-sm text-black">Less astringency</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 rounded-full bg-matcha-light mr-2"></span>
                  <span className="text-sm text-black">Distinctive floral notes</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center p-6 bg-cream rounded-lg shadow-md mb-8"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-900">Regional Influence on Matcha Quality</h3>
            <p className="text-lg text-gray-800 mb-4">
              In Japan, the region of origin is considered one of the most important factors in matcha quality evaluation, comparable to the concept of &quot;terroir&quot; in wine. Most premium matcha sold in America comes from these three key regions, though this information is often omitted in marketing materials that focus on broad terms like &quot;ceremonial grade.&quot;
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="section bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/tradition" className="block">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="bg-matcha-dark text-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-3">← Japanese Tradition</h3>
                <p className="text-white">Explore matcha&apos;s sacred roots in Japanese culture and tea ceremony.</p>
              </motion.div>
            </Link>
            
            <Link href="/commodification" className="block">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="bg-matcha-medium text-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold mb-3">American Commodification →</h3>
                <p className="text-white">See how matcha has been transformed into a trendy superfood in American culture.</p>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Component for Timeline Events
const TimelineEvent = ({ year, title, description, align, delay }: TimelineEventProps) => (
  <motion.div
    initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className={`relative mb-12 ${align === 'left' ? 'md:pr-12 md:text-right' : 'md:pl-12'} md:w-1/2 ${align === 'left' ? 'md:ml-0 md:mr-auto' : 'md:mr-0 md:ml-auto'}`}
  >
    <div className={`md:absolute ${align === 'left' ? 'md:right-0' : 'md:left-0'} md:transform md:translate-x-1/2 top-0 bg-matcha-dark text-white py-2 px-4 rounded-md shadow-md`}>
      <span className="font-bold">{year}</span>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md mt-8 md:mt-0">
      <h3 className="text-lg font-bold mb-2 text-black">{title}</h3>
      <p className="text-gray-900">{description}</p>
    </div>
    <div className={`absolute top-6 ${align === 'left' ? 'right-0 md:-right-4' : 'left-0 md:-left-4'} transform translate-x-1/2 md:translate-x-0 w-8 h-8 bg-matcha-medium rounded-full border-4 border-white z-10 hidden md:block`}></div>
  </motion.div>
);

// Component for Trade Cards
const TradeCard = ({ title, description, icon, delay }: TradeCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-lg shadow-md"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-black">{title}</h3>
    <p className="text-gray-900">{description}</p>
  </motion.div>
);
