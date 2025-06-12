/**
 * advancedFeatures.ts
 * Integration module for all advanced features in Dynamic Island component
 */

import { LoadingController } from './loadingEffects';
import { initLoader, simulateLoading } from './loaderUtils';
import { DynamicSizing, initDynamicSizing } from './dynamicSizing';
import { 
  HapticFeedback, 
  createHapticFeedback, 
  HapticIntensity, 
  HapticUtils 
} from './hapticFeedback';

/**
 * Advanced feature configuration
 */
export interface AdvancedFeaturesConfig {
  enableLoading?: boolean;
  enableDynamicSizing?: boolean;
  enableHapticFeedback?: boolean;
  loadingShowPercentage?: boolean;
  loadingDuration?: number;
  hapticIntensity?: HapticIntensity;
  sizingOptions?: {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    padding?: number;
  };
}

/**
 * Manages and coordinates all advanced features for a Dynamic Island component
 */
export class AdvancedFeatures {
  private element: HTMLElement;
  private config: Required<AdvancedFeaturesConfig>;
  
  // Feature controllers
  private loadingController: LoadingController | null = null;
  private sizingController: DynamicSizing | null = null;
  private hapticController: HapticFeedback | null = null;
  
  constructor(element: HTMLElement, options: AdvancedFeaturesConfig = {}) {
    this.element = element;
    
    // Default configuration
    this.config = {
      enableLoading: options.enableLoading !== undefined ? options.enableLoading : true,
      enableDynamicSizing: options.enableDynamicSizing !== undefined ? options.enableDynamicSizing : true,
      enableHapticFeedback: options.enableHapticFeedback !== undefined ? options.enableHapticFeedback : true,
      loadingShowPercentage: options.loadingShowPercentage !== undefined ? options.loadingShowPercentage : true,
      loadingDuration: options.loadingDuration || 2000,
      hapticIntensity: options.hapticIntensity || HapticIntensity.Medium,
      sizingOptions: {
        minWidth: options.sizingOptions?.minWidth || 120,
        maxWidth: options.sizingOptions?.maxWidth || 400,
        minHeight: options.sizingOptions?.minHeight || 36,
        maxHeight: options.sizingOptions?.maxHeight || 300,
        padding: options.sizingOptions?.padding || 16,
      }
    };
    
    // Initialize enabled features
    this.initializeFeatures();
  }
  
  /**
   * Initialize all enabled features
   * @private
   */
  private initializeFeatures(): void {
    // Initialize haptic feedback (do this first as other features may use it)
    if (this.config.enableHapticFeedback) {
      this.hapticController = createHapticFeedback({
        enabled: true,
        defaultIntensity: this.config.hapticIntensity
      });
    }
    
    // Initialize dynamic sizing
    if (this.config.enableDynamicSizing) {
      this.sizingController = initDynamicSizing(this.element, {
        ...this.config.sizingOptions,
        onResize: (dimensions) => {
          // Trigger light haptic feedback on resize if enabled
          if (this.hapticController) {
            this.hapticController.trigger(HapticIntensity.Light);
          }
        }
      });
    }
  }
  
  /**
   * Start loading animation
   * @param options Loading options
   * @returns Promise that resolves when loading completes
   */
  public startLoading(options: {
    duration?: number;
    showPercentage?: boolean;
    onProgress?: (percentage: number) => void;
    onComplete?: () => void;
  } = {}): Promise<void> {
    if (!this.config.enableLoading) {
      return Promise.resolve();
    }
    
    const duration = options.duration || this.config.loadingDuration;
    const showPercentage = options.showPercentage !== undefined 
      ? options.showPercentage 
      : this.config.loadingShowPercentage;
    
    // If element has the loading state class
    if (this.element.classList.contains('overlay-card--loading')) {
      // Create content element if needed (for loader)
      let contentEl = this.element.querySelector('.overlay-card-content');
      if (!contentEl) {
        contentEl = document.createElement('div');
        contentEl.className = 'overlay-card-content';
        this.element.appendChild(contentEl);
      }
      
      // Initialize loader
      this.loadingController = initLoader(contentEl as HTMLElement, {
        duration,
        showPercentage,
        onProgress: (percentage) => {
          if (options.onProgress) {
            options.onProgress(percentage);
          }
          
          // Trigger haptic at 0%, 50% and 100% if enabled
          if (this.hapticController && (percentage === 0 || percentage === 50 || percentage === 100)) {
            this.hapticController.trigger(
              percentage === 100 ? HapticIntensity.Success : HapticIntensity.Light
            );
          }
        },
        onComplete: options.onComplete
      });
      
      // Return promise that resolves when loading completes
      return simulateLoading(duration, options.onProgress);
    }
    
    return Promise.resolve();
  }
  
  /**
   * Trigger haptic feedback
   * @param intensity Haptic intensity level
   * @returns Whether haptic feedback was triggered
   */
  public triggerHaptic(intensity?: HapticIntensity): boolean {
    if (!this.config.enableHapticFeedback || !this.hapticController) {
      return false;
    }
    
    return this.hapticController.trigger(intensity || this.config.hapticIntensity);
  }
  
  /**
   * Update dynamic sizing
   * @returns Current dimensions
   */
  public updateSize(): { width: number; height: number } | null {
    if (!this.config.enableDynamicSizing || !this.sizingController) {
      return null;
    }
    
    this.sizingController.resize();
    
    return {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight
    };
  }
  
  /**
   * Reset dynamic sizing to initial dimensions
   */
  public resetSize(): void {
    if (this.sizingController) {
      this.sizingController.reset();
    }
  }
  
  /**
   * Cleanup resources
   */
  public destroy(): void {
    if (this.loadingController) {
      this.loadingController.destroy();
    }
    
    if (this.sizingController) {
      this.sizingController.destroy();
    }
  }
  
  /**
   * Get haptic controller instance
   */
  public getHapticController(): HapticFeedback | null {
    return this.hapticController;
  }
}

/**
 * Initialize advanced features on a Dynamic Island element
 * @param element Target overlay card element
 * @param config Configuration options
 * @returns AdvancedFeatures controller instance
 */
export const initAdvancedFeatures = (
  element: HTMLElement,
  config: AdvancedFeaturesConfig = {}
): AdvancedFeatures => {
  return new AdvancedFeatures(element, config);
};
