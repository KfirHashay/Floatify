import React, { useCallback, useRef, useState } from 'react';
import useAggregator from '../../state/hooks/useAggregator';
import type { OverlayCard as OverlayCardType } from '../../state/types';

interface OverlayCardProps {
    channelId: string;
    card: OverlayCardType;
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

    // 🔹 Toggle expand/collapse on click
    const handleToggle = useCallback(() => {
        if (swipeTriggered.current) {
            swipeTriggered.current = false;
            return;
        }
        updateChannelState(channelId, isExpanded ? 'collapsed' : 'expanded');
    }, [channelId, isExpanded, updateChannelState]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        touchDeltaX.current = 0;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartX.current !== null) {
            touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
        }
    };

    const handleTouchEnd = () => {
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
            setTimeout(() => setDirection(null), 200);
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

    return (
        <div
            className={`overlay-card ${isExpanded ? 'overlay-card--expanded' : 'overlay-card--collapsed'} ${directionClass}`}
            onClick={handleToggle}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-label={`Overlay Card - ${card.title}`}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggle();
                }
            }}
        >
            {/* 🔹 Icon */}
            {card.icon && (
                <div className="overlay-card-icon" aria-hidden="true">
                    {card.icon}
                </div>
            )}

            {/* 🔹 Content */}
            <div className="overlay-card-content">
                <h3 className="overlay-card-title">{card.title}</h3>
                <p
                    className="overlay-card-body"
                    style={{
                        opacity: isExpanded ? 1 : 0,
                        height: isExpanded ? 'auto' : 0,
                    }}
                >
                    {card.content}
                </p>
            </div>

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
                            removeCard(channelId, card.id);
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
