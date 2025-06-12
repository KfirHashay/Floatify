import type { MotionVariant } from 'motion';
import { createVariant } from './utils';
import type { OverlayState } from '../components/state/types/channelTypes';

/**
 * A motion variant describing how an overlay should animate.
 * Additional properties may be included by extending this interface.
 */
export type Variant = MotionVariant<{
    /** Base size of the overlay in pixels or relative units. */
    size: number;
    /** Transform scale for zooming effects. */
    scale: number;
    /** Opacity of the overlay. */
    opacity: number;
    /** Optional stacking context control. */
    zIndex?: number;
    /** Optional clipping path for advanced shapes. */
    clipPath?: string;
}>;

/**
 * Motion variants keyed by {@link OverlayState}. These values are intentionally
 * minimal and can be customised per project.
 */
export const variants: Record<OverlayState, Variant> = {
    collapsed: createVariant({ size: 1, scale: 0.95, opacity: 1 }),
    expanded: createVariant({ size: 1.5, scale: 1, opacity: 1 }),
    bubble: createVariant({ size: 0.5, scale: 0.9, opacity: 1 }),
    hidden: createVariant({ size: 0, scale: 0.8, opacity: 0 }),
    loading: createVariant({ size: 1, scale: 1, opacity: 0.85 }),
    split: createVariant({ size: 1.2, scale: 1, opacity: 1 }),
    alert: createVariant({ size: 1, scale: 1.05, opacity: 1 }),
    swiping: createVariant({ size: 1, scale: 0.95, opacity: 0.9 }),
};

export type { OverlayState } from '../components/state/types/channelTypes';
