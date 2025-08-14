import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CodeSnippetPreview = ({ codeSnippets = [] }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!codeSnippets || codeSnippets?.length === 0) {
    return null;
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard?.writeText(codeSnippets?.[activeTab]?.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getLanguageIcon = (language) => {
    switch (language?.toLowerCase()) {
      case 'javascript': case'js':
        return 'FileText';
      case 'typescript': case'ts':
        return 'FileCode';
      case 'react': case'jsx':
        return 'Component';
      case 'css':
        return 'Palette';
      case 'html':
        return 'Globe';
      case 'python':
        return 'Code';
      case 'json':
        return 'Braces';
      default:
        return 'Code';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-card-foreground flex items-center">
        <Icon name="Code2" size={20} className="mr-2" />
        Code Snippets
      </h3>
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        {/* Tab Headers */}
        {codeSnippets?.length > 1 && (
          <div className="flex border-b border-border bg-muted/50">
            {codeSnippets?.map((snippet, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium transition-micro ${
                  activeTab === index
                    ? 'text-accent border-b-2 border-accent bg-background' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={getLanguageIcon(snippet?.language)} size={14} />
                <span>{snippet?.title || snippet?.language}</span>
              </button>
            ))}
          </div>
        )}
        
        {/* Code Content */}
        <div className="relative">
          {/* Header with Language and Copy Button */}
          <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name={getLanguageIcon(codeSnippets?.[activeTab]?.language)} size={14} />
              <span className="text-sm font-medium text-muted-foreground">
                {codeSnippets?.[activeTab]?.language}
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyCode}
              iconName={copied ? "Check" : "Copy"}
              iconPosition="left"
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          
          {/* Code Block */}
          <div className="p-4 overflow-x-auto">
            <pre className="text-sm text-foreground font-mono leading-relaxed">
              <code>{codeSnippets?.[activeTab]?.code}</code>
            </pre>
          </div>
          
          {/* Description */}
          {codeSnippets?.[activeTab]?.description && (
            <div className="px-4 py-2 bg-muted/20 border-t border-border">
              <p className="text-xs text-muted-foreground">
                {codeSnippets?.[activeTab]?.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeSnippetPreview;