import React, { useEffect, useRef, useState } from 'react';
import { motion } from "motion/react"
import { OverlayPortal, OverlayPortalProps } from '../core/portal';
import { prefersReducedMotion } from '../../motion';

export default function MotionOverlayPortal(props: OverlayPortalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const reduceMotion = prefersReducedMotion();

  useEffect(() => {
    if (ref.current) setRoot(ref.current);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
    >
      {root && <OverlayPortal {...props} portalRoot={root} />}
    </motion.div>
  );
}
