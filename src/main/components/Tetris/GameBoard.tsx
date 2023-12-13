import React, { useRef, useEffect } from 'react';

export const GameBoard: React.FC<{}> = () => {
  let canvasRef = useRef<HTMLCanvasElement | null>(null);

  const draw = () => {
    let x =0, y=0;

  }

  useEffect(() => {
    // Initialize
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      
      canvasRef.current.width = 800; 
      canvasRef.current.height = 800; 

      // Iniciar el dibujo del círculo
      ctx!.beginPath();
      ctx!.arc(600, 300, 200, 0, 2 * Math.PI);
      ctx!.stroke();
    }
  }, []);

  return <canvas className='' ref={canvasRef}></canvas>;
};
