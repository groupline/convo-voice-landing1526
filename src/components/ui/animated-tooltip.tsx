"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-row items-center justify-center py-20">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            className="absolute -inset-2 rounded-lg bg-gradient-to-r from-primary via-primary-light to-primary-dark opacity-75 blur-lg group-hover:opacity-100 transition duration-200"
            animate={{
              scale: hoveredIndex === idx ? 1.05 : 1,
            }}
          />
          <motion.div
            className="relative"
            animate={{
              scale: hoveredIndex === idx ? 1.1 : 1,
            }}
          >
            <img
              src={item.image}
              className="object-cover rounded-full h-14 w-14 border-2 border-white group-hover:border-primary transition duration-200"
              alt={item.name}
            />
            {hoveredIndex === idx && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                className="absolute -top-16 -left-1/2 transform translate-x-1/2 px-4 py-2 bg-white rounded-lg shadow-xl"
              >
                <div className="text-sm text-gray-700 font-semibold">
                  {item.name}
                </div>
                <div className="text-xs text-gray-600">{item.designation}</div>
              </motion.div>
            )}
          </motion.div>
        </div>
      ))}
    </div>
  );
};