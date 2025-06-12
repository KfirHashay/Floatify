import React from 'react';
import { motion } from 'motion/react';
import useAggregator from '../state/hooks/useAggregator';
import { OverlayCard } from '../core/card/OverlayCard';
import type { OverlayCard as OverlayCardType } from '../state/types';
import { variants, type OverlayState } from '../../motion/variants';
import { prefersReducedMotion } from '../../motion/utils';

interface MotionOverlayCardProps {
  channelId: string;
  card?: OverlayCardType;
}

export default function MotionOverlayCard({ channelId, card }: MotionOverlayCardProps) {
  const { state } = useAggregator();
  const channel = state.channels[channelId];
  if (!channel) return null;

  const reduceMotion = prefersReducedMotion();
  const currentState: OverlayState =
    (channel.state in variants ? channel.state : 'collapsed') as OverlayState;

  return (
    <motion.div
      animate={reduceMotion ? undefined : variants[currentState]}
      initial={false}
      style={{ display: 'contents' }}
    >
      <OverlayCard channelId={channelId} card={card} />
    </motion.div>
  );
}
