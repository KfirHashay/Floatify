import React, { useCallback, useRef, useState } from 'react';
import useAggregator from '../../state/hooks/useAggregator';
import type { OverlayCard as OverlayCardType } from '../../state/types';
import LoadingIndicator from '../LoadingIndicator';

interface OverlayCardProps {
    channelId: string;
    card?: OverlayCardType;
}

export function OverlayCard({ channelId, card }: OverlayCardProps) {
    const {
        state,
        updateChannelState,
        removeCard,
        swipeNextCard,
        swipePrevCard,
        config,
    } = useAggregator();

    const touchStartX = useRef<number | null>(null);
    const touchDeltaX = useRef(0);
    const swipeTriggered = useRef(false);
    const [direction, setDirection] = useState<'next' | 'prev' | null>(null);

    const channel = state.channels[channelId];
    
    if (!channel) {
        return null;
    }

    const { splitLoading, defaultBubbleIcons } = config;

    const isExpanded = channel.state === 'expanded';
    const isLoading = channel.state === 'loading';
    const isBubble = channel.state === 'bubble';
    const isSplit = channel.state === 'split' || (isLoading && splitLoading);
    const isHidden = channel.state === 'hidden';
    
    // Use bubbleIcon from card, or fallback to default icons based on state
    const bubbleIconNode =
        card?.bubbleIcon ??
        (isLoading
            ? defaultBubbleIcons.loading
            : channel.state === 'alert'
            ? defaultBubbleIcons.alert
            : defaultBubbleIcons.message);

    // 🔹 Toggle expand/collapse on click
    const handleToggle = useCallback(() => {
        if (swipeTriggered.current) {
            swipeTriggered.current = false;
            return;
        }
        if (isLoading || isBubble || isHidden) return;
        updateChannelState(channelId, isExpanded ? 'collapsed' : 'expanded');
    }, [channelId, isExpanded, updateChannelState, isLoading, isBubble, isHidden]);

    const handleTouchStart = (e: React.TouchEvent) => {
        if (isLoading || isBubble || isHidden) return;
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isLoading || isBubble || isHidden) return;
        if (touchStartX.current !== null) {
            touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
        }
    };

    const handleTouchEnd = () => {
        if (isLoading || isBubble || isHidden) return;
        if (touchStartX.current === null) return;
        
        const deltaX = touchDeltaX.current;
        const THRESHOLD = 50;
        
        if (Math.abs(deltaX) >= THRESHOLD) {
            swipeTriggered.current = true;
            if (deltaX < 0) {
                setDirection('next');
                swipeNextCard(channelId);
            } else {
                setDirection('prev');
                swipePrevCard(channelId);
            }
            
            // Reset direction after animation completes
            setTimeout(() => {
                setDirection(null);
                swipeTriggered.current = false;
            }, 200); // Match animation duration
        }
        
        touchStartX.current = null;
        touchDeltaX.current = 0;
    };

    const directionClass =
        direction === 'next'
            ? 'overlay-card--swipe-left'
            : direction === 'prev'
            ? 'overlay-card--swipe-right'
            : '';

    const stateClass = isHidden
        ? 'overlay-card--hidden'
        : isLoading
        ? 'overlay-card--loading'
        : isBubble
        ? 'overlay-card--bubble'
        : isExpanded
        ? 'overlay-card--expanded'
        : 'overlay-card--collapsed';
    const splitClass = isSplit ? 'overlay-card--split' : '';

    return (
        <div
            className={`overlay-card glass-effect ${stateClass} ${splitClass} ${directionClass}`}
            onClick={handleToggle}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-label={`Overlay Card - ${card?.title ?? 'Loading'}`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggle();
                }
            }}
        >

            {isSplit ? (
                <>
                    <div className="overlay-card-split-main">
                        {isLoading ? (
                            <>
                                <LoadingIndicator />
                                {card?.title && (
                                    <span className="overlay-card-title">{card.title}</span>
                                )}
                            </>
                        ) : (
                            !isHidden && card && (
                                <>
                                    <div className="overlay-card-content">
                                        {card.title && (
                                            <h3 className="overlay-card-title">{card.title}</h3>
                                        )}
                                        <p className="overlay-card-body">{card.content}</p>
                                    </div>
                                </>
                            )
                        )}
                    </div>
                    <div
                        className="overlay-card-split-bubble"
                        role="button"
                        aria-label={card?.title ? `Show ${card.title}` : 'Show overlay'}
                        aria-haspopup="true"
                    >
                        {bubbleIconNode}
                    </div>
                </>
            ) : (
                <>
                    {/* 🔹 Loading State */}
                    {isLoading && (
                        <>
                            <LoadingIndicator />
                            {card?.title && (
                                <span className="overlay-card-title">{card.title}</span>
                            )}
                        </>
                    )}

                    {/* 🔹 Bubble State */}
                    {isBubble && (
                        <div
                            className="overlay-card-bubble-icon"
                            role="button"
                            aria-label={card?.title ? `Show ${card.title}` : 'Show overlay'}
                            aria-haspopup="true"
                        >
                            {bubbleIconNode}
                        </div>
                    )}

                    {/* 🔹 Normal Content */}
                    {!isLoading && !isBubble && !isHidden && card && (
                        <>
                            <div className="overlay-card-content">
                                {card.title && (
                                    <h3 className="overlay-card-title">{card.title}</h3>
                                )}
                                <p className="overlay-card-body">{card.content}</p>
                            </div>
                        </>
                    )}
                </>
            )}
            {/* 🔹 Actions (only in expanded mode) */}
            {isExpanded && (
                <div className="overlay-card-actions">
                    <button
                        className="overlay-card-swipe-prev"
                        aria-label="Previous item"
                        onClick={(e) => {
                            e.stopPropagation();
                            swipePrevCard(channelId);
                        }}
                    >
                        ◀
                    </button>
                    <button
                        className="overlay-card-remove"
                        aria-label="Close overlay"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (card) removeCard(channelId, card.id);
                        }}
                    >
                        ✖
                    </button>
                    <button
                        className="overlay-card-swipe-next"
                        aria-label="Next item"
                        onClick={(e) => {
                            e.stopPropagation();
                            swipeNextCard(channelId);
                        }}
                    >
                        ▶
                    </button>
                </div>
            )}
        </div>
    );
}