import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PresentationModeProps {
    html: string;
    css: string;
    onClose: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({ html, css, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [totalSlides, setTotalSlides] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Count slides from HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const slides = doc.querySelectorAll('section');
        setTotalSlides(slides.length);
    }, [html]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentSlide, totalSlides]);

    const nextSlide = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition-colors"
            >
                <X size={24} className="text-white" />
            </button>

            {/* Slide Container */}
            <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
                <div
                    ref={containerRef}
                    className="presentation-container w-full h-full flex items-center justify-center"
                    dangerouslySetInnerHTML={{
                        __html: `
              <style>
                ${css}
                section {
                  display: none !important;
                  width: 100%;
                  height: 100%;
                  max-width: 1280px;
                  max-height: 720px;
                  margin: 0 auto;
                  padding: 2rem;
                  box-sizing: border-box;
                  color: #333;
                  background: white;
                  border-radius: 8px;
                  overflow: hidden;
                }
                section:nth-of-type(${currentSlide + 1}) {
                  display: flex !important;
                  flex-direction: column;
                  align-items: flex-start;
                  justify-content: center;
                }
              </style>
              ${html}
            `
                    }}
                />
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4 z-50">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={24} className="text-white" />
                </button>

                <div className="px-4 py-2 bg-black/50 rounded-full text-white font-medium">
                    {currentSlide + 1} / {totalSlides}
                </div>

                <button
                    onClick={nextSlide}
                    disabled={currentSlide === totalSlides - 1}
                    className="p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronRight size={24} className="text-white" />
                </button>
            </div>

            {/* Help Text */}
            <div className="absolute top-4 left-4 text-white/50 text-sm">
                Press ← → or Space to navigate, Esc to exit
            </div>
        </div>
    );
};
