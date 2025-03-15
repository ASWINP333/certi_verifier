import React, { useEffect, useRef } from 'react';

const useWidth = (ref) => {
  const [width, setWidth] = React.useState(0);
  const prevWidth = useRef(width);

  useEffect(() => {
    if (ref.current) {
      const newWidth = ref.current.offsetWidth;
      if (newWidth !== prevWidth.current) {
        setWidth(newWidth);
        prevWidth.current = newWidth;
      }
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.width !== prevWidth.current) {
          setWidth(entry.contentRect.width);
          prevWidth.current = entry.contentRect.width;
        }
      }
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, [ref]);

  return width;
};

export default useWidth;
