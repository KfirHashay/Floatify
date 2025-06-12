/**
 * interactionEffects.ts
 * Enhanced interaction effects for Dynamic Island components
 */

/**
 * Adds touch ripple effects to overlay cards
 * Tracks mouse position on clicks to create accurate ripple origins
 */
export const initRippleEffects = () => {
  // Select all overlay cards
  const overlayCards = document.querySelectorAll('.overlay-card');
  
  // Add click listeners to each card
  overlayCards.forEach(card => {
    card.addEventListener('mousedown', (e: Event) => {
      const event = e as MouseEvent;
      const target = event.currentTarget as HTMLElement;
      
      // Calculate relative position within the element
      const rect = target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / target.offsetWidth) * 100;
      const y = ((event.clientY - rect.top) / target.offsetHeight) * 100;
      
      // Set custom properties for the ripple effect
      target.style.setProperty('--x', `${x}%`);
      target.style.setProperty('--y', `${y}%`);
    });
    
    // Add touch support for mobile
    card.addEventListener('touchstart', (e: Event) => {
      const event = e as TouchEvent;
      if (event.touches && event.touches[0]) {
        const target = event.currentTarget as HTMLElement;
        const touch = event.touches[0];
        
        // Calculate relative position within the element
        const rect = target.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / target.offsetWidth) * 100;
        const y = ((touch.clientY - rect.top) / target.offsetHeight) * 100;
        
        // Set custom properties for the ripple effect
        target.style.setProperty('--x', `${x}%`);
        target.style.setProperty('--y', `${y}%`);
      }
    }, { passive: true } as AddEventListenerOptions);
  });
};

/**
 * Adds subtle hover animation to overlay cards
 */
export const initHoverEffects = () => {
  const overlayCards = document.querySelectorAll('.overlay-card');
  
  // Track mouse position for hover effects
  overlayCards.forEach(card => {
    const element = card as HTMLElement;
    
    element.addEventListener('mousemove', (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = element.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;
      
      // Apply subtle tilt effect based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = (y - centerY) / 20;
      const tiltY = (centerX - x) / 20;
      
      element.style.transform = `${element.style.transform.replace(/rotateX\([^)]*\) rotateY\([^)]*\)/, '')} rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    
    // Reset tilt when mouse leaves
    element.addEventListener('mouseleave', () => {
      element.style.transform = element.style.transform.replace(/rotateX\([^)]*\) rotateY\([^)]*\)/, '');
    });
  });
};
