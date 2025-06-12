import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion';
import { OverlayPortal, OverlayPortalProps } from '../core/portal';

function usePrefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function MotionOverlayPortal(props: OverlayPortalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (ref.current) setRoot(ref.current);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      {root && <OverlayPortal {...props} portalRoot={root} />}
    </motion.div>
  );
}
