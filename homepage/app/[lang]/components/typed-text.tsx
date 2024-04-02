"use client";


import React from 'react';
import Typed from 'typed.js';

export default function TypedText() {
   // Create reference to store the DOM element containing the animation
   const el = React.useRef(null);

   React.useEffect(() => {
     const typed = new Typed(el.current, {
       strings: ['<i>First</i> sentence.', '&amp; a second sentence.'],
       typeSpeed: 50,
     });
 
     return () => {
       // Destroy Typed instance during cleanup to stop animation
       typed.destroy();
     };
   }, []);
   
  return (
    <span ref={el} />
  );
}
