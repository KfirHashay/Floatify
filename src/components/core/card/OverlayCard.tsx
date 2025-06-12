import React, { useCallback, useRef, useState } from 'react';
import { motion } from 'motion/react';
import useAggregator from '../../state/hooks/useAggregator';
import type { OverlayCard as OverlayCardType } from '../../state/types';
import LoadingIndicator from '../LoadingIndicator';
import {
    secondarySwipe,
    longPressPulse,
    prefersReducedMotion,
} from '../../../motion';

interface OverlayCardProps {
    channelId: string;
    card?: OverlayCardType;
    swipeActionLeft?: () => void;
    swipeActionRight?: () => void;
    onDoubleClickAction?: () => void;
    onSwipeSecondary?: () => void;
    onLongPressAction?: () => void;
}

export function OverlayCard({
    channelId,
    card,
    swipeActionLeft,
    swipeActionRight,
    onDoubleClickAction,
    onSwipeSecondary,
    onLongPressAction,
}: OverlayCardProps) {
    const {
        state,
        updateChannelState,
        removeCard,
        swipeNextCard,
        swipePrevCard,
        config,
    } = useAggregator();

    const swipeTriggered = useRef(false);
    const longPressTimeout = useRef<number | null>(null);
    const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
    const reduceMotion = prefersReducedMotion();

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

    const handleDoubleClick = useCallback(() => {
        if (isLoading || isBubble || isHidden) return;
        onDoubleClickAction?.();
    }, [isLoading, isBubble, isHidden, onDoubleClickAction]);

    const handleDragEnd = useCallback(
        (_: any, info: { offset: { x: number } }) => {
            if (isLoading || isBubble || isHidden) return;
            const deltaX = info.offset.x;
            const THRESHOLD = 50;

            if (Math.abs(deltaX) >= THRESHOLD) {
                swipeTriggered.current = true;
                if (deltaX < 0) {
                    setDirection('next');
                    if (swipeActionLeft) swipeActionLeft();
                    else swipeNextCard(channelId);
                } else {
                    setDirection('prev');
                    if (swipeActionRight) swipeActionRight();
                    else swipePrevCard(channelId);
                }
                onSwipeSecondary?.();

                setTimeout(() => {
                    setDirection(null);
                    swipeTriggered.current = false;
                }, 200);
            }
        },
        [
            isLoading,
            isBubble,
            isHidden,
            swipeActionLeft,
            swipeActionRight,
            onSwipeSecondary,
            swipeNextCard,
            swipePrevCard,
            channelId,
        ]
    );

    const handlePointerDown = () => {
        if (!onLongPressAction) return;
        longPressTimeout.current = window.setTimeout(() => {
            onLongPressAction();
        }, 500);
    };

    const handlePointerUp = () => {
        if (longPressTimeout.current) {
            clearTimeout(longPressTimeout.current);
            longPressTimeout.current = null;
        }
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

    const swipeProps = secondarySwipe();
    const pressProps = longPressPulse();
    const motionGestures = { ...swipeProps, ...pressProps };
    if (reduceMotion) {
        // Disable inertia when the user prefers reduced motion
        (motionGestures as any).dragMomentum = false;
    }

    return (
        <motion.div
            data-testid={card?.id}
            className={`overlay-card glass-effect ${stateClass} ${splitClass} ${directionClass}`}
            onClick={handleToggle}
            onDoubleClick={handleDoubleClick}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onDragEnd={handleDragEnd}
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
            {...motionGestures}
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
        </motion.div>
    );
}
