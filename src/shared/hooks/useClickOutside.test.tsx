import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { type FC, useRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useClickOutside } from './useClickOutside';

interface TestComponentProps {
  onClickOutside: (event: PointerEvent) => void;
}

const TestComponent: FC<TestComponentProps> = ({ onClickOutside }) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, onClickOutside);

  return (
    <>
      <div ref={ref}>
        <button type='button'>Inside</button>
      </div>
      <button type='button'>Outside</button>
    </>
  );
};

describe('useClickOutside', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('calls the handler when a pointer event starts outside the referenced element', () => {
    const onClickOutside = vi.fn();

    render(<TestComponent onClickOutside={onClickOutside} />);

    fireEvent.pointerDown(screen.getByRole('button', { name: 'Inside' }));
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));

    expect(onClickOutside).toHaveBeenCalledOnce();
  });

  it('uses the latest handler after rerendering', () => {
    const firstHandler = vi.fn();
    const latestHandler = vi.fn();
    const { rerender } = render(<TestComponent onClickOutside={firstHandler} />);

    rerender(<TestComponent onClickOutside={latestHandler} />);
    fireEvent.pointerDown(screen.getByRole('button', { name: 'Outside' }));

    expect(firstHandler).not.toHaveBeenCalled();
    expect(latestHandler).toHaveBeenCalledOnce();
  });
});
