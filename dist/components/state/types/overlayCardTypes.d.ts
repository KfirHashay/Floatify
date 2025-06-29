/**
 * overlayCardTypes.ts
 *
 * Represents a single visual card or message
 * in the overlay system's queue. Replaces 'ToastItem'.
 */
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
     * Optional timestamp or numeric marker for sorting/analytics.
     */
    timestamp?: number;
}
//# sourceMappingURL=overlayCardTypes.d.ts.map