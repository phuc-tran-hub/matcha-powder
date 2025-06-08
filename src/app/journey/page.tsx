'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { Citation, InlineCitation, Bibliography } from '../../components/Citation';
import { getJourneyPageSources } from '../../data/bibliography';
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
  sourceNumber?: number;
}

interface TradeCardProps {
  title: string;
  description: string;
  icon: string;
  delay: number;
  sourceNumber?: number;
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

  // Global map visualization with real world data
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

    // Create a natural earth projection optimized for Pacific Ocean visibility
    const projection = d3.geoNaturalEarth1()
      .scale(width / 6.5)
      .translate([width / 2, height / 2])
      .rotate([-10, 0, 0]); // Slight rotation to better center Pacific

    // Create path generator
    const path = d3.geoPath().projection(projection);

    // Define key locations with accurate coordinates
    const locations = {
      uji: [135.8048, 34.8841], // Uji, Japan (matcha birthplace)
      tokyo: [139.6917, 35.6895], // Tokyo Port
      osaka: [135.5023, 34.6937], // Osaka Port
      sanFrancisco: [-122.4194, 37.7749], // San Francisco
      losAngeles: [-118.2437, 34.0522], // Los Angeles Port
      newYork: [-74.0060, 40.7128], // New York Port
      vancouver: [-123.1207, 49.2827] // Vancouver (alternative route)
    };

    // Function to convert lat/lng to SVG coordinates
    const project = (coordinates: [number, number]) => {
      const projected = projection(coordinates);
      return projected || [0, 0];
    };

