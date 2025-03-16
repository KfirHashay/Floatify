import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react/pure';
import Floatify from '../src/components/core/Floatify';

describe('Floatify Component', () => {
    it('renders the message', () => {
        render(<Floatify message="Test Message" />);
        expect(screen.getByText('Test Message')).toBeTruthy();
    });
});
