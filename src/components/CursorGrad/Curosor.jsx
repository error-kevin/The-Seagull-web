import React, { useEffect, useState } from "react";

const CursorGradient = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Update cursor position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: position.y,
          left: position.x,
          width: "50px",
          height: "50px",
          background:
            "radial-gradient(circle, rgb(66, 134, 245,0.2), transparent)",
          //   backdropFilter: "blur(15px)",
          borderRadius: "50%",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          mixBlendMode: "difference",
        }}
      />
    </div>
  );
};

export default CursorGradient;
