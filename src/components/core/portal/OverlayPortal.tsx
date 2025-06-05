/**
 * OverlayPortal.tsx
 *
 * Manages overlay rendering through React Portal.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import useAggregator from '../../state/hooks/useAggregator';
import { OverlayCard as DefaultCardUI } from '../card/OverlayCard';
import '../../style/index.css';

interface OverlayPortalProps {
    concurrencyMode?: 'single' | 'multiple';
    portalRoot?: HTMLElement;
    unstyled?: boolean;
    autoDismiss?: boolean;
}

export function OverlayPortal({ concurrencyMode = 'single', portalRoot, unstyled }: OverlayPortalProps) {
    const overlayClass = `overlay-library ${unstyled ? '' : 'overlay-styled'}`;
    const { state, getActiveChannel, getActiveCard } = useAggregator();
    const root = portalRoot ?? document.body;

    // 🔹 SINGLE CONCURRENCY MODE: Only show the active channel's card
    if (concurrencyMode === 'single') {
        const activeChannel = getActiveChannel();
        // Nothing to render when there is no active channel
        if (!activeChannel) return null;

        const activeCard = getActiveCard(activeChannel.channelId);
        // Guard against an active channel with no cards
        if (!activeCard) return null;

        return ReactDOM.createPortal(
            <div className={overlayClass}>
                <DefaultOverlay channelId={activeChannel.channelId} cardId={activeCard.id} />
            </div>,
            root
        );
    }

    // 🔹 MULTIPLE CONCURRENCY MODE: Display multiple active overlays
    const activeChannels = Object.values(state.channels).filter((ch) => ch.cards.length > 0);
    // Nothing to render if no channel currently holds cards
    if (activeChannels.length === 0) return null;

    const overlays = activeChannels
        .map((channel) => {
            const activeCard = getActiveCard(channel.channelId);
            return activeCard ? (
                <DefaultOverlay
                    key={channel.channelId}
                    channelId={channel.channelId}
                    cardId={activeCard.id}
                />
            ) : null;
        })
        .filter(Boolean);

    // Guard against channels that have no active cards
    if (overlays.length === 0) return null;

    return ReactDOM.createPortal(
        <div className={overlayClass}>
            <div className="overlay-multiple-container">{overlays}</div>
        </div>,
        root
    );
}

/**
 * DefaultOverlay
 *
 * Fetches the correct card from the aggregator and renders it.
 */
function DefaultOverlay({ channelId, cardId }: { channelId: string; cardId: string }) {
    const { removeCard, swipeNextCard, swipePrevCard, state } = useAggregator();

    const channel = state.channels[channelId];
    if (!channel) return null;

    const card = channel.cards.find((c) => c.id === cardId);
    if (!card) return null;

    return (
        <div className="overlay-container">
            <div className="overlay-portal" data-state={channel.state}>
                <DefaultCardUI
                    channelId={channelId}
                    card={card}
                    //     onRemove={() => removeCard(channelId, cardId)}
                    // onSwipeNext={() => swipeNextCard(channelId)}
                    //   onSwipePrev={() => swipePrevCard(channelId)}
                />
            </div>
        </div>
    );
}
