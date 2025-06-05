import React, { useEffect } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react/pure';
import AggregatorProvider from '../src/components/state/context/aggregatorProvider';
import useAggregator from '../src/components/state/hooks/useAggregator';

function DispatchOnMount() {
    const { registerChannel } = useAggregator();
    useEffect(() => {
        registerChannel('ch', 1);
    }, [registerChannel]);
    return null;
}

describe('AggregatorProvider debug logging', () => {
    it('logs action and state transitions when debug is enabled', () => {
        const groupSpy = vi.spyOn(console, 'groupCollapsed').mockImplementation(() => {});
        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        render(
            <AggregatorProvider debug>
                <DispatchOnMount />
            </AggregatorProvider>
        );
        expect(groupSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledTimes(3);
        logSpy.mockRestore();
        groupSpy.mockRestore();
    });
});
