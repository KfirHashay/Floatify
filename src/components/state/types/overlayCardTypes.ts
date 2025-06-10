/**
 * overlayCardTypes.ts
 *
 * Represents a single visual card or message
 * in the overlay system's queue. Replaces 'ToastItem'.
 */

import type { ReactNode } from 'react';

export interface OverlayCard {
    /**
     * A unique identifier, e.g., a UUID or timestamp-based string.
     */
    id: string;

    /**
     * Short, optional heading displayed on the card.
     */
    title?: string;

    /**
     * Main textual content or message.
     */
    content: string;

    /**
     * If true, the card may automatically be dismissed after a set duration.
     */
    autoDismiss?: boolean;

    /**
     * Duration in milliseconds before auto-dismissing this specific card.
     * Overrides the global autoDismissTimeout setting.
     */
    autoDismissDuration?: number;

    /**
     * Optional timestamp or numeric marker for sorting/analytics.
     */
    timestamp?: number;

    /**
     * Optional visual icon element to display with the card.
     */
    icon?: ReactNode;

    /**
     * Future expansion: place icons, images, or other metadata here.
     */
    // iconUrl?: string;
    // imageUrl?: string;
    // ...
}