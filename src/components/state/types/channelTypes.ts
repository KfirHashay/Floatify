/**
 * channelTypes.ts
 *
 * Defines an overlay channel, which can store multiple OverlayCards
 * and track interaction or display states.
 */

import { OverlayCard } from './overlayCardTypes';

/**
 * OverlayState indicates the current display/interaction mode for a channel.
 */
export type OverlayState =
    | 'hidden'
    | 'collapsed'
    | 'expanded'
    | 'alert'
    | 'swiping'
    | 'loading'
    | 'icon'
    | 'split'
    | 'bubble';

/**
 * Channel represents a distinct data stream in the overlay system
 * (e.g., notifications, chat messages, calls).
 */
export interface Channel {
    /**
     * Unique channel ID (e.g., 'notifications', 'chat', or a random UUID).
     */
    channelId: string;

    /**
     * Priority determines which channel's overlays appear on top
     * if multiple channels have new cards simultaneously.
     */
    priority: number;

    /**
     * Queue of overlay cards currently associated with this channel.
     */
    cards: OverlayCard[];

    /**
     * Tracks which card is currently visible (if multiple cards are queued).
     */
    activeCardIndex: number;

    /**
     * The channel's current overlay display mode.
     */
    state: OverlayState;

    /**
     * Optional: future expansions like channel labels, icons, or styling info.
     */
    // label?: string;
    // iconUrl?: string;
}
