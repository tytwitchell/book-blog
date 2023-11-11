import React, { useState, useEffect } from "react";
import { GUI } from "https://cdn.skypack.dev/dat.gui";

export default function Background() {
  const [config, setConfig] = useState({
    explode: false,
    spread: 20,
    dot: 2,
    width: 300,
    height: 300,
    size: 512,
    speed: 20,
    brightness: 1.4,
    dots: true,
    noise: true,
    intersect: true,
  });

  const updateStyles = () => {
    for (const key of Object.keys(config)) {
      if (key !== "intersect" && key !== "dots" && key !== "noise") {
        document.documentElement.style.setProperty(`--${key}`, config[key]);
      }

      if (key === "intersect") {
        document.documentElement.style.setProperty(
          "--intersect",
          config.intersect ? "source-in, xor" : "unset"
        );
        document.documentElement.style.setProperty(
          "--intersect-moz",
          config.intersect ? "intersect" : "unset"
        );
      }
      
      document.documentElement.className = "";
      if (!config.dots && config.noise)
        document.documentElement.className = "noise-mask";
      if (config.dots && !config.noise)
        document.documentElement.className = "dots-mask";
      if (!config.dots && !config.noise)
        document.documentElement.className = "no-mask";
    }
  };

  const explode = () => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      explode: !prevConfig.explode,
    }));
  };

  const gui = new GUI({
    width: 320,
  });

  gui.add(config, "explode").name("Explode?").onChange(explode);
  gui
    .add(config, "spread", 1, 100, 1)
    .name("Spread (px)")
    .onChange(updateStyles);
  gui
    .add(config, "dot", 1, 100, 1)
    .name("Dot Size (px)")
    .onChange(updateStyles);
  gui
    .add(config, "width", 100, 600, 1)
    .name("Canvas Width (px)")
    .onChange(updateStyles);
  gui
    .add(config, "height", 100, 600, 1)
    .name("Canvas Height (px)")
    .onChange(updateStyles);
  gui
    .add(config, "size", 1, 1920, 1)
    .name("Mask Size (px)")
    .onChange(updateStyles);
  gui
    .add(config, "brightness", 0.5, 5, 0.1)
    .name("Brightness")
    .onChange(updateStyles);
  gui.add(config, "speed", 2, 60, 1).name("Speed (s)").onChange(updateStyles);
  gui.add(config, "intersect").name("Mask Composite").onChange(updateStyles);
  gui.add(config, "dots").name("Dot Mask").onChange(updateStyles);
  gui.add(config, "noise").name("Perlin Mask").onChange(updateStyles);

  useEffect(() => {
    // Run the initial update when the component mounts
    updateStyles();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="scene">
      <div className="backdrop"></div>
      <div className="noise"></div>
      <div className="dots"></div>
      <div className="canvas"></div>
    </div>
  );
}
