import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmV3LXN1cmdlYWkiLCJhIjoiY2x0eHJlZGRuMDFsZTJrcXZ4ZGxqcnVwdyJ9.bUEDCaYAGHQgFBHhVKQOtg';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12', // Changed to streets style for better visibility
      center: [-106.956, 44.797], // Sheridan, Wyoming coordinates
      zoom: 14, // Slightly adjusted zoom level
      attributionControl: true,
      pitch: 0, // Add pitch for better perspective
      bearing: 0 // Add bearing for orientation
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add marker
    new mapboxgl.Marker({
      color: "#9b87f5" // Using primary color from theme
    })
      .setLngLat([-106.956, 44.797])
      .addTo(map.current);

    // Ensure the map container has a defined height
    const resizeMap = () => {
      if (map.current) {
        map.current.resize();
      }
    };

    // Initial resize
    resizeMap();

    // Add resize listener
    window.addEventListener('resize', resizeMap);

    // Wait for map to load before doing anything else
    map.current.on('load', () => {
      map.current?.resize();
    });

    return () => {
      window.removeEventListener('resize', resizeMap);
      map.current?.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border border-gray-200">
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default Map;