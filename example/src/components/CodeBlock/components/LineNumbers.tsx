/**
 * Line Numbers Component
 * 
 * Optimized line number display with hover effects
 */

import React, { useState } from 'react';
import type { LineNumbersProps } from '../types';

const LineNumbers: React.FC<LineNumbersProps> = ({
  lines,
  startLine = 1
}) => {
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);

  return (
    <div className="code-line-numbers">
      {lines.map((_, index) => {
        const lineNumber = startLine + index;
        const isHovered = hoveredLine === lineNumber;
        
        return (
          <div 
            key={lineNumber}
            className={`code-line-number ${isHovered ? 'code-line-hover' : ''}`}
            onMouseEnter={() => setHoveredLine(lineNumber)}
            onMouseLeave={() => setHoveredLine(null)}
          >
            <span className="code-line-number-text">{lineNumber}</span>
            <div className="code-line-indicator" />
          </div>
        );
      })}
    </div>
  );
};

export default LineNumbers;