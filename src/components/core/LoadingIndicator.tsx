import React from 'react';
import '../style/components/loading-indicator.css';

export default function LoadingIndicator() {
    return (
        <div className="loading-indicator" role="status" aria-label="Loading">
            <div className="loading-spinner" />
        </div>
    );
}
