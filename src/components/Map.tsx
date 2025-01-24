import React from 'react';

const Map = () => {
  // Encode the address for the URL
  const address = encodeURIComponent("1309 Coffeen Avenue STE 1200, Sheridan Wyoming 82801");
  const googleMapsStaticUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${address}&zoom=15&size=800x400&markers=color:red%7C${address}&key=YOUR_GOOGLE_MAPS_API_KEY`;
  
  // Fallback to OpenStreetMap as it doesn't require an API key
  const openStreetMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=-106.9689,44.7947,-106.9489,44.8047&layer=mapnik&marker=44.7997,-106.9589`;

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-gray-200">
      <iframe 
        src={openStreetMapUrl}
        title="Map of 1309 Coffeen Avenue STE 1200, Sheridan Wyoming 82801"
        className="absolute inset-0 w-full h-full"
        style={{ border: 0 }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/10" />
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