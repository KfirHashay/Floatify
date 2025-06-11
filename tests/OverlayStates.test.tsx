import React, { useEffect } from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react/pure';
import { describe, it, expect, afterEach } from 'vitest';
import AggregatorProvider from '../src/components/state/context/aggregatorProvider';
import useAggregator from '../src/components/state/hooks/useAggregator';

afterEach(() => {
    cleanup();
});

function LoadingSetup() {
    const { registerChannel, updateChannelState } = useAggregator();
    useEffect(() => {
        registerChannel('load', 1);
        updateChannelState('load', 'loading');
    }, [registerChannel, updateChannelState]);
    return null;
}

function PositionSetup() {
    const { registerChannel, addCard } = useAggregator();
    useEffect(() => {
        registerChannel('ch', 1);
        addCard('ch', { id: 'a', content: 'A' });
    }, [registerChannel, addCard]);
    return null;
}

describe('overlay additional states', () => {
    it('renders spinner when loading', () => {
        render(
            <AggregatorProvider>
                <LoadingSetup />
            </AggregatorProvider>
        );
        expect(screen.getByLabelText('Loading')).toBeTruthy();
    });

    it('applies position class', () => {
        render(
            <AggregatorProvider position="top">
                <PositionSetup />
            </AggregatorProvider>
        );
        const portal = document.querySelector('.overlay-portal');
        expect(portal?.classList.contains('overlay-portal--top')).toBe(true);
    });

    it('applies sticky class on top', async () => {
        render(
            <AggregatorProvider fixedToViewport position="top">
                <PositionSetup />
            </AggregatorProvider>
        );
        await waitFor(() => {
            const el = document.querySelector('.overlay-portal.overlay-portal--fixed');
            expect(el).toBeTruthy();
        });
        const portal = document.querySelector('.overlay-portal.overlay-portal--fixed');
        expect(portal?.classList.contains('overlay-portal--top')).toBe(true);
    });

    it('applies sticky class on bottom', async () => {
        render(
            <AggregatorProvider fixedToViewport position="bottom">
                <PositionSetup />
            </AggregatorProvider>
        );
        await waitFor(() => {
            const el = document.querySelector('.overlay-portal.overlay-portal--fixed');
            expect(el).toBeTruthy();
        });
        const portal = document.querySelector('.overlay-portal.overlay-portal--fixed');
        expect(portal?.classList.contains('overlay-portal--bottom')).toBe(true);
    });
});
