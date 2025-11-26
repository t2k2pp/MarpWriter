import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { EditorView } from '@codemirror/view';

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
}

const theme = EditorView.theme({
    "&": {
        backgroundColor: "#1e293b",
        height: "100%",
        color: "#f8fafc",
        fontSize: "14px",
    },
    ".cm-content": {
        caretColor: "#3b82f6",
        fontFamily: "'Fira Code', monospace",
        color: "#f8fafc",
    },
    ".cm-gutters": {
        backgroundColor: "#1e293b",
        color: "#94a3b8",
        border: "none",
    },
    "&.cm-focused .cm-cursor": {
        borderLeftColor: "#3b82f6",
    },
    ".cm-activeLine": {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
    },
    ".cm-activeLineGutter": {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        color: "#f8fafc",
    },
    ".cm-line": {
        color: "#f8fafc",
    },
}, { dark: true });

export const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
    return (
        <div className="h-full w-full overflow-hidden glass-panel rounded-xl" style={{ backgroundColor: '#1e293b' }}>
            <CodeMirror
                value={value}
                height="100%"
                theme="dark"
                extensions={[
                    markdown({ base: markdownLanguage, codeLanguages: languages }),
                    theme,
                    EditorView.lineWrapping,
                ]}
                onChange={onChange}
                className="h-full"
                style={{ height: '100%' }}
                basicSetup={{
                    lineNumbers: true,
                    highlightActiveLineGutter: true,
                    highlightActiveLine: true,
                    foldGutter: true,
                }}
            />
        </div>
    );
};
