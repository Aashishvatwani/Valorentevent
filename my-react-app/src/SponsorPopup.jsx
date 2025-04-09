import React, { useEffect, useState } from 'react';

// 🖼️ Sponsor data
const sponsors = [
  {
    name: 'Startup Alpha',
    description: 'AI-powered tools transforming business automation.',
    logo: 'https://via.placeholder.com/64?text=A',
    url: 'https://startup-alpha.com',
  },
  {
    name: 'BetaTech',
    description: 'Empowering communities with affordable tech solutions.',
    logo: 'https://via.placeholder.com/64?text=B',
    url: 'https://betatech.io',
  },
  {
    name: 'GammaGo',
    description: 'Innovating logistics with smart tracking.',
    logo: 'https://via.placeholder.com/64?text=G',
    url: 'https://gammago.com',
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
    <div className="fixed bottom-5 left-5 z-50">
      <div
        className={`transition-all duration-500 transform ${
          visible ? 'translate-x-0 opacity-100 animate-bounce' : '-translate-x-20 opacity-0'
        } bg-white border shadow-lg rounded-xl p-4 w-80 relative`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
        >
          &times;
        </button>

        <img
          src={sponsor.logo}
          alt={`${sponsor.name} logo`}
          className="w-16 h-16 mx-auto mb-3 object-contain"
        />

        <h2 className="text-lg font-semibold mb-2 text-center">🚀 {sponsor.name}</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">{sponsor.description}</p>

        <button
          onClick={handleRedirect}
          className="bg-blue-600 text-white py-1.5 px-4 rounded hover:bg-blue-700 text-sm block mx-auto"
        >
          Visit Sponsor
        </button>
      </div>
    </div>
  );
};

export default SponsorPopupCarousel;
