import React from 'react';
import FrontPage from './FrontPage';
import SponsorPopup from './SponsorPopup';
import { useState } from 'react';
const App = () => {
  const [showPopup, setShowPopup] = useState(true); 
return (
  <div className="relative">
    {showPopup && <SponsorPopup onClose={() => setShowPopup(false)} />}
    <div >
       
        <FrontPage/>
      </div>
   

  </div>
 
);
}

export default App;
//hello world