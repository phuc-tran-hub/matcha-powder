import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-matcha-deep text-white py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Matcha Journey</h3>
            <p className="text-matcha-light">
              Exploring the cultural journey of matcha powder from its Japanese origins to its 
              commodification in American markets.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-cream transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/journey" className="hover:text-cream transition-colors">
                  The Journey
                </Link>
              </li>
              <li>
                <Link href="/tradition" className="hover:text-cream transition-colors">
                  Japanese Tradition
                </Link>
              </li>
              <li>
                <Link href="/commodification" className="hover:text-cream transition-colors">
                  American Commodification
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cream transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">References</h3>
            <p className="text-matcha-light mb-2">
              This website is based on academic research about matcha's cultural significance
              and its global trajectory.
            </p>
            <Link 
              href="/about#references" 
              className="inline-block text-cream hover:underline transition-colors"
            >
              View Sources
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-matcha-medium text-center">
          <p>© {currentYear} Matcha Journey. Created for educational purposes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
