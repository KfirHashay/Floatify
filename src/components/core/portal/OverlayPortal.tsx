/**
 * OverlayPortal.tsx
 *
 * Manages overlay rendering through React Portal.
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
    sticky?: boolean;
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
    unstyled,
    sticky = false,
    position = 'top',
}: OverlayPortalProps) {
    const overlayClass = `overlay-library ${unstyled ? '' : 'overlay-styled'}`;
    const { state, getActiveChannel, getActiveCard } = useAggregator();
    const root = portalRoot ?? document.body;

    // 🔹 SINGLE CONCURRENCY MODE: Only show the active channel's card
    if (concurrencyMode === 'single') {
        const activeChannel = getActiveChannel();
        // Nothing to render when there is no active channel
        if (!activeChannel) return null;

        const activeCard = getActiveCard(activeChannel.channelId);
        if (!activeCard &&
            activeChannel.state !== 'loading' &&
            activeChannel.state !== 'icon') {
            return null;
        }

        return ReactDOM.createPortal(
            <div className={overlayClass}>
                <div role="status" aria-live="polite">
                    <DefaultOverlay
                        channelId={activeChannel.channelId}
                        cardId={activeCard?.id}
                        sticky={sticky}
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
    // Nothing to render if no channel currently holds cards
    if (activeChannels.length === 0) return null;

    const overlays = activeChannels
        .map((channel) => {
            const activeCard = getActiveCard(channel.channelId);
            return (
                <DefaultOverlay
                    key={channel.channelId}
                    channelId={channel.channelId}
                    cardId={activeCard?.id}
                    sticky={sticky}
                    position={position}
                />
            );
        }) as JSX.Element[];


    // Guard against channels that have no active cards
    if (overlays.length === 0) return null;

    return ReactDOM.createPortal(
        <div className={overlayClass}>
            <div role="status" aria-live="polite" className="overlay-multiple-container">
                {overlays}
            </div>

        </div>,
        root
    );
}

/**
 * DefaultOverlay
 *
 * Fetches the correct card from the aggregator and renders it.
 */
function DefaultOverlay({
    channelId,
    cardId,
    sticky,
    position,
}: {
    channelId: string;
    cardId?: string;
    sticky: boolean;
    position: string;
}) {
    const { removeCard, swipeNextCard, swipePrevCard, state } = useAggregator();

    const channel = state.channels[channelId];
    if (!channel) return null;

    const card = cardId ? channel.cards.find((c) => c.id === cardId) : undefined;
    if (!card && channel.state !== 'loading' && channel.state !== 'icon') return null;

    const portalClasses = [
        'overlay-portal',
        sticky ? 'overlay-portal--sticky' : '',
        `overlay-portal--${position}`,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className="overlay-container">
            <div className={portalClasses} data-state={channel.state}>
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
