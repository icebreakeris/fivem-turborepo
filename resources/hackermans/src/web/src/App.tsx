import { useState } from 'react';
import { useMessageListener } from './hooks/useMessageListener';

function App() {
  const [screenPos, setScreenPos] = useState<PedPosData[]>([]);

  useMessageListener('position:allpos', (data: PedPosData[]) => {
    const processed = data.map((pedPos) => {
      const newTop = window.innerHeight * pedPos.y;
      const newLeft = window.innerWidth * pedPos.x;

      return { ...pedPos, x: newLeft, y: newTop };
    });

    setScreenPos(processed);
  });

  const deleteEntity = (entity: number) => {
    fetch(`https://fivem-ts-react-template/deleteEntity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        entity: entity,
      }),
    });
  };

  return (
    <div className="w-[100vw] h-[100vh] relative overflow-hidden">
      {screenPos.map((pos) => {
        return (
          <div
            key={pos.entity}
            className="absolute -translate-x-1/2 min-w-[20px] -translate-y-1/2 border-2 aspect-square text-white bg-red-600/30 flex justify-center items-center transition-all duration-[50ms]"
            style={{
              top: `${pos.y}px`,
              left: `${pos.x}px`,
              width: `calc(2rem * ${pos.scale})`,
            }}
            onClick={() => deleteEntity(pos.entity)}
          ></div>
        );
      })}
      w
    </div>
  );
}

export default App;
