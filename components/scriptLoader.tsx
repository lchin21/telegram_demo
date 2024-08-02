import { useEffect } from 'react';

// @ts-ignore
const ScriptLoader = ({ src }: string) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src]);

  return null;
};

export default ScriptLoader;
