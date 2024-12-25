import React from "react";

const HeartBeat = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-full max-w-lg overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 100"
          fill="none"
          stroke="limegreen"
          strokeWidth="2"
        >
          <polyline
            points="
              0,70 
              50,70 
              75,25 
              100,50 
              125,75 
              150,50 
              200,50 
              225,25 
              250,75 
              275,50 
              300,50 
              350,25 
              400,50"
            className="heartbeat"
          />
        </svg>
      </div>

      <style jsx>{`
        .heartbeat {
          stroke-dasharray: 400; /* Total length of the line */
          stroke-dashoffset: 400; /* Hide the stroke initially */
          animation: heartbeat 2s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0% {
            stroke-dashoffset: 400; /* Line is hidden */
          }
          50% {
            stroke-dashoffset: 0; /* Line fully drawn */
          }
          100% {
            stroke-dashoffset: 400; /* Line hidden again */
          }
        }
      `}</style>
    </div>
  );
};

export default HeartBeat;