    // Load world map data from unpkg CDN (world-atlas TopoJSON)
    const loadWorldMap = async () => {
      try {
        // Load world boundaries from unpkg CDN
        const worldData = await d3.json("https://unpkg.com/world-atlas@2.0.2/countries-110m.json");
        
        if (!worldData) {
          console.error("Failed to load world map data");
          return;
        }

        // Convert TopoJSON to GeoJSON
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const countries = feature(worldData as any, (worldData as any).objects.countries) as any;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const land = feature(worldData as any, (worldData as any).objects.land) as any;

        // Create clipping path to constrain map to visible area
        svg.append("defs")
          .append("clipPath")
          .attr("id", "map-clip")
          .append("rect")
          .attr("width", width)
          .attr("height", height);

        // Create main map group with clipping
        const mapGroup = svg.append("g")
          .attr("clip-path", "url(#map-clip)");

        // Draw ocean background
        mapGroup.append("rect")
          .attr("width", width)
          .attr("height", height)
          .attr("fill", "#a8dadc")
          .attr("opacity", 0.3);

        // Draw land masses
        mapGroup.append("g")
          .selectAll("path")
          .data(land.features)
          .enter()
          .append("path")
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .attr("d", path as any)
          .attr("fill", "#d4c5b9")
          .attr("stroke", "#fff")
          .attr("stroke-width", 0.5)
          .attr("opacity", 0.8);

        // Draw country boundaries
        mapGroup.append("g")
          .selectAll("path")
          .data(countries.features)
          .enter()
          .append("path")
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .attr("d", path as any)
          .attr("fill", "none")
          .attr("stroke", "#999")
          .attr("stroke-width", 0.3)
          .attr("opacity", 0.6);

        // Highlight Japan and USA
        mapGroup.append("g")
          .selectAll("path")
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .data(countries.features.filter((d: any) => d.properties.NAME === "Japan" || d.properties.NAME === "United States of America"))
          .enter()
          .append("path")
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .attr("d", path as any)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .attr("fill", (d: any) => d.properties.NAME === "Japan" ? "#4b830d" : "#8bc34a")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1)
          .attr("opacity", 0.8);

        // Define authentic shipping and flight routes
        const routes = [
          {
            name: "Traditional Tea Ship Route (1800s-1950s)",
            type: "ship",
            path: [locations.uji, locations.osaka, locations.sanFrancisco, locations.newYork],
            color: "#8d6e63", // tea brown
            dasharray: "8,4",
            description: "Traditional sea route via Pacific shipping lanes"
          },
          {
            name: "Modern Container Shipping",
            type: "ship", 
            path: [locations.tokyo, locations.losAngeles, locations.newYork],
            color: "#4b830d", // matcha dark
            dasharray: "none",
            description: "Primary commercial route for matcha imports"
          },
          {
            name: "Direct Air Cargo Route",
            type: "air",
            path: [locations.tokyo, locations.newYork],
            color: "#2196f3", // blue
            dasharray: "4,2",
            description: "High-value matcha air freight route"
          },
          {
            name: "Pacific Northwest Route",
            type: "ship",
            path: [locations.tokyo, locations.vancouver, locations.newYork],
            color: "#ff9800", // orange
            dasharray: "6,3",
            description: "Alternative shipping via Canadian ports"
          }
        ];

        // Create great circle paths for more accurate route visualization
        const generateGreatCirclePath = (start: [number, number], end: [number, number]) => {
          const line = d3.geoInterpolate(start, end);
          const points = [];
          for (let i = 0; i <= 50; i++) {
            points.push(line(i / 50));
          }
          return points;
        };

        // Draw routes with realistic great circle paths
        routes.forEach((route, routeIndex) => {
          for (let i = 0; i < route.path.length - 1; i++) {
            const start = route.path[i] as [number, number];
            const end = route.path[i + 1] as [number, number];
            const pathPoints = generateGreatCirclePath(start, end);
            
            // Create path string
            const pathData = "M" + pathPoints.map(point => project(point).join(",")).join("L");
            
            // Draw the route path
            const routePath = mapGroup.append("path")
              .attr("d", pathData)
              .attr("fill", "none")
              .attr("stroke", route.color)
              .attr("stroke-width", 3)
              .attr("stroke-dasharray", route.dasharray)
              .attr("opacity", 0.9);

            // Animate the path drawing
            const pathLength = routePath.node()?.getTotalLength() || 0;
            routePath
              .attr("stroke-dasharray", `${pathLength} ${pathLength}`)
              .attr("stroke-dashoffset", pathLength)
              .transition()
              .duration(3000)
              .delay(routeIndex * 800 + i * 400)
              .attr("stroke-dashoffset", 0)
              .attr("stroke-dasharray", route.dasharray);

            // Add route markers for ships/planes
            if (i === 0) {
              const icon = route.type === "air" ? "✈️" : "🚢";
              const [x, y] = project(start);
              
              mapGroup.append("text")
                .attr("x", x)
                .attr("y", y)
                .attr("text-anchor", "middle")
                .attr("font-size", "18px")
                .style("opacity", 0)
                .text(icon)
                .transition()
                .delay(routeIndex * 800 + 2000)
                .duration(500)
                .style("opacity", 1);
            }
          }
        });

        // Add location markers and labels
        Object.entries(locations).forEach(([name, coords], index) => {
          const [x, y] = project(coords as [number, number]);
          
          // Add location dot with glow effect
          mapGroup.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 0)
            .attr("fill", name.includes("uji") || name.includes("tokyo") || name.includes("osaka") ? "#4b830d" : "#ff5722")
            .attr("stroke", "#fff")
            .attr("stroke-width", 2)
            .style("filter", "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))")
            .transition()
            .delay(index * 200 + 1000)
            .duration(400)
            .attr("r", name === "uji" ? 10 : 6); // Emphasize Uji as the origin

          // Add location label with background
          const displayName = name === "uji" ? "Uji (Matcha Origin)" : 
                             name === "tokyo" ? "Tokyo" :
                             name === "osaka" ? "Osaka" :
                             name === "sanFrancisco" ? "San Francisco" :
                             name === "losAngeles" ? "Los Angeles" :
                             name === "newYork" ? "New York" :
                             name === "vancouver" ? "Vancouver" : name;
          
          // Label background
          const labelBg = mapGroup.append("rect")
            .attr("x", x - displayName.length * 3)
            .attr("y", y - 25)
            .attr("width", displayName.length * 6)
            .attr("height", 16)
            .attr("fill", "white")
            .attr("opacity", 0.8)
            .attr("rx", 3)
            .style("opacity", 0);

          // Label text
          const labelText = mapGroup.append("text")
            .attr("x", x)
            .attr("y", y - 15)
            .attr("text-anchor", "middle")
            .style("font-size", name === "uji" ? "13px" : "11px")
            .style("font-weight", name === "uji" ? "bold" : "normal")
            .style("fill", "#333")
            .style("opacity", 0)
            .text(displayName);

          // Animate labels
          labelBg.transition()
            .delay(index * 200 + 1500)
            .duration(400)
            .style("opacity", 0.8);

          labelText.transition()
            .delay(index * 200 + 1500)
            .duration(400)
            .style("opacity", 1);
        });

