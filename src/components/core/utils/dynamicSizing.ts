/**
 * dynamicSizing.ts
 * Content-aware dynamic sizing for the Dynamic Island component
 */

interface SizingOptions {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  padding?: number;
  resizeInterval?: number;
  onResize?: (dimensions: { width: number; height: number }) => void;
}

/**
 * Manages content-aware dynamic sizing for overlay cards
 */
export class DynamicSizing {
  private element: HTMLElement;
  private contentElement: HTMLElement | null = null;
  private observer: ResizeObserver | null = null;
  private options: Required<SizingOptions>;
  private resizeTimeout: ReturnType<typeof setTimeout> | null = null;
  private initialDimensions: { width: number; height: number };

  constructor(element: HTMLElement, options: SizingOptions = {}) {
    this.element = element;
    
    // Find the content element
    this.contentElement = element.querySelector('.overlay-card-content');
    
    // Default options
    this.options = {
      minWidth: options.minWidth || 120,
      maxWidth: options.maxWidth || 400,
      minHeight: options.minHeight || 36,
      maxHeight: options.maxHeight || 300,
      padding: options.padding || 16,
      resizeInterval: options.resizeInterval || 100,
      onResize: options.onResize || (() => {}),
    };
    
    // Store initial dimensions
    this.initialDimensions = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
    
    // Initialize
    this.initObserver();
  }
  
  /**
   * Initialize the resize observer
   */
  private initObserver(): void {
    // Only continue if ResizeObserver is available
    if (typeof ResizeObserver === 'undefined') {
      console.warn('ResizeObserver not available for dynamic sizing');
      return;
    }
    
    // Create observer to watch content changes
    this.observer = new ResizeObserver(this.handleResize.bind(this));
    
    // Start observing the content element if available
    if (this.contentElement) {
      this.observer.observe(this.contentElement);
    }
  }
  
  /**
   * Handle resize events with debouncing
   */
  private handleResize(): void {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    
    this.resizeTimeout = setTimeout(() => {
      this.updateDimensions();
    }, this.options.resizeInterval);
  }
  
  /**
   * Calculate and apply new dimensions based on content
   */
  private updateDimensions(): void {
    if (!this.contentElement) return;
    
    // Get the content's actual size (including all children)
    // We'll use scroll dimensions to capture all content
    const contentWidth = this.contentElement.scrollWidth;
    const contentHeight = this.contentElement.scrollHeight;
    
    // Calculate new dimensions with padding
    let newWidth = Math.min(
      this.options.maxWidth,
      Math.max(this.options.minWidth, contentWidth + (this.options.padding * 2))
    );
    
    let newHeight = Math.min(
      this.options.maxHeight,
      Math.max(this.options.minHeight, contentHeight + (this.options.padding * 2))
    );
    
    // Check if we actually need to resize
    const currentWidth = this.element.offsetWidth;
    const currentHeight = this.element.offsetHeight;
    
    if (Math.abs(newWidth - currentWidth) > 2 || Math.abs(newHeight - currentHeight) > 2) {
      // Apply smooth transition
      this.element.style.transition = 'width 0.3s var(--di-spring-timing-subtle), height 0.3s var(--di-spring-timing-subtle)';
      
      // Set new dimensions
      this.element.style.width = `${newWidth}px`;
      this.element.style.height = `${newHeight}px`;
      
      // Trigger callback
      this.options.onResize({ width: newWidth, height: newHeight });
      
      // Reset transition after animation completes
      setTimeout(() => {
        this.element.style.transition = '';
      }, 300);
    }
  }
  
  /**
   * Manually trigger a resize calculation
   */
  public resize(): void {
    this.updateDimensions();
  }
  
  /**
   * Reset to initial dimensions
   */
  public reset(): void {
    this.element.style.width = `${this.initialDimensions.width}px`;
    this.element.style.height = `${this.initialDimensions.height}px`;
  }
  
  /**
   * Clean up resources
   */
  public destroy(): void {
    if (this.observer && this.contentElement) {
      this.observer.unobserve(this.contentElement);
      this.observer.disconnect();
    }
    
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }
}

/**
 * Initialize dynamic sizing on an overlay card element
 * @param element The overlay card element
 * @param options Configuration options
 * @returns DynamicSizing controller instance
 */
export const initDynamicSizing = (
  element: HTMLElement,
  options: SizingOptions = {}
): DynamicSizing => {
  return new DynamicSizing(element, options);
};
