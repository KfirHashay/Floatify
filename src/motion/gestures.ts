import type { MotionProps } from 'motion';
import { prefersReducedMotion } from './utils';

/** Motion props returned by {@link hoverExpand}. */
export type HoverExpandProps = Pick<MotionProps, 'whileHover' | 'transition'>;

/**
 * Scales an element slightly on hover using a spring transition.
 * Honours the user's reduced motion preference.
 */
export function hoverExpand(): HoverExpandProps {
    const reduce = prefersReducedMotion();
    return reduce
        ? {}
        : {
              whileHover: { scale: 1.05 },
              transition: { type: 'spring', stiffness: 500, damping: 30 },
          };
}

/** Motion props returned by {@link tapToggle}. */
export type TapToggleProps = Pick<MotionProps, 'whileTap' | 'transition'>;

/**
 * Provides a quick scale down on tap/click interactions.
 */
export function tapToggle(): TapToggleProps {
    const reduce = prefersReducedMotion();
    return reduce
        ? {}
        : {
              whileTap: { scale: 0.95 },
              transition: { type: 'spring', stiffness: 500, damping: 30 },
          };
}

/** Motion props returned by {@link bounce}. */
export type BounceProps = Pick<MotionProps, 'animate' | 'transition'>;

/**
 * Gives elements a subtle bounce animation.
 */
export function bounce(): BounceProps {
    const reduce = prefersReducedMotion();
    return reduce
        ? {}
        : {
              animate: { y: [0, -10, 0] },
              transition: { duration: 0.4, ease: 'easeOut' },
          };
}

/** Motion props returned by {@link inertiaDismiss}. */
export type InertiaDismissProps = Pick<MotionProps, 'drag' | 'dragElastic' | 'dragMomentum'>;

/**
 * Allows dismissing an element by dragging vertically with momentum.
 */
export function inertiaDismiss(): InertiaDismissProps {
    const reduce = prefersReducedMotion();
    return reduce
        ? {}
        : {
              drag: 'y',
              dragElastic: 0.2,
              dragMomentum: true,
          };
}

/** Motion props returned by {@link secondarySwipe}. */
export type SecondarySwipeProps = Pick<MotionProps, 'drag' | 'dragElastic' | 'dragDirectionLock' | 'dragMomentum'>;

/**
 * Enables horizontal swiping with slight elasticity for secondary actions.
 */
export function secondarySwipe(): SecondarySwipeProps {
    const reduce = prefersReducedMotion();
    return reduce
        ? {}
        : {
              drag: 'x',
              dragElastic: 0.1,
              dragDirectionLock: true,
              dragMomentum: true,
          };
}

/** Motion props returned by {@link longPressPulse}. */
export type LongPressPulseProps = Pick<MotionProps, 'whileTap' | 'transition'>;

/**
 * Subtle pulsing effect while an element is pressed.
 */
export function longPressPulse(): LongPressPulseProps {
    const reduce = prefersReducedMotion();
    return reduce
        ? {}
        : {
              whileTap: { scale: 1.1 },
              transition: { type: 'spring', duration: 0.3 },
          };
}