        // Enhanced legend with route types - positioned at bottom right
        const legendWidth = 320;
        const legendHeight = routes.length * 32 + 50;
        const legendX = width - legendWidth - 15;
        const legendY = height - legendHeight - 15;
        
        const legend = svg.append("g")
          .attr("transform", `translate(${legendX}, ${legendY})`);

        // Legend background with border fitting
        legend.append("rect")
          .attr("width", legendWidth)
          .attr("height", legendHeight)
          .attr("fill", "white")
          .attr("opacity", 0.95)
          .attr("rx", 8)
          .attr("stroke", "#ddd")
          .attr("stroke-width", 1)
          .style("filter", "drop-shadow(2px 2px 8px rgba(0,0,0,0.1))");

        // Legend title
        legend.append("text")
          .attr("x", 15)
          .attr("y", 22)
          .text("Matcha Transportation Routes")
          .style("font-weight", "bold")
          .style("font-size", "14px")
          .style("fill", "#333");

        // Legend items with proper spacing for longer text
        routes.forEach((route, i) => {
          const y = 45 + i * 32;
          
          // Route line sample
          legend.append("line")
            .attr("x1", 15)
            .attr("y1", y)
            .attr("x2", 40)
            .attr("y2", y)
            .attr("stroke", route.color)
            .attr("stroke-width", 3)
            .attr("stroke-dasharray", route.dasharray);

          // Route type icon
          const icon = route.type === "air" ? "✈️" : "🚢";
          legend.append("text")
            .attr("x", 50)
            .attr("y", y + 5)
            .attr("font-size", "14px")
            .text(icon);

          // Route name with text wrapping for long names
          const routeName = route.name;
          if (routeName.length > 25) {
            // Split long route names into two lines
            const words = routeName.split(' ');
            const midPoint = Math.ceil(words.length / 2);
            const line1 = words.slice(0, midPoint).join(' ');
            const line2 = words.slice(midPoint).join(' ');
            
            legend.append("text")
              .attr("x", 75)
              .attr("y", y - 2)
              .text(line1)
              .style("font-size", "11px")
              .style("fill", "#333");
              
            legend.append("text")
              .attr("x", 75)
              .attr("y", y + 12)
              .text(line2)
              .style("font-size", "11px")
              .style("fill", "#333");
          } else {
            legend.append("text")
              .attr("x", 75)
              .attr("y", y + 4)
              .text(routeName)
              .style("font-size", "11px")
              .style("fill", "#333");
          }
        });

