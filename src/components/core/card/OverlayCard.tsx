import React, { useCallback } from 'react';
import useAggregator from '../../state/hooks/useAggregator';
import type { OverlayCard as OverlayCardType } from '../../state/types';

interface OverlayCardProps {
    channelId: string;
    card: OverlayCardType;
}

export function OverlayCard({ channelId, card }: OverlayCardProps) {
    const { state, updateChannelState, removeCard, swipeNextCard, swipePrevCard } = useAggregator();

    const channel = state.channels[channelId];
    if (!channel) return null;

    const isExpanded = channel.state === 'expanded';

    // 🔹 Toggle expand/collapse on click
    const handleToggle = useCallback(() => {
        updateChannelState(channelId, isExpanded ? 'collapsed' : 'expanded');
    }, [channelId, isExpanded, updateChannelState]);

    return (
        <div
            className={`overlay-card ${isExpanded ? 'overlay-card--expanded' : 'overlay-card--collapsed'}`}
            onClick={handleToggle} // ✅ Toggle expand/collapse on tap
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
