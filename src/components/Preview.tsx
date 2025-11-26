import React, { useEffect, useRef } from 'react';

interface PreviewProps {
  html: string;
  css: string;
}

export const Preview: React.FC<PreviewProps> = ({ html, css }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shadowRootRef = useRef<ShadowRoot | null>(null);

  useEffect(() => {
    if (containerRef.current && !shadowRootRef.current) {
      shadowRootRef.current = containerRef.current.attachShadow({ mode: 'open' });
    }

    if (shadowRootRef.current) {
      shadowRootRef.current.innerHTML = `
        <style>
          :host {
            display: block;
            width: 100%;
            height: 100%;
            overflow-y: auto !important;
            overflow-x: hidden;
            background: #1e293b;
          }
          ${css}
          section {
            margin-bottom: 2rem;
          }
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #1e293b;
          }
          ::-webkit-scrollbar-thumb {
            background: #334155;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        </style>
        <div class="marp-wrapper" style="height: auto; min-height: 100%;">
          ${html}
        </div>
      `;
    }
  }, [html, css]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full glass-panel rounded-xl"
      style={{ overflow: 'hidden', position: 'relative' }}
    />
  );
};
