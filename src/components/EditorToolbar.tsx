import React from 'react';
import {
    Bold, Italic, List, ListOrdered, Image, Link,
    Heading1, Heading2, Code, Quote, Minus
} from 'lucide-react';

interface EditorToolbarProps {
    onInsert: (markdown: string) => void;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({ onInsert }) => {
    const toolbarButtons = [
        { icon: Heading1, label: 'Heading 1', markdown: '\n# ' },
        { icon: Heading2, label: 'Heading 2', markdown: '\n## ' },
        { icon: Bold, label: 'Bold', markdown: '**text**' },
        { icon: Italic, label: 'Italic', markdown: '_text_' },
        { icon: List, label: 'Bullet List', markdown: '\n- ' },
        { icon: ListOrdered, label: 'Numbered List', markdown: '\n1. ' },
        { icon: Code, label: 'Code', markdown: '`code`' },
        { icon: Quote, label: 'Quote', markdown: '\n> ' },
        { icon: Minus, label: 'Slide Break', markdown: '\n---\n\n' },
        { icon: Image, label: 'Image', markdown: '![alt](url)' },
        { icon: Link, label: 'Link', markdown: '[text](url)' },
    ];

    return (
        <div className="flex items-center gap-1 px-2 py-2 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex-wrap">
            {toolbarButtons.map((btn, idx) => (
                <button
                    key={idx}
                    onClick={() => onInsert(btn.markdown)}
                    className="p-2 hover:bg-[var(--bg-tertiary)] rounded transition-colors"
                    title={btn.label}
                >
                    <btn.icon size={18} className="text-[var(--text-secondary)]" />
                </button>
            ))}
        </div>
    );
};
