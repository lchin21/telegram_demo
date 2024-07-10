import React, { useState, useRef, useEffect, ChangeEvent } from 'react';

interface DynamicWidthInputProps {
  initialValue?: string;
  onChange: (value: string) => void;
}

const DynamicWidthInput: React.FC<DynamicWidthInputProps> = ({ initialValue = '', onChange}) => {
  const [content, setContent] = useState<string>('');
  const [inputWidth, setInputWidth] = useState<string>('auto');
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);



   useEffect(() => {
    if (inputRef.current && spanRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      setInputWidth(`${spanWidth*1.6}px`);
    }
  }, [content]);

  const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    // setContent(evt.target.value);
      const { value } = evt.target;
      setContent(value);
      onChange(value);
  };

  return (
    <div className="wrapper" style={{ position: 'relative' }}>
      <span
        id="hide"
        ref={spanRef}
        style={{ position: 'absolute', visibility: 'hidden', whiteSpace: 'pre' }}
      >
        {content || ' '}
      </span>
      <input
        type="text"
        ref={inputRef}
        style={{ width: inputWidth, minWidth: '15px', fontSize: '24px', maxWidth: '100%' }}
        placeholder="0"
        value={content}
        onChange={changeHandler}
        className="border-none focus:outline-none"
      />
    </div>
  );
};

export default DynamicWidthInput;
