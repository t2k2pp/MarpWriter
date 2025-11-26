import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface PresentationModeProps {
    html: string;
    css: string;
    onClose: () => void;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({ html, css, onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState<Element[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Parse HTML and extract slides
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const sections = Array.from(doc.querySelectorAll('section'));

        // Filter out empty sections
        const validSlides = sections.filter(section => {
            const text = section.textContent?.trim() || '';
            return text.length > 0;
        });

        setSlides(validSlides);
        console.log('Valid slides found:', validSlides.length);
        console.log('Slide contents:', validSlides.map(s => s.textContent?.substring(0, 50)));
    }, [html]);

    useEffect(() => {
        if (containerRef.current && slides.length > 0) {
            // Clear container
            containerRef.current.innerHTML = '';

            // Create slide element
            const slideDiv = document.createElement('div');
            slideDiv.className = 'slide-content';
            slideDiv.innerHTML = slides[currentSlide].innerHTML;

            containerRef.current.appendChild(slideDiv);
        }
    }, [currentSlide, slides]);

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
    }, [currentSlide, slides.length]);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
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
            {/* Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
        ${css}
        .slide-content {
          width: 100%;
          max-width: 1280px;
          height: 100%;
          max-height: 720px;
          margin: 0 auto;
          padding: 4rem;
          background: white;
          color: #000;
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          overflow-y: auto;
          box-sizing: border-box;
        }
        .slide-content h1 {
          color: #000 !important;
          font-size: 3.5rem !important;
          font-weight: bold !important;
          margin: 0 0 2rem 0 !important;
        }
        .slide-content h2 {
          color: #333 !important;
          font-size: 2.5rem !important;
          font-weight: bold !important;
          margin: 0 0 1.5rem 0 !important;
        }
        .slide-content p {
          color: #000 !important;
          font-size: 1.8rem !important;
          line-height: 1.6 !important;
          margin: 0 0 1rem 0 !important;
        }
        .slide-content ul, .slide-content ol {
          color: #000 !important;
          font-size: 1.8rem !important;
          line-height: 1.8 !important;
          margin: 1rem 0 !important;
          padding-left: 3rem !important;
        }
        .slide-content li {
          color: #000 !important;
          margin: 0.5rem 0 !important;
        }
        .slide-content strong {
          color: #000 !important;
          font-weight: bold !important;
        }
      `}} />

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 bg-white rounded-lg transition-colors hover:bg-gray-100"
            >
                <X size={24} className="text-black" />
            </button>

            {/* Slide Container */}
            <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
                <div
                    ref={containerRef}
                    className="w-full h-full flex items-center justify-center"
                />
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4 z-50">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="p-3 bg-white rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                    <ChevronLeft size={24} className="text-black" />
                </button>

                <div className="px-4 py-2 bg-white rounded-full text-black font-medium">
                    {currentSlide + 1} / {slides.length}
                </div>

                <button
                    onClick={nextSlide}
                    disabled={currentSlide === slides.length - 1}
                    className="p-3 bg-white rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                >
                    <ChevronRight size={24} className="text-black" />
                </button>
            </div>

            {/* Help Text */}
            <div className="absolute top-4 left-4 text-white text-sm bg-black/70 px-3 py-2 rounded">
                Press ← → or Space to navigate, Esc to exit
            </div>
        </div>
    );
};