        // Add border around the entire map
        svg.append("rect")
          .attr("width", width)
          .attr("height", height)
          .attr("fill", "none")
          .attr("stroke", "#999")
          .attr("stroke-width", 1)
          .attr("rx", 8);

      } catch (error) {
        console.error("Error loading world map:", error);
        
        // Fallback to simplified visualization if world map fails to load
        svg.append("rect")
          .attr("width", width)
          .attr("height", height)
          .attr("fill", "#f0f8ff")
          .attr("opacity", 0.5);

        svg.append("text")
          .attr("x", width / 2)
          .attr("y", height / 2)
          .attr("text-anchor", "middle")
          .style("font-size", "16px")
          .style("fill", "#666")
          .text("Loading world map...");
      }
    };

    // Load the world map
    loadWorldMap();

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
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1694825173868-ed003c071068?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
          }}
        ></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-matcha-dark/80 to-matcha-medium/75"></div>
        <div className="container-custom relative z-20 py-16 md:py-24">
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
            viewport={{ once: false }}
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
            viewport={{ once: false }}
            className="bg-cream p-6 rounded-lg shadow-md mb-8"
          >
            <div ref={globalMapRef} className="w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden">
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
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-green-800 mb-4">New York City: America&apos;s Matcha Capital</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Discover the top matcha cafes and shops across New York City, where matcha culture has
              flourished and transformed into a uniquely American experience<InlineCitation sourceNumber={13} />.
            </p>
          </motion.div>

          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              <div className="h-[500px] w-full bg-gray-100 rounded-lg overflow-hidden">
                {/* The component accepts matchaShops prop */}
                <NYCLeafletMap matchaShops={matchaShops} />
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              className="bg-white p-6 rounded-lg shadow-md max-w-2xl"
            >
              <h3 className="text-xl font-bold mb-4 text-black">The Instagram Effect</h3>
              <p className="text-gray-900 mb-4">
                Social media, particularly Instagram, has played a crucial role in matcha&apos;s popularity in NYC<InlineCitation sourceNumber={13} />. 
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
            viewport={{ once: false }}
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
              sourceNumber={6}
              align="left"
              delay={0.1}
            />

            <TimelineEvent 
              year="1191"
              title="Introduction to Japan"
              description="Zen monk Eisai brings tea seeds and the method for preparing powdered tea from China to Japan."
              sourceNumber={6}
              align="right"
              delay={0.3}
            />

            <TimelineEvent 
              year="16th Century"
              title="Tea Ceremony Formalization"
              description="Sen no Rikyu perfects the Japanese tea ceremony (chanoyu), elevating matcha to cultural prominence."
              sourceNumber={2}
              align="left"
              delay={0.5}
            />

            <TimelineEvent 
              year="1900s"
              title="Early Western Exposure"
              description="Japanese immigrants bring matcha to Hawaii and the West Coast of the United States."
              sourceNumber={13}
              align="right"
              delay={0.7}
            />

            <TimelineEvent 
              year="1990s"
              title="Initial Specialty Market"
              description="Matcha begins appearing in specialty tea shops and Japanese restaurants in major US cities."
              sourceNumber={13}
              align="left"
              delay={0.9}
            />

            <TimelineEvent 
              year="2000s"
              title="Starbucks Introduction"
              description="Major chains like Starbucks introduce matcha lattes, significantly increasing American exposure."
              sourceNumber={13}
              align="right"
              delay={1.1}
            />

            <TimelineEvent 
              year="2010s"
              title="Instagram Era"
              description="Social media platforms help transform matcha into a photogenic status symbol and wellness trend."
              sourceNumber={13}
              align="left"
              delay={1.3}
            />

            <TimelineEvent 
              year="Present Day"
              title="Mainstream Adoption"
              description="Matcha has become fully integrated into American food culture, appearing in everything from lattes to desserts to face masks."
              sourceNumber={18}
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
            viewport={{ once: false }}
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
              viewport={{ once: false }}
              className="bg-matcha-powder/20 p-8 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-6 border-b border-matcha-dark pb-2 text-black">Shifting Cultural Context</h3>
              <p className="mb-4 text-gray-900">
                In its journey from Japan to America, matcha underwent a profound transformation in cultural meaning<InlineCitation sourceNumber={1} />. 
                What was once a sacred element of Zen Buddhist practice and Japanese identity became reframed as a 
                trendy superfood and aesthetic product<Citation sources={[1, 4]} />.
              </p>
              <p className="mb-4 text-gray-900">
                This shift represents a form of cultural appropriation where matcha has been largely divorced from its 
                spiritual and ceremonial context<InlineCitation sourceNumber={1} />. The American market has emphasized matcha&apos;s health benefits and visual 
                appeal while often overlooking its deep cultural significance<Citation sources={[1, 13]} />.
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
              viewport={{ once: false }}
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
            viewport={{ once: false }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4 text-white">The Economics of Global Matcha Trade</h2>
            <p className="body-text max-w-3xl mx-auto text-white">
              Matcha&apos;s journey represents more than cultural exchange—it&apos;s also a story of global commerce and economic transformation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TradeCard 
              title="Production Challenges"
              description="As global demand increases, traditional Japanese matcha producers face pressure to scale up production while maintaining quality standards. This has led to tensions between tradition and commercialization."
              sourceNumber={11}
              icon="🌱"
              delay={0.1}
            />
            <TradeCard 
              title="Quality Spectrum"
              description="The global market has created a wide spectrum of matcha quality, from premium ceremonial grades to lower-quality culinary grades, with significant price and quality differences often not understood by Western consumers."
              sourceNumber={11}
              icon="⭐"
              delay={0.3}
            />
            <TradeCard 
              title="Market Expansion"
              description="Beyond beverages, matcha has expanded into diverse product categories including desserts, skincare, and even household goods, creating new economic opportunities across multiple industries."
              sourceNumber={18}
              icon="📈"
              delay={0.5}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
            className="mt-12 bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-900">Did You Know?</h3>
            <p className="body-text text-gray-800">
              Japan exports only about 5% of its matcha production<InlineCitation sourceNumber={11} />. The highest quality matcha rarely leaves Japan, 
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
            viewport={{ once: false }}
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
              viewport={{ once: false }}
              className="bg-white p-6 rounded-lg shadow-md border border-matcha-light/20"
            >
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://matchadirect.kyoto/cdn/shop/articles/28.jpg?v=1690696619)'
                  }}
                ></div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">Uji Region</h3>
              <p className="text-gray-900 mb-4">&quot;As matcha&#39;s appeal rises, health-conscious millennials and Gen Z consumers view it as both a healthier alternative to coffee and a symbol of mindfulness.&quot;<InlineCitation sourceNumber={13} /></p>
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
              viewport={{ once: false }}
              className="bg-white p-6 rounded-lg shadow-md border border-matcha-light/20"
            >
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://travel.rakuten.com/contents/sites/contents/files/styles/max_1300x1300/public/2025-03/nishio-city-guide_6.jpg?itok=9HOAmi6w)'
                  }}
                ></div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">Nishio Region</h3>
              <p className="text-gray-900 mb-4">
                Located in Aichi Prefecture, Nishio is Japan&apos;s largest matcha producer<InlineCitation sourceNumber={14} />. The region benefits from abundant rainfall, moderate temperatures, and nutrient-rich soil from the Yahagi River.
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
              viewport={{ once: false }}
              className="bg-white p-6 rounded-lg shadow-md border border-matcha-light/20"
            >
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(https://i0.wp.com/www.fukuoka-now.com/wp-content/uploads/2020/02/fukuoka-now-WEB-001-2-4.jpg?w=1400&ssl=1)'
                  }}
                ></div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-black">Yame Region</h3>
              <p className="text-gray-900 mb-4">
                Located in Fukuoka Prefecture, Yame has been producing tea since the 1400s<InlineCitation sourceNumber={6} />. The region&apos;s mountainous terrain creates significant temperature differences between day and night, ideal for developing complex flavors.
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
            viewport={{ once: false }}
            className="text-center p-6 bg-matcha-powder/20 rounded-lg shadow-md mb-8"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-900">Regional Influence on Matcha Quality</h3>
            <p className="text-lg text-gray-800 mb-4">
              In Japan, the region of origin is considered one of the most important factors in matcha quality evaluation, comparable to the concept of &quot;terroir&quot; in wine<InlineCitation sourceNumber={14} />. Most premium matcha sold in America comes from these three key regions, though this information is often omitted in marketing materials that focus on broad terms like &quot;ceremonial grade.&quot;
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bibliography Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <Bibliography sources={getJourneyPageSources()} />
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
const TimelineEvent = ({ year, title, description, align, delay, sourceNumber }: TimelineEventProps) => (
  <motion.div
    initial={{ opacity: 0, x: align === 'left' ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: false }}
    className={`relative mb-12 ${align === 'left' ? 'md:pr-12 md:text-right' : 'md:pl-12'} md:w-1/2 ${align === 'left' ? 'md:ml-0 md:mr-auto' : 'md:mr-0 md:ml-auto'}`}
  >
    <div className={`md:absolute ${align === 'left' ? 'md:-right-4' : 'md:-left-4'} md:transform ${align === 'left' ? 'md:translate-x-full' : 'md:-translate-x-full'} top-0 bg-matcha-dark text-white py-2 px-4 rounded-md shadow-md`}>
      <span className="font-bold">{year}</span>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md mt-8 md:mt-0">
      <h3 className="text-lg font-bold mb-2 text-black">{title}</h3>
      <p className="text-gray-900">
        {description}
        {sourceNumber && <InlineCitation sourceNumber={sourceNumber} />}
      </p>
    </div>
  </motion.div>
);

// Component for Trade Cards
const TradeCard = ({ title, description, icon, delay, sourceNumber }: TradeCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: false }}
    className="bg-white p-6 rounded-lg shadow-md"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-3 text-black">{title}</h3>
    <p className="text-gray-900">
      {description}
      {sourceNumber && <InlineCitation sourceNumber={sourceNumber} />}
    </p>
  </motion.div>
);
