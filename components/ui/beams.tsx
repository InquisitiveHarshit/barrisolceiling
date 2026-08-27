"use client"

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export interface BeamsProps {
  beamWidth?: number;
  beamHeight?: number;
  beamNumber?: number;
  lightColor?: string;
  speed?: number;
  noiseIntensity?: number;
  scale?: number;
  rotation?: number;
  className?: string;
}

export default function Beams({
  beamWidth = 3,
  beamHeight = 30,
  beamNumber = 20,
  lightColor = "#ffffff",
  speed = 2,
  noiseIntensity = 1.75,
  scale = 0.2,
  rotation = 30,
  className = "",
}: BeamsProps) {
  // Mock placeholder for the Beams component
  // Since the original source code was not provided, this renders an animated gradient
  // that roughly mimics a purple/white beams theme.
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-vibrancy/80 via-primary/60 to-brand-vibrancy-dark/90" />
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `repeating-linear-gradient(${rotation}deg, transparent, transparent ${beamWidth}px, ${lightColor} ${beamWidth}px, ${lightColor} ${beamWidth * 2}px)`,
          backgroundSize: `${scale * 100}% ${scale * 100}%`
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 10 / speed,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
