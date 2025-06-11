import React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react/pure';
import Floatify from '../src/components/core/Floatify';
import AggregatorProvider from '../src/components/state/context/aggregatorProvider';

// Mock AggregatorProvider to verify props are passed correctly
vi.mock('../src/components/state/context/aggregatorProvider', () => {
    return {
        default: vi.fn(({ children, fixedToViewport }) => (
            <div data-testid="mocked-provider" data-fixed={fixedToViewport.toString()}>
                {children}
            </div>
        )),
    };
});

describe('Floatify Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        cleanup();
    });

    it('renders children via AggregatorProvider', () => {
        render(
            <Floatify>
                <span>Test Content</span>
            </Floatify>
        );
        expect(screen.getByText('Test Content')).toBeTruthy();
        expect(screen.getByTestId('mocked-provider')).toBeTruthy();
    });

    it('passes fixedToViewport=true by default', () => {
        render(
            <Floatify>
                <span>Test Content</span>
            </Floatify>
        );
        const provider = screen.getByTestId('mocked-provider');
        expect(provider.dataset.fixed).toBe('true');
    });

    it('accepts fixedToViewport prop', () => {
        render(
            <Floatify fixedToViewport={false}>
                <span>Test Content</span>
            </Floatify>
        );
        const provider = screen.getByTestId('mocked-provider');
        expect(provider.dataset.fixed).toBe('false');
    });

    it('supports deprecated sticky prop for backwards compatibility', () => {
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

        render(
            <Floatify sticky={false}>
                <span>Test Content</span>
            </Floatify>
        );

        const provider = screen.getByTestId('mocked-provider');
        expect(provider.dataset.fixed).toBe('false');

        // Should issue deprecation warning in development mode
        expect(consoleSpy).toHaveBeenCalledWith('[Floatify] The `sticky` prop is deprecated. Use `fixedToViewport` instead.');

        consoleSpy.mockRestore();
    });

    it('forwards all other props to AggregatorProvider', () => {
        // No need for mock function
        render(
            <Floatify
                debug={true}
                position="bottom"
                autoDismiss={false}
                autoDismissTimeout={5000}
                concurrencyMode="multiple"
                unstyled={true}
                splitLoading={false}
            >
                <span>Test Content</span>
            </Floatify>
        );

        expect(AggregatorProvider).toHaveBeenCalledWith(
            expect.objectContaining({
                debug: true,
                position: 'bottom',
                autoDismiss: false,
                autoDismissTimeout: 5000,
                concurrencyMode: 'multiple',
                unstyled: true,
                splitLoading: false,
                fixedToViewport: true,
            }),
            expect.anything()
        );
    });
});
