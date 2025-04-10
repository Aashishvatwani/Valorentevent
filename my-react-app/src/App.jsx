import React from 'react';
import FrontPage from './FrontPage';
import SponsorPopup from './SponsorPopup';
import { useState } from 'react';
import Counter from './Counter';
import { Analytics } from "@vercel/analytics/react"
const App = () => {
  const [showPopup, setShowPopup] = useState(true); 
return (
  <div className="relative">
    {showPopup && <SponsorPopup onClose={() => setShowPopup(false)} />}
    <div >
       <Counter/>
        <FrontPage/>
        <Analytics />
      </div>
   

  </div>
 
);
}

export default App;
//hello world