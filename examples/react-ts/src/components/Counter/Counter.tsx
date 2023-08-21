import { useState } from 'react';
import { Button } from '../Button';
import type React from 'react';

export const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <Button onClick={() => setCount(count + 1)}>
      Count is {count}
    </Button>
  );
};
