import React from 'react';
import { motion } from 'motion';
import '../style/components/loading-indicator.css';

function usePrefersReducedMotion() {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function LoadingIndicator() {
    const reduceMotion = usePrefersReducedMotion();
    return (
        <div className="loading-indicator" role="status" aria-label="Loading">
            <motion.div
                className="loading-spinner"
                animate={reduceMotion ? undefined : { rotate: 360 }}
                transition={reduceMotion ? undefined : { repeat: Infinity, duration: 1 }}
            />
        </div>
    );
}
