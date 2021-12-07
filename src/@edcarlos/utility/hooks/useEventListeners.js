import { useEffect, useRef } from 'react';

export function useEventListeners(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = event => savedHandler.current(event);

      // Add event listener
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}


const handleEmptyKeyPress = ()=>{
  const element = document.querySelector('#quantity,#discount');
  element.addEventListener('change', () => console.log('Pressed',quantity))  
  const event = new Event('KeyPressed Event');
  element.dispatchEvent(event);
}

const handleOnChangeEvents = ()=>{
    //const element:any = document.querySelector('#quantity,#discount');
    const element = document.querySelector('#service_id');
    element.addEventListener('input', () => {
        console.log('Get The Onchange Quantity--',quantity)
    })  
    const event = new Event('KeyPressed Event');
    element.dispatchEvent(event);
  }