/**
 * loaderUtils.tsx
 * Utility functions for creating and managing loading animations in the Dynamic Island
 */

import React, { JSX } from 'react';
import { LoadingController } from './loadingEffects';

/**
 * Creates a spinner loader element
 * @param showPercentage Whether to show percentage counter (true) or dots (false)
 */
export const createLoaderElement = (showPercentage: boolean = true): JSX.Element => {
    return (
        <div className="overlay-spinner">
            <svg className="spinner-circle" viewBox="0 0 36 36">
                <circle className="spinner-track" cx="18" cy="18" r="16" />
                <circle className="spinner-progress" cx="18" cy="18" r="16" />
            </svg>
            {showPercentage ? (
                <div className="counter-container">
                    <div className="counter-number">0%</div>
                </div>
            ) : (
                <div className="loading-dots">
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                </div>
            )}
        </div>
    );
};

/**
 * Initialize loading animation on an existing element
 * @param element DOM element to attach the loader to
 * @param options Configuration options
 * @returns LoadingController instance
 */
export const initLoader = (
    element: HTMLElement,
    options: {
        duration?: number;
        showPercentage?: boolean;
        onProgress?: (percentage: number) => void;
        onComplete?: () => void;
    } = {}
): LoadingController => {
    const loader = new LoadingController(element, {
        duration: options.duration || 2000,
        showPercentage: options.showPercentage !== undefined ? options.showPercentage : true,
        onProgress: options.onProgress,
        onComplete: options.onComplete,
    });

    return loader.start();
};

/**
 * Simulates a loading process with optional progress callback
 * @param duration Total duration in milliseconds
 * @param onProgress Callback function for progress updates
 * @returns Promise that resolves when loading completes
 */
export const simulateLoading = (duration: number = 2000, onProgress?: (percentage: number) => void): Promise<void> => {
    return new Promise((resolve) => {
        const startTime = performance.now();

        const updateProgress = () => {
            const now = performance.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const percentage = Math.floor(progress * 100);

            if (onProgress) {
                onProgress(percentage);
            }

            if (progress < 1) {
                requestAnimationFrame(updateProgress);
            } else {
                resolve();
            }
        };

        updateProgress();
    });
};
