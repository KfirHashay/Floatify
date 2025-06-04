import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react/pure';
import Floatify from '../src/components/core/Floatify';

describe('Floatify Component', () => {
    it('renders children via AggregatorProvider', () => {
        render(
            <Floatify>
                <span>Test Content</span>
            </Floatify>
        );
        expect(screen.getByText('Test Content')).toBeTruthy();
    });
});
