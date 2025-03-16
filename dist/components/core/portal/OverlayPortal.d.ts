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
}
export declare function OverlayPortal({ concurrencyMode, portalRoot, unstyled }: OverlayPortalProps): React.ReactPortal | null;
export {};
//# sourceMappingURL=OverlayPortal.d.ts.map