import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import sponsor2 from './image2.jpg';
import sponsor1 from './image1.jpg'; // Import your image here
import sponsor3 from './image3.png'; // Import your image here
const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.elements[0].value, // Uppercase NAME
      email: e.target.elements[1].value, // Uppercase GMAIL
      message: e.target.elements[2].value, // Uppercase MESSAGE
    };
  
    console.log("Form Data:", formData); //log the form data.
  
    const queryString = new URLSearchParams(formData).toString();
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz_euJxhz4mezoGQUYL240aIXJk-QnrN064lCzKdvnwyZWOQMamBEjJtYendZGoWRrp/exec';
  
    try {
      const response = await fetch(`${scriptURL}?${queryString}`, {
        method: 'POST',
      });
  
      console.log("Response:", response); // log the response.
  
      if (response.ok) {
        alert('Message sent!');
        e.target.reset();
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

const FrontPage = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [showBackgroundAnimation, setShowBackgroundAnimation] = useState(false);
  const heroRef = useRef(null);
  const pricingRef = useRef(null);
  const blogRef = useRef(null);
  const contactRef = useRef(null);
  const [heroText, setHeroText] = useState('');
  const heroTextOptions = [
    // Populate with your example texts if needed.
  ]; 
  const [heroTextIndex, setHeroTextIndex] = useState(0);
  const backgroundStars = useRef([]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const heroOffset = heroRef.current.offsetTop;
    const pricingOffset = pricingRef.current.offsetTop;
    const blogOffset = blogRef.current.offsetTop;
    const contactOffset = contactRef.current.offsetTop;

    if (scrollY >= contactOffset) {
      setActiveSection('contact');
      setShowBackgroundAnimation(true);
    } else if (scrollY >= blogOffset) {
      setActiveSection('blog');
      setShowBackgroundAnimation(true);
    } else if (scrollY >= pricingOffset) {
      setActiveSection('pricing');
      setShowBackgroundAnimation(true);
    } else if (scrollY >= heroOffset) {
      setActiveSection('home');
      setShowBackgroundAnimation(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroTextIndex((prevIndex) => (prevIndex + 1) % heroTextOptions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroTextOptions]);

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (heroTextOptions.length > 0 && heroTextOptions[heroTextIndex] && index <= heroTextOptions[heroTextIndex].length) {
        setHeroText(heroTextOptions[heroTextIndex].substring(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [heroTextIndex, heroTextOptions]);

  useEffect(() => {
    backgroundStars.current = [];
    if (showBackgroundAnimation) {
      const starCount = 200;
      for (let i = 0; i < starCount; i++) {
        backgroundStars.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? "#f44336" : "#9c27b0"
        });
      }
    }
  }, [showBackgroundAnimation]);

  const scrollToSection = (sectionRef) => {
    window.scrollTo({
      top: sectionRef.current.offsetTop,
      behavior: 'smooth'
    });
  };

  const pricingPlans = [
    {
        title: 'Best Player Award',
        price: '🎯 ₹500 Prize',
        features: [
          'Awarded to the Most Valuable Player (MVP)',
          'Performance-Based Selection (Top KDA, Impact Plays)',
          'Special Mention on Social Media & Event Page',
          'Exclusive Digital Certificate',
          'Free Entry to Next Event'
        ]
      },
      {
        title: '🏆 Champions Award',
        price: '₹5,000 Prize',
        features: [
          'Awarded to the Winning Team',
          'Trophy + Individual Certificates',
          'Team Photo Featured on Social Media & Event Page',
          'Exclusive Interview + Match Highlights',
          'Free Entry to Next Tournament'
        ]
      },
      {
        title: '🥈 Runner-Up Award',
        price: '₹3,000 Prize',
        features: [
          'Awarded to the Second Place Team',
          'Individual Certificates',
          'Team Mention on Social Media & Event Page',
          'Shoutout During Closing Ceremony',
          'Discounted Entry to Next Event'
        ]
      }
  ];
  
  const blogPosts = [
    {
      title: 'Valorant Competition Strategies',
      date: 'april 01, 2025',
      excerpt: 'Dive into the pro tips and tricks for acing your Valorant matches and outsmarting the competition.'
    },
    {
      title: 'Gear Up for Victory',
      date: 'april 04, 2025',
      excerpt: 'Discover the best gaming gear and settings that give top players their competitive edge.'
    },
    {
      title: 'The Rise of Competitive Gaming',
      date: 'march 23, 2025',
      excerpt: 'Explore the evolution of gaming competitions and the impact of esports on the industry.'
    }
  ];

  return (
    <div
      className="landing-page font-sans text-white overflow-x-hidden relative min-h-screen"
      style={{
        backgroundImage: "url('https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/7f7ed6e67906d7747be88529a305f6e78c06dea9-1920x1080.jpg?auto=format&fit=fill&q=80&w=1480')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {showBackgroundAnimation && (
        <div className="animated-background fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none">
          {backgroundStars.current.map((star, index) => (
            <motion.div
              key={index}
              initial={{ x: star.x, y: star.y, rotate: 0, opacity: 0.9, backgroundColor: star.color }}
              animate={{
                x: [star.x, star.x + 300],
                y: [star.y, star.y + 300],
                rotate: [0, 45],
                opacity: [0.9, 0.5, 0.9]
              }}
              transition={{
                duration: star.speed * 5,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop'
              }}
              className="absolute rounded-full"
              style={{ width: star.size, height: star.size, backgroundColor: star.color }}
            />
          ))}
        </div>
      )}

      {/* Navbar */}
      <nav className="navbar fixed top-0 left-0 w-full bg-black bg-opacity-90 p-4 flex justify-center z-10 shadow-md">
        <a
          href="#home"
          className={`mx-4 transition-colors duration-300 ${activeSection === 'home' ? 'text-red-500' : 'hover:text-red-400'}`}
          onClick={() => scrollToSection(heroRef)}
        >
          Home
        </a>
        <a
          href="#pricing"
          className={`mx-4 transition-colors duration-300 ${activeSection === 'pricing' ? 'text-red-500' : 'hover:text-red-400'}`}
          onClick={() => scrollToSection(pricingRef)}
        >
          Price Pool
        </a>
        <a
          href="#blog"
          className={`mx-4 transition-colors duration-300 ${activeSection === 'blog' ? 'text-red-500' : 'hover:text-red-400'}`}
          onClick={() => scrollToSection(blogRef)}
        >
          Blog
        </a>
        <a
          href="#contact"
          className={`mx-4 transition-colors duration-300 ${activeSection === 'contact' ? 'text-red-500' : 'hover:text-red-400'}`}
          onClick={() => scrollToSection(contactRef)}
        >
          Contact
        </a>
      </nav>

      {/* Hero Section with Background Image */}
      <section
        ref={heroRef}
        className="hero-section relative min-h-screen flex flex-col justify-center items-center p-8"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://via.placeholder.com/1920x1080?text=Hero+Background')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            opacity: 0.6
          }}
        ></div>
        <div className="relative z-10 text-center max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Valorant Gaming Tournament</h1>
          <p className="text-xl mb-6 text-red-400">{heroText}</p>
          <button className="bg-red-600 hover:bg-red-700 text-white py-3 px-8 rounded-lg transition-colors duration-300 text-lg" onClick={() => window.location.href = 'https://unstop.com/o/UwJd7oC?lb=IvQC7gxN'}>
            Register for Battle
          </button>
          <div className="image-slider mt-8">
          </div>
        </div>
      </section>

      {/* Sponsors, Tech Partner & Prize Pool Section */}
      <section className="sponsors-section relative min-h-screen flex flex-col justify-center items-center p-8">
  <h2 className="relative z-10 text-4xl font-bold mb-10 text-center">Sponsors & Prize Pool</h2>
  <div className="relative z-10 w-full flex flex-col items-center">
    <div className="flex flex-col md:flex-row justify-around w-full max-w-5xl mb-10">
      {/* Sponsor 1 */}
      <motion.div
        className="flex flex-col items-center mx-4 mb-4 md:mb-0"
        whileHover={{ scale: 1.1, rotate: 0 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={() => window.location.href = 'https://www.stjohns.in/'}
      >
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-500 mb-2">
          <img
            src={sponsor1}
            alt="Sponsor 1 Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm text-center text-gray-300">
          ST. JOHN’S NATIONAL ACADEMY OF HEALTH SCIENCES
        </p>
      </motion.div>
      {/* Sponsor 2 */}
      <motion.div
        className="flex flex-col items-center mx-4 mb-4 md:mb-0"
        whileHover={{ scale: 1.1, rotate: 0 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={() => window.location.href = 'https://forms.gle/RydVsfc4yUeqqwLY8'}
      >
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-500 mb-2">
          <img
            src={sponsor2}
            alt="./image2.jpg"
            className="w-full h-full object-cover"
            
          />
        </div>
        <p className="text-sm text-center text-gray-300">
          NOTE IN DIARY:Empowering Inner Growth Through Psychology  
        </p>
      </motion.div>
      {/* Sponsor 3 */}
      <motion.div
        className="flex flex-col items-center mx-4 mb-4 md:mb-0"
        whileHover={{ scale: 1.1, rotate: 0 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={() => window.location.href = 'https://cptorus.in/'}
      >
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-500 mb-2">
          <img
            src={ sponsor3 }
            alt="Sponsor 3 Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm text-center text-gray-300">
        Torus Solution – Computer Paradise Torus Solutions
        </p>
      </motion.div>
      {/* Tech Partner */}
      <motion.div
        className="flex flex-col items-center mx-4 mb-4 md:mb-0"
        whileHover={{ scale: 1.1, rotate: 0 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={() => window.location.href = 'http://quadropic.com'}
      >
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-500 mb-2">
          <img
            src="https://github.com/QuadropicHQ/web-assets/blob/main/quadropicdotcom-images/full_res_squircle_logo.png?raw=true"
            alt="Tech Partner Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm text-center text-gray-300">
          Tech Partner – Quadropic Making AI Agents to accelerate your work
        </p>
      </motion.div>
    </div>
 

    <div className="relative z-10">
  <div className="bg-gradient-to-r from-red-700 to-gray-800 px-8 py-6 rounded-2xl shadow-2xl relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute w-2 h-2 rounded-full bg-gray-400 opacity-50 animate-pulse"
        style={{ top: "10%", left: "20%", animationDelay: "0.5s", animationDuration: "2s" }}
      ></div>
      <div
        className="absolute w-1 h-1 rounded-full bg-gray-500 opacity-60 animate-bounce"
        style={{ top: "60%", right: "15%", animationDelay: "1s", animationDuration: "1.5s" }}
      ></div>
      <div
        className="absolute w-3 h-3 rounded-full bg-gray-300 opacity-40 animate-ping"
        style={{ bottom: "10%", left: "40%", animationDelay: "0.8s", animationDuration: "2.5s" }}
      ></div>
      <div
        className="absolute w-1.5 h-1.5 rounded-full bg-gray-600 opacity-70 animate-bounce"
        style={{ top: "30%", right: "45%", animationDelay: "1.2s", animationDuration: "1.8s" }}
      ></div>
    </div>
    <div className="flex text-align-centre relative z-20">
      <p className="text-sm font-semibold text-gray-300 uppercase tracking-wide">
        Price pool <br />
        Up to
      </p>
      <p className="text-5xl font-extrabold text-white drop-shadow-lg">₹8500</p>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent pointer-events-none"></div>
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-800/20 via-transparent to-transparent pointer-events-none"></div>
    <div className="absolute inset-0 rounded-2xl pointer-events-none">
      <div className="absolute inset-0 border-2 border-red-600 rounded-2xl blur-lg opacity-20"></div>
    </div>
  </div>
</div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="pricing-section relative min-h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-br from-black via-red-900 to-black">
        <h2 className="relative z-10 text-4xl font-bold mb-10">Prize Distribution</h2>

        <div className="pricing-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
          {pricingPlans.map((plan, index) => (
            <motion.div key={index} className="pricing-card bg-gray-800 p-8 rounded-xl shadow-2xl hover:shadow-red-400 transition-shadow duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.2 }}>
              <h3 className="text-3xl font-semibold mb-4">{plan.title}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}</p>
              <ul className="list-disc list-inside text-gray-300 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition-colors duration-300 w-full">Chance to Win</button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Blog Section */}
      <section ref={blogRef} className="blog-section relative min-h-screen flex flex-col justify-center items-center p-8">
        <h2 className="relative z-10 text-4xl font-bold mb-10">News & Strategies</h2>
        <div className="blog-posts grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
          {blogPosts.map((post, index) => (
            <motion.div key={index} className="blog-post bg-gray-800 p-8 rounded-xl shadow-2xl hover:shadow-red-400 transition-shadow duration-300" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.2 }}>
              <h3 className="text-3xl font-semibold mb-4">{post.title}</h3>
              <p className="text-gray-400 mb-4">{post.date}</p>
              <p className="text-gray-300 mb-6">{post.excerpt}</p>
              <a href="#" className="text-red-500 hover:text-red-400 transition-colors duration-300 inline-block">Read More</a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="contact-section relative min-h-screen flex flex-col justify-center items-center p-8 bg-gradient-to-b from-red-900 to-black">
        <h2 className="relative z-10 text-4xl font-bold mb-10">Get in Touch</h2>
        <p className="relative z-10 text-gray-300 mb-6">Questions? Need support? Reach out and join the conversation!</p>
        <form className="w-full max-w-md relative z-10" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" className="bg-gray-700 p-3 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-red-500" />
          <input type="email" name="email" placeholder="Your Email" className="bg-gray-700 p-3 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-red-500" />
          <textarea name="message" placeholder="Your Message" className="bg-gray-700 p-3 rounded-md w-full mb-4 focus:outline-none focus:ring-2 focus:ring-red-500" rows="4"></textarea>
          <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition-colors duration-300 w-full">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 p-8 text-center">
  <p className="text-gray-400">
    &copy; {new Date().getFullYear()} Valorant Tournament. All rights reserved.
  </p>
  <br />
  <p className="text-gray-400">
    Aashish Watwani - <a href="tel:+918690243735" className="text-blue-400  hover:text-blue-300">+91 86902 43735</a> | 
    Hemanth CS - <a href="tel:+918867197294" className="text-blue-400  hover:text-blue-300">+91 88671 97294</a>
  </p>
</footer>

    </div>
  );
};

export default FrontPage;
