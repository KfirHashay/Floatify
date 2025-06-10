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
    } = useAggregator();

    const touchStartX = useRef<number | null>(null);
    const touchDeltaX = useRef(0);
    const swipeTriggered = useRef(false);
    const [direction, setDirection] = useState<'next' | 'prev' | null>(null);

    const channel = state.channels[channelId];
    if (!channel) return null;

    const isExpanded = channel.state === 'expanded';
    const isLoading = channel.state === 'loading';
    const isIconOnly = channel.state === 'icon';
    const isHidden = channel.state === 'hidden';

    // 🔹 Toggle expand/collapse on click
    const handleToggle = useCallback(() => {
        if (swipeTriggered.current) {
            swipeTriggered.current = false;
            return;
        }
        if (isLoading || isIconOnly || isHidden) return;
        updateChannelState(channelId, isExpanded ? 'collapsed' : 'expanded');
    }, [channelId, isExpanded, updateChannelState, isLoading, isIconOnly, isHidden]);

    const handleTouchStart = (e: React.TouchEvent) => {
        if (isLoading || isIconOnly || isHidden) return;
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isLoading || isIconOnly || isHidden) return;
        if (touchStartX.current !== null) {
            touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
        }
    };

    const handleTouchEnd = () => {
        if (isLoading || isIconOnly || isHidden) return;
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
        : isIconOnly
        ? 'overlay-card--icon'
        : isExpanded
        ? 'overlay-card--expanded'
        : 'overlay-card--collapsed';

    return (
        <div
            className={`overlay-card ${stateClass} ${directionClass}`}
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
            {/* 🔹 Loading State */}
            {isLoading && (
                <>
                    <LoadingIndicator />
                    {card?.title && (
                        <span className="overlay-card-title">{card.title}</span>
                    )}
                </>
            )}

            {/* 🔹 Icon Only State */}
            {isIconOnly && card?.icon && (
                <div className="overlay-card-icon" aria-hidden="true">
                    {card.icon}
                </div>
            )}

            {/* 🔹 Normal Content */}
            {!isLoading && !isIconOnly && !isHidden && card && (
                <>
                    {card.icon && (
                        <div className="overlay-card-icon\" aria-hidden="true">
                            {card.icon}
                        </div>
                    )}
                    <div className="overlay-card-content">
                        {card.title && (
                            <h3 className="overlay-card-title">{card.title}</h3>
                        )}
                        <p className="overlay-card-body">
                            {card.content}
                        </p>
                    </div>
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