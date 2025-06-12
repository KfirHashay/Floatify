import React, { useEffect, useReducer, useMemo } from 'react';
import { render, fireEvent, act } from '@testing-library/react/pure';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MotionOverlayCard from '../src/components/motion/MotionOverlayCard';
import { variants } from '../src/motion/variants';
import { aggregatorReducer } from '../src/components/state/reducers/aggregatorReducer';
import { AggregatorContext } from '../src/components/state/context/aggregatorContext';
import useAggregator from '../src/components/state/hooks/useAggregator';
import type { OverlayAggregatorState } from '../src/components/state/types';

let reduceMotion = false;
let dragEndHandler: ((e: any, info: { offset: { x: number } }) => void) | undefined;
let capturedAnimate: any;

vi.mock('motion/react', async () => {
  const React = await import('react');
  return {
    motion: {
      div: ({ children, onDragEnd, animate, style, ...props }: any) => {
        if (style && (style as any).display === 'contents') {
          dragEndHandler = onDragEnd;
          capturedAnimate = animate;
        }
        return (
          <div style={style} {...props}>
            {children}
          </div>
        );
      },
    },
    useReducedMotion: () => reduceMotion,
  };
});

vi.mock('../src/motion', async () => {
  const actual = await vi.importActual('../src/motion');
  return { ...actual, prefersReducedMotion: () => reduceMotion };
});

function Provider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(aggregatorReducer, {
    channels: {},
    activeChannelId: null,
  });
  const value = useMemo(
    () => ({
      state,
      dispatch,
      config: {
        splitLoading: true,
        defaultBubbleIcons: { message: <span />, loading: <span />, alert: <span /> },
      },
    }),
    [state]
  );
  return <AggregatorContext.Provider value={value}>{children}</AggregatorContext.Provider>;
}

function Setup() {
  const { registerChannel, addCard, state } = useAggregator();
  useEffect(() => {
    registerChannel('ch', 1);
    addCard('ch', { id: 'a', title: 'A', content: 'A' });
    addCard('ch', { id: 'b', title: 'B', content: 'B' });
  }, [registerChannel, addCard]);

  const channel = state.channels['ch'];
  if (!channel) return null;
  const card = channel.cards[channel.activeCardIndex];
  return <MotionOverlayCard channelId="ch" card={card} />;
}

function getCard(container: HTMLElement) {
  return container.querySelector('.overlay-card') as HTMLElement;
}

describe('MotionOverlayCard interactions', () => {
  beforeEach(() => {
    reduceMotion = false;
    dragEndHandler = undefined;
    capturedAnimate = undefined;
  });

  it('toggles expanded state on click', () => {
    const { container } = render(
      <Provider>
        <Setup />
      </Provider>
    );
    const card = getCard(container);
    expect(card.className).toContain('overlay-card--collapsed');

    act(() => {
      fireEvent.click(card);
    });
    expect(card.className).toContain('overlay-card--expanded');

    act(() => {
      fireEvent.click(card);
    });
    expect(card.className).toContain('overlay-card--collapsed');
  });

  it('applies motion variant when allowed', () => {
    render(
      <Provider>
        <Setup />
      </Provider>
    );
    expect(capturedAnimate).toEqual(variants['collapsed']);
  });

  it('swipes to next and previous card', () => {
    const { container } = render(
      <Provider>
        <Setup />
      </Provider>
    );
    const card = getCard(container);
    expect(card.textContent).toContain('A');

    act(() => {
      dragEndHandler?.(null, { offset: { x: -100 } });
    });
    expect(card.textContent).toContain('B');

    act(() => {
      dragEndHandler?.(null, { offset: { x: 100 } });
    });
    expect(card.textContent).toContain('A');
  });

  it('honours prefers-reduced-motion when set', () => {
    reduceMotion = true;
    const aggState: OverlayAggregatorState = {
      channels: {
        test: { channelId: 'test', priority: 1, cards: [{ id: 'a', content: 'A' }], activeCardIndex: 0, state: 'expanded' },
      },
      activeChannelId: 'test',
    };
    render(
      <Provider>
        <MotionOverlayCard channelId="test" card={aggState.channels.test.cards[0]} />
      </Provider>
    );
    expect(capturedAnimate).toBeUndefined();
  });
});

