import React, { forwardRef } from 'react';

interface PageProps {
  children: React.ReactNode;
  title: string;
  className: string;
  rest?: [];
}

const Page: React.FC<PageProps>  = forwardRef(({
  children,
  title,
  ...rest
}, ref) => {
  return (
    <div ref={ ref as React.RefObject<HTMLDivElement> }
      { ...rest }
    >
      { children }
    </div>
  );
});

export default Page;
