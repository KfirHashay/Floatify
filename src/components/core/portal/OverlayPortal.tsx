/**
 * OverlayPortal.tsx
 *
 * Fixed portal rendering with minimal DOM impact and proper positioning
 */
import React, { JSX } from 'react';
import ReactDOM from 'react-dom';
import useAggregator from '../../state/hooks/useAggregator';
import { OverlayCard as DefaultCardUI } from '../card/OverlayCard';
import '../../style/index.css';

interface OverlayPortalProps {
    concurrencyMode?: 'single' | 'multiple';
    portalRoot?: HTMLElement;
    unstyled?: boolean;
    autoDismiss?: boolean;
    fixedToViewport?: boolean;
    position?:
        | 'top'
        | 'bottom'
        | 'center'
        | 'top-left'
        | 'top-right'
        | 'bottom-left'
        | 'bottom-right';
}

export function OverlayPortal({
    concurrencyMode = 'single',
    portalRoot,
    unstyled = false,
    fixedToViewport = false,
    position = 'top',
}: OverlayPortalProps) {
    const { state, getActiveChannel, getActiveCard } = useAggregator();
    const root = portalRoot ?? document.body;

    // DEBUG: Log state to see what's happening
    console.log('[OverlayPortal] State:', state);
    console.log('[OverlayPortal] Channels:', Object.keys(state.channels));

    // 🔹 SINGLE CONCURRENCY MODE: Only show the active channel's card
    if (concurrencyMode === 'single') {
        const activeChannel = getActiveChannel();
        
        console.log('[OverlayPortal] Active channel:', activeChannel);
        
        // Nothing to render when there is no active channel
        if (!activeChannel) {
            console.log('[OverlayPortal] No active channel');
            return null;
        }

        const activeCard = getActiveCard(activeChannel.channelId);
        console.log('[OverlayPortal] Active card:', activeCard);
        
        // Show overlay if there's a card OR if channel is in loading/icon state
        const shouldShow = activeCard || 
                          activeChannel.state === 'loading' || 
                          activeChannel.state === 'icon';
        
        console.log('[OverlayPortal] Should show:', shouldShow, 'Channel state:', activeChannel.state);
        
        if (!shouldShow) {
            console.log('[OverlayPortal] Should not show overlay');
            return null;
        }

        const overlayClass = `overlay-library ${unstyled ? '' : 'overlay-styled'}`;

        return ReactDOM.createPortal(
            <div className={overlayClass}>
                <div role="status" aria-live="polite">
                    <DefaultOverlay
                        channelId={activeChannel.channelId}
                        card={activeCard}
                        fixedToViewport={fixedToViewport}
                        position={position}
                    />
                </div>
            </div>,
            root
        );
    }

    // 🔹 MULTIPLE CONCURRENCY MODE: Display multiple active overlays
    const activeChannels = Object.values(state.channels).filter(
        (ch) =>
            ch.cards.length > 0 || ch.state === 'loading' || ch.state === 'icon'
    );
    
    console.log('[OverlayPortal] Active channels (multiple mode):', activeChannels);
    
    // Nothing to render if no channel currently holds cards
    if (activeChannels.length === 0) return null;

    const overlayClass = `overlay-library ${unstyled ? '' : 'overlay-styled'}`;

    // Create container with fixed positioning for multiple overlays
    const multipleContainerClasses = [
        'overlay-multiple-container',
        fixedToViewport ? 'overlay-multiple-container--fixed' : '',
        `overlay-multiple-container--${position}`,
    ]
        .filter(Boolean)
        .join(' ');

    const overlays = activeChannels
        .map((channel) => {
            const activeCard = getActiveCard(channel.channelId);
            console.log(`[OverlayPortal] Channel ${channel.channelId} active card:`, activeCard);
            return (
                <DefaultOverlay
                    key={channel.channelId}
                    channelId={channel.channelId}
                    card={activeCard}
                    fixedToViewport={false} // Individual overlays don't need fixed positioning in multiple mode
                    position="relative" // Use relative positioning within the container
                />
            );
        }) as JSX.Element[];

    return ReactDOM.createPortal(
        <div className={overlayClass}>
            <div role="status" aria-live="polite" className={multipleContainerClasses}>
                {overlays}
            </div>
        </div>,
        root
    );
}

/**
 * DefaultOverlay
 *
 * Minimal overlay component with proper positioning and no app interference
 */
function DefaultOverlay({
    channelId,
    card,
    fixedToViewport,
    position,
}: {
    channelId: string;
    card?: any;
    fixedToViewport: boolean;
    position: string;
}) {
    const { state } = useAggregator();

    const channel = state.channels[channelId];
    console.log(`[DefaultOverlay] Channel ${channelId}:`, channel);
    console.log(`[DefaultOverlay] Card:`, card);
    
    if (!channel) {
        console.log(`[DefaultOverlay] No channel found for ${channelId}`);
        return null;
    }

    // Show overlay if there's a card OR if channel is in loading/icon state
    const shouldShow = card || 
                      channel.state === 'loading' || 
                      channel.state === 'icon';
    
    console.log(`[DefaultOverlay] Should show:`, shouldShow, 'Channel state:', channel.state);
    
    if (!shouldShow) {
        console.log(`[DefaultOverlay] Should not show for channel ${channelId}`);
        return null;
    }

    // Build portal classes with proper positioning
    const portalClasses = [
        'overlay-portal',
        fixedToViewport ? 'overlay-portal--fixed' : '',
        position !== 'relative' ? `overlay-portal--${position}` : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className="overlay-container">
            <div className={portalClasses} data-state={channel.state}>
                <DefaultCardUI
                    channelId={channelId}
                    card={card}
                />
            </div>
        </div>
    );
}