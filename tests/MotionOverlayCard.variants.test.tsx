import React, { useMemo } from 'react';
import { render, cleanup } from '@testing-library/react/pure';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AggregatorContext } from '../src/components/state/context/aggregatorContext';
import type { OverlayAggregatorState, OverlayState } from '../src/components/state/types';
import MotionOverlayCard from '../src/components/motion/MotionOverlayCard';
import { variants } from '../src/motion/variants';

let reduceMotion = false;
let capturedAnimate: any;

vi.mock('motion/react', async () => {
  const React = await import('react');
  return {
    motion: {
      div: ({ children, style, ...props }: any) => {
        if (style && (style as any).display === 'contents') {
          capturedAnimate = props.animate;
        }
        return <div style={style}>{children}</div>;
      },
    },
    useReducedMotion: () => reduceMotion,
  };
});

function Provider({ state, children }: { state: OverlayAggregatorState; children: React.ReactNode }) {
  const value = useMemo(
    () => ({
      state,
      dispatch: vi.fn(),
      config: { splitLoading: true, defaultBubbleIcons: { message: <span />, loading: <span />, alert: <span /> } },
    }),
    [state]
  );
  return <AggregatorContext.Provider value={value}>{children}</AggregatorContext.Provider>;
}

const overlayStates: OverlayState[] = ['hidden','collapsed','expanded','alert','swiping','loading','split','bubble'];

describe('MotionOverlayCard variants', () => {
  beforeEach(() => {
    capturedAnimate = undefined;
    reduceMotion = false;
  });
  afterEach(() => {
    cleanup();
  });

  it('has variants for every OverlayState', () => {
    expect(Object.keys(variants).sort()).toEqual(overlayStates.slice().sort());
  });

  it.each(overlayStates)('uses %s variant when motion allowed', (state) => {
    const aggState: OverlayAggregatorState = {
      channels: {
        test: { channelId: 'test', priority: 1, cards: [{ id: 'a', content: 'A' }], activeCardIndex: 0, state },
      },
      activeChannelId: 'test',
    };
    render(
      <Provider state={aggState}>
        <MotionOverlayCard channelId="test" card={aggState.channels.test.cards[0]} />
      </Provider>
    );
    expect(capturedAnimate).toEqual(variants[state]);
  });

  it('omits animation when prefers-reduced-motion is true', () => {
    reduceMotion = true;
    const aggState: OverlayAggregatorState = {
      channels: {
        test: { channelId: 'test', priority: 1, cards: [{ id: 'a', content: 'A' }], activeCardIndex: 0, state: 'expanded' },
      },
      activeChannelId: 'test',
    };
    render(
      <Provider state={aggState}>
        <MotionOverlayCard channelId="test" card={aggState.channels.test.cards[0]} />
      </Provider>
    );
    expect(capturedAnimate).toBeUndefined();
  });
});
