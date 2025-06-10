/**
 * OverlayPortal.tsx
 *
 * Manages overlay rendering through React Portal.
 */
import React from 'react';
import '../../style/index.css';
interface OverlayPortalProps {
    concurrencyMode?: 'single' | 'multiple';
    portalRoot?: HTMLElement;
    unstyled?: boolean;
    autoDismiss?: boolean;
    sticky?: boolean;
    position?: 'top' | 'bottom' | 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}
export declare function OverlayPortal({ concurrencyMode, portalRoot, unstyled, sticky, position, }: OverlayPortalProps): React.ReactPortal | null;
export {};
//# sourceMappingURL=OverlayPortal.d.ts.map