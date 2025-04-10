import React, { useEffect, useState } from 'react';
import sponsor2 from './image2.jpg'; // Ensure the path is correct
import sponsor3 from './image3.png'; // Ensure the path is correct
const sponsors = [
  {
    name: 'Quadropic',
    description: 'We create the best Agents to automate the work.',
    logo: 'https://github.com/QuadropicHQ/web-assets/blob/main/quadropicdotcom-images/full_res_squircle_logo.png?raw=true',
    url: 'http://quadropic.com',
  },
  {
    name: 'Note in Diary',
    description: 'Empowering Inner Growth Through Psychology and Self-Discovery.',
    logo: sponsor2,
    url: 'https://www.instagram.com/noteindiary?igsh=cXc1NjB6YndzN29k',
  },
  {
    name: 'Torus Solution',
    description: 'Binding to Software Commitments',
    logo: sponsor3,
    url: 'https://cptorus.in/',
  },
];

const SponsorPopupCarousel = ({ onClose }) => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setVisible(true);

    const switchTimer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === sponsors.length - 1) {
          clearInterval(switchTimer);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 500);
          }, 4000);
          return prev;
        }
        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(switchTimer);
  }, [onClose]);

  const handleRedirect = () => {
    window.open(sponsors[currentIndex].url, '_blank');
  };

  const sponsor = sponsors[currentIndex];

  return (
    <div className="fixed bottom-3 left-3 sm:bottom-5 sm:left-5 z-50">
      <div
        onClick={handleRedirect}
        className={`transition-all duration-500 transform cursor-pointer ${
          visible ? 'translate-x-0 opacity-100 animate-bounce' : '-translate-x-20 opacity-0'
        } 
        bg-gradient-to-br from-gray-900 via-red-900 to-black border border-red-800 shadow-2xl rounded-xl 
        p-3 sm:p-4 w-[16rem] sm:w-[18rem] md:w-[20rem] lg:w-80 relative text-white max-w-[90vw]`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent redirect on close click
            onClose();
          }}
          className="absolute top-2 right-2 text-white hover:text-red-300 text-xl font-bold"
        >
          &times;
        </button>

        <img
          src={sponsor.logo}
          alt={`${sponsor.name} logo`}
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 object-cover rounded-full border-2 border-red-500"
        />

        <h2 className="text-base sm:text-lg font-semibold mb-2 text-center">{sponsor.name}</h2>
        <p className="text-xs sm:text-sm text-gray-200 text-center">{sponsor.description}</p>
      </div>
    </div>
  );
};

export default SponsorPopupCarousel;
