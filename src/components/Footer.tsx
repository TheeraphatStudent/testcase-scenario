import React, { useEffect, useState } from 'react';

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // console.log(documentHeight - scrollPosition)
    
      if (documentHeight - scrollPosition <= 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-fit">
      <div 
        className={`fixed bottom-0 w-full bg-gray-900 text-white transition-transform duration-500 ease-in-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TCM</h3>
              <p className="text-gray-300">
              An testcase management service
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <a className='underline' href="https://github.com/TheeraphatStudent" target="_blank" rel="noopener noreferrer"> &copy; {new Date().getFullYear()} Theeraphat Student. All rights reserved.</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
