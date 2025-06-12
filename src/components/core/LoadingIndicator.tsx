import React from 'react';
import { motion } from "motion/react";
import '../style/components/loading-indicator.css';
import { prefersReducedMotion } from '../../motion/utils';

export default function LoadingIndicator() {
    const reduceMotion = prefersReducedMotion();
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
