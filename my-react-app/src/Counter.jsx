import React, { useState, useEffect } from "react";

const Counter = () => {
    const targetDate = new Date("2025-04-18T00:00:00").getTime();
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute sm:fixed top-20 right-4 z-[1000] bg-gradient-to-br from-red-600 via-black to-red-900 text-white px-5 py-3 rounded-xl shadow-lg text-center animate-pulse backdrop-blur-md border border-white/20">
        <h4 className="text-sm font-semibold mb-1 tracking-wide text-white drop-shadow-sm">
            ⏳ Countdown
        </h4>
        <div className="text-base font-bold tracking-wider">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
    </div>
    
    
    
    );
};

export default Counter;
