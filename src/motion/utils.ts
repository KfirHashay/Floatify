import { useReducedMotion, type Variant } from 'motion';

export function prefersReducedMotion(): boolean {
    const shouldReduceMotion = useReducedMotion();
    return shouldReduceMotion;
}

export const createVariant = <T extends Variant>(v: T): T => v;
