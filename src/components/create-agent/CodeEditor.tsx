import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import Button from '@/components/ui/Button';

interface CodeEditorProps {
  content: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
  error: string | null;
  title: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  content,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onChange,
  error,
  title,
}) => {
  // Parse content to get provider and version
  let provider = '';
  let version = '';
  
  try {
    const data = JSON.parse(content);
    if (data.provider) {
      provider = data.provider.split('.').pop();
      version = data.component_version?.toString() || '';
    }
  } catch (e) {
    // Handle parse error silently
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between items-center px-2 py-1 border-b border-dark-border bg-dark-surface sticky top-0 z-10 w-[80%]">
        <div className="w-[30%]">
          <p className="text-sm text-gray-300">{title}</p>
          <p className="text-xs text-gray-500">{provider} | version: {version}</p>
        </div>
        <div className="flex gap-2 w-[70%]">
          {isEditing ? (
            <>
              <Button size="sm" variant="primary" onClick={onSave} className="text-xs">
                Save
              </Button>
              
              <Button size="sm" variant="ghost" onClick={onCancel} className="text-xs">
                Cancel
              </Button>
            </>
          ) : (
            <Button size="sm" variant="ghost" onClick={onEdit} className="text-xs">
              Edit
            </Button>
          )}
        </div>
      </div>

      {error && (
        <div className="px-4 py-2 text-sm text-error-500 bg-error-500/10 border-b border-dark-border">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-hidden bg-dark-background">
        <div className="max-h-[calc(100vh-265px)] w-full overflow-y-auto overflow-x-auto">
          <CodeMirror
            value={content}
            height="100%"
            width="100%"
            theme="dark"
            editable={isEditing}
            extensions={[json()]}
            onChange={onChange}
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              dropCursor: true,
              allowMultipleSelections: true,
              indentOnInput: true,
              bracketMatching: true,
              closeBrackets: true,
              autocompletion: true,
              highlightActiveLine: true,
              highlightSelectionMatches: true,
              syntaxHighlighting: true
            }}
            style={{
              fontSize: '12px',
              backgroundColor: '#1e1e1e',
              height: '100%',
              width: '100%',
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
              overflowWrap: 'break-word'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;