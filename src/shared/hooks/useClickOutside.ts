import { type RefObject, useEffect, useRef } from 'react';

export const useClickOutside = <TElement extends HTMLElement>(
  ref: RefObject<TElement | null>,
  onClickOutside: (event: PointerEvent) => void,
) => {
  const onClickOutsideRef = useRef(onClickOutside);

  useEffect(() => {
    onClickOutsideRef.current = onClickOutside;
  }, [onClickOutside]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const element = ref.current;
      const target = event.target;

      if (!element || !(target instanceof Node) || element.contains(target)) {
        return;
      }

      onClickOutsideRef.current(event);
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [ref]);
};
