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
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-106.956, 44.797], // Sheridan, Wyoming coordinates
      zoom: 15
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add marker
    new mapboxgl.Marker()
      .setLngLat([-106.956, 44.797])
      .addTo(map.current);

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;