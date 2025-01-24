import React from 'react';

const Map = () => {
  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-gray-200">
      <img 
        src="https://images.unsplash.com/photo-1433086966358-54859d0ed716"
        alt="Map of 1309 Coffeen Avenue STE 1200, Sheridan Wyoming 82801"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/10" /> {/* Slight overlay for better text contrast */}
      <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow-lg">
        <p className="text-sm font-medium">
          1309 Coffeen Avenue STE 1200<br />
          Sheridan Wyoming 82801
        </p>
      </div>
    </div>
  );
};

export default Map;