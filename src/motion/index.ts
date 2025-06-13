/**
 * Consolidated exports for motion-related utilities and animation variants.
 */

/** Animation presets keyed by overlay state. */
export { variants } from './variants';

/** Overlay state keys used by the variants. */
export type { OverlayState, Variant } from './variants';

/** Utility for creating a variant with full type safety. */
export { createVariant } from './utils';

/** Detects if the user prefers reduced motion. */
export { prefersReducedMotion } from './utils';

/** Gesture helpers for common interactions. */
export {
    hoverExpand,
    tapToggle,
    bounce,
    inertiaDismiss,
    secondarySwipe,
    longPressPulse,
} from './gestures';

export type {
    HoverExpandProps,
    TapToggleProps,
    BounceProps,
    InertiaDismissProps,
    SecondarySwipeProps,
    LongPressPulseProps,
} from './gestures';
