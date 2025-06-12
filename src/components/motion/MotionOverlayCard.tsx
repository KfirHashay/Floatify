import React from 'react';
import { motion } from "motion/react";
import useAggregator from '../state/hooks/useAggregator';
import { OverlayCard } from '../core/card/OverlayCard';
import type { OverlayCard as OverlayCardType } from '../state/types';

interface MotionOverlayCardProps {
  channelId: string;
  card?: OverlayCardType;
}

function usePrefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function MotionOverlayCard({ channelId, card }: MotionOverlayCardProps) {
  const { state } = useAggregator();
  const channel = state.channels[channelId];
  if (!channel) return null;

  const reduceMotion = usePrefersReducedMotion();
  const variants = {
    collapsed: { scale: 0.95, opacity: 1 },
    expanded: { scale: 1, opacity: 1 },
    bubble: { scale: 0.9, opacity: 1 },
    hidden: { scale: 0.8, opacity: 0 },
  } as const;

  const current = (channel.state in variants ? channel.state : 'collapsed') as keyof typeof variants;

  return (
    <motion.div
      variants={variants}
      animate={reduceMotion ? false : current}
      initial={false}
      style={{ display: 'contents' }}
    >
      <OverlayCard channelId={channelId} card={card} />
    </motion.div>
  );
}
