/**
 * loadingEffects.ts
 * Enhanced loading animations for Dynamic Island components
 */

interface LoadingOptions {
  duration?: number;
  showPercentage?: boolean;
  onProgress?: (percentage: number) => void;
  onComplete?: () => void;
}

/**
 * Creates and controls a loading spinner with optional percentage counter
 */
export class LoadingController {
  private element: HTMLElement | null = null;
  private counterElement: HTMLElement | null = null;
  private spinnerElement: SVGElement | null = null;
  private progressElement: SVGCircleElement | null = null;
  private startTime: number = 0;
  private duration: number = 0;
  private animationFrame: number | null = null;
  private currentPercentage: number = 0;
  private callback: ((percentage: number) => void) | null = null;
  private onCompleteCallback: (() => void) | null = null;

  constructor(containerElement: HTMLElement, options: LoadingOptions = {}) {
    this.element = containerElement;
    this.duration = options.duration || 2000;
    this.callback = options.onProgress || null;
    this.onCompleteCallback = options.onComplete || null;
    
    this.initializeSpinner(options.showPercentage);
  }

  /**
   * Creates spinner and counter elements
   */
  private initializeSpinner(showPercentage: boolean = true): void {
    if (!this.element) return;
    
    // Create spinner container
    const spinnerContainer = document.createElement('div');
    spinnerContainer.className = 'overlay-spinner';
    
    // Create SVG spinner
    const svgNS = "http://www.w3.org/2000/svg";
    const spinner = document.createElementNS(svgNS, "svg");
    spinner.setAttribute("class", "spinner-circle");
    spinner.setAttribute("viewBox", "0 0 36 36");
    
    // Create track circle
    const track = document.createElementNS(svgNS, "circle");
    track.setAttribute("class", "spinner-track");
    track.setAttribute("cx", "18");
    track.setAttribute("cy", "18");
    track.setAttribute("r", "16");
    
    // Create progress circle
    const progress = document.createElementNS(svgNS, "circle");
    progress.setAttribute("class", "spinner-progress");
    progress.setAttribute("cx", "18");
    progress.setAttribute("cy", "18");
    progress.setAttribute("r", "16");
    
    // Assemble spinner
    spinner.appendChild(track);
    spinner.appendChild(progress);
    spinnerContainer.appendChild(spinner);
    
    // Add counter if needed
    if (showPercentage) {
      const counterContainer = document.createElement('div');
      counterContainer.className = 'counter-container';
      
      const counter = document.createElement('div');
      counter.className = 'counter-number';
      counter.textContent = '0%';
      
      counterContainer.appendChild(counter);
      spinnerContainer.appendChild(counterContainer);
      this.counterElement = counter;
    } else {
      // Add animated dots instead
      const dots = document.createElement('div');
      dots.className = 'loading-dots';
      
      for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.className = 'loading-dot';
        dots.appendChild(dot);
      }
      
      spinnerContainer.appendChild(dots);
    }
    
    // Save references
    this.element.appendChild(spinnerContainer);
    this.spinnerElement = spinner;
    this.progressElement = progress;
  }
  
  /**
   * Starts the loading animation
   * @returns {LoadingController} This instance for chaining
   */
  public start(): LoadingController {
    this.startTime = performance.now();
    this.updateProgress();
    return this;
  }
  
  /**
   * Updates the progress animation frame
   */
  private updateProgress(): void {
    if (!this.progressElement) return;
    
    const now = performance.now();
    const elapsed = now - this.startTime;
    const progress = Math.min(elapsed / this.duration, 1);
    this.currentPercentage = Math.floor(progress * 100);
    
    // Update progress circle
    if (this.progressElement) {
      const circumference = 2 * Math.PI * 16;
      const strokeDasharray = `${circumference * progress}, ${circumference}`;
      this.progressElement.setAttribute('stroke-dasharray', strokeDasharray);
    }
    
    // Update counter if present
    if (this.counterElement) {
      this.counterElement.textContent = `${this.currentPercentage}%`;
    }
    
    // Call progress callback
    if (this.callback) {
      this.callback(this.currentPercentage);
    }
    
    // Continue animation or complete
    if (progress < 1) {
      this.animationFrame = requestAnimationFrame(() => this.updateProgress());
    } else {
      this.complete();
    }
  }
  
  /**
   * Completes the loading animation
   */
  private complete(): void {
    if (this.onCompleteCallback) {
      this.onCompleteCallback();
    }
  }
  
  /**
   * Sets the current progress manually
   * @param {number} percentage - Progress percentage (0-100)
   */
  public setProgress(percentage: number): void {
    if (!this.progressElement) return;
    
    this.currentPercentage = Math.min(100, Math.max(0, percentage));
    
    // Update progress circle
    if (this.progressElement) {
      const circumference = 2 * Math.PI * 16;
      const progress = this.currentPercentage / 100;
      const strokeDasharray = `${circumference * progress}, ${circumference}`;
      this.progressElement.setAttribute('stroke-dasharray', strokeDasharray);
    }
    
    // Update counter if present
    if (this.counterElement) {
      this.counterElement.textContent = `${this.currentPercentage}%`;
    }
    
    // Call progress callback
    if (this.callback) {
      this.callback(this.currentPercentage);
    }
  }
  
  /**
   * Stops and cleans up the animation
   */
  public destroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    
    // Clean up DOM elements if needed
    if (this.element && this.element.querySelector('.overlay-spinner')) {
      this.element.removeChild(this.element.querySelector('.overlay-spinner')!);
    }
  }
}
