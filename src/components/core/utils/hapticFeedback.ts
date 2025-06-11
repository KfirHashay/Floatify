/**
 * hapticFeedback.ts
 * Optional haptic feedback integration for Dynamic Island interactions
 */

/**
 * Haptic feedback intensity levels
 */
export enum HapticIntensity {
    Light = 'light',
    Medium = 'medium',
    Heavy = 'heavy',
    Success = 'success',
    Warning = 'warning',
    Error = 'error',
    Selection = 'selection',
}

/**
 * Haptic feedback options
 */
export interface HapticOptions {
    enabled?: boolean;
    defaultIntensity?: HapticIntensity;
}

/**
 * Haptic feedback controller for enhanced tactile interactions
 */
export class HapticFeedback {
    private isEnabled: boolean;
    private defaultIntensity: HapticIntensity;
    private hasVibrationAPI: boolean;
    private hasSafariAPI: boolean;

    constructor(options: HapticOptions = {}) {
        this.isEnabled = options.enabled !== undefined ? options.enabled : true;
        this.defaultIntensity = options.defaultIntensity || HapticIntensity.Medium;

        // Check for browser support
        this.hasVibrationAPI = 'vibrate' in navigator;
        // Use type assertion for Safari-specific WebKit API
        this.hasSafariAPI = 'window' in globalThis && 'webkit' in window && 'notification' in (window as any).webkit;

        // If no support is available, disable haptics
        if (!this.hasVibrationAPI && !this.hasSafariAPI) {
            this.isEnabled = false;
        }
    }

    /**
     * Trigger haptic feedback with specified intensity
     * @param intensity The intensity level for the haptic feedback
     * @returns Whether the haptic feedback was successfully triggered
     */
    public trigger(intensity?: HapticIntensity): boolean {
        if (!this.isEnabled) return false;

        const level = intensity || this.defaultIntensity;

        // Try to use the most appropriate API based on platform and intensity
        if (this.hasSafariAPI) {
            return this.triggerSafariHaptic(level);
        } else if (this.hasVibrationAPI) {
            return this.triggerVibrationHaptic(level);
        }

        return false;
    }

    /**
     * Trigger haptic feedback using Safari's Haptic API (iOS)
     * @private
     */
    private triggerSafariHaptic(intensity: HapticIntensity): boolean {
        // This is iOS-specific
        // Type assertion for Safari-specific API
        if (!(window as any).webkit?.messageHandlers?.futureHandler) return false;

        try {
            switch (intensity) {
                case HapticIntensity.Light:
                    // Type assertion for Safari-specific API
                    (window as any).webkit.messageHandlers.futureHandler.postMessage({
                        name: 'impactOccurred',
                        args: { style: 0 }, // UIImpactFeedbackStyleLight
                    });
                    break;
                case HapticIntensity.Medium:
                    // Type assertion for Safari-specific API
                    (window as any).webkit.messageHandlers.futureHandler.postMessage({
                        name: 'impactOccurred',
                        args: { style: 1 }, // UIImpactFeedbackStyleMedium
                    });
                    break;
                case HapticIntensity.Heavy:
                    // Type assertion for Safari-specific API
                    (window as any).webkit.messageHandlers.futureHandler.postMessage({
                        name: 'impactOccurred',
                        args: { style: 2 }, // UIImpactFeedbackStyleHeavy
                    });
                    break;
                case HapticIntensity.Success:
                    // Type assertion for Safari-specific API
                    (window as any).webkit.messageHandlers.futureHandler.postMessage({
                        name: 'notificationOccurred',
                        args: { type: 0 }, // UINotificationFeedbackTypeSuccess
                    });
                    break;
                case HapticIntensity.Warning:
                    // Type assertion for Safari-specific API
                    (window as any).webkit.messageHandlers.futureHandler.postMessage({
                        name: 'notificationOccurred',
                        args: { type: 1 }, // UINotificationFeedbackTypeWarning
                    });
                    break;
                case HapticIntensity.Error:
                    // Type assertion for Safari-specific API
                    (window as any).webkit.messageHandlers.futureHandler.postMessage({
                        name: 'notificationOccurred',
                        args: { type: 2 }, // UINotificationFeedbackTypeError
                    });
                    break;
                case HapticIntensity.Selection:
                    // Type assertion for Safari-specific API
                    (window as any).webkit.messageHandlers.futureHandler.postMessage({
                        name: 'selectionChanged',
                    });
                    break;
            }
            return true;
        } catch (err) {
            console.warn('Safari haptic feedback failed:', err);
            return false;
        }
    }

    /**
     * Trigger haptic feedback using the Vibration API (Android/other)
     * @private
     */
    private triggerVibrationHaptic(intensity: HapticIntensity): boolean {
        if (!this.hasVibrationAPI) return false;

        try {
            switch (intensity) {
                case HapticIntensity.Light:
                    navigator.vibrate(15);
                    break;
                case HapticIntensity.Medium:
                    navigator.vibrate(30);
                    break;
                case HapticIntensity.Heavy:
                    navigator.vibrate(50);
                    break;
                case HapticIntensity.Success:
                    navigator.vibrate([30, 50, 30]);
                    break;
                case HapticIntensity.Warning:
                    navigator.vibrate([30, 60, 60]);
                    break;
                case HapticIntensity.Error:
                    navigator.vibrate([60, 50, 60, 50]);
                    break;
                case HapticIntensity.Selection:
                    navigator.vibrate(10);
                    break;
            }
            return true;
        } catch (err) {
            console.warn('Vibration API failed:', err);
            return false;
        }
    }

    /**
     * Enable haptic feedback
     */
    public enable(): void {
        this.isEnabled = true;
    }

    /**
     * Disable haptic feedback
     */
    public disable(): void {
        this.isEnabled = false;
    }

    /**
     * Check if haptic feedback is enabled
     */
    public isHapticEnabled(): boolean {
        return this.isEnabled;
    }

    /**
     * Check if the device supports haptic feedback
     */
    public isSupported(): boolean {
        return this.hasVibrationAPI || this.hasSafariAPI;
    }

    /**
     * Set the default intensity level
     */
    public setDefaultIntensity(intensity: HapticIntensity): void {
        this.defaultIntensity = intensity;
    }
}

/**
 * Create and initialize a haptic feedback controller
 */
export const createHapticFeedback = (options: HapticOptions = {}): HapticFeedback => {
    return new HapticFeedback(options);
};

/**
 * Utility functions for common haptic patterns
 */
export const HapticUtils = {
    /**
     * Trigger a success haptic pattern
     */
    triggerSuccess: (haptic: HapticFeedback): boolean => {
        return haptic.trigger(HapticIntensity.Success);
    },

    /**
     * Trigger an error haptic pattern
     */
    triggerError: (haptic: HapticFeedback): boolean => {
        return haptic.trigger(HapticIntensity.Error);
    },

    /**
     * Trigger a warning haptic pattern
     */
    triggerWarning: (haptic: HapticFeedback): boolean => {
        return haptic.trigger(HapticIntensity.Warning);
    },

    /**
     * Trigger a selection haptic feedback
     */
    triggerSelection: (haptic: HapticFeedback): boolean => {
        return haptic.trigger(HapticIntensity.Selection);
    },
};
