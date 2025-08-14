import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileUpload = ({ onFilesChange, maxFiles = 3, maxSize = 10 }) => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const validateFile = (file) => {
    if (!allowedTypes?.includes(file?.type)) {
      return 'File type not supported';
    }
    if (file?.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }
    return null;
  };

  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(prev => ({
        ...prev,
        [fileId]: progress
      }));
    }, 200);
  };

  const handleFiles = (newFiles) => {
    const validFiles = [];
    const errors = [];

    Array.from(newFiles)?.forEach(file => {
      if (files?.length + validFiles?.length >= maxFiles) {
        errors?.push(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const error = validateFile(file);
      if (error) {
        errors?.push(`${file?.name}: ${error}`);
        return;
      }

      const fileWithId = {
        ...file,
        id: Date.now() + Math.random(),
        preview: file?.type?.startsWith('image/') ? URL.createObjectURL(file) : null
      };

      validFiles?.push(fileWithId);
      simulateUpload(fileWithId?.id);
    });

    if (validFiles?.length > 0) {
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    }

    if (errors?.length > 0) {
      alert(errors?.join('\n'));
    }
  };

  const removeFile = (fileId) => {
    const updatedFiles = files?.filter(file => file?.id !== fileId);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
    
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress?.[fileId];
      return newProgress;
    });
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const getFileIcon = (file) => {
    if (file?.type?.startsWith('image/')) return 'Image';
    if (file?.type === 'application/pdf') return 'FileText';
    if (file?.type?.includes('word')) return 'FileText';
    return 'File';
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-micro ${
          dragActive
            ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={allowedTypes?.join(',')}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
            <Icon name="Upload" size={24} className="text-accent" />
          </div>
          
          <div>
            <p className="text-foreground font-medium mb-1">
              Drop files here or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Support for images, PDFs, and documents up to {maxSize}MB
            </p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef?.current?.click()}
          >
            Choose Files
          </Button>
        </div>
      </div>
      {/* File List */}
      {files?.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">
            Uploaded Files ({files?.length}/{maxFiles})
          </h4>
          
          {files?.map((file) => (
            <div
              key={file?.id}
              className="flex items-center space-x-3 p-3 bg-surface rounded-lg border border-border"
            >
              {/* File Icon/Preview */}
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                {file?.preview ? (
                  <img
                    src={file?.preview}
                    alt={file?.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Icon name={getFileIcon(file)} size={18} className="text-muted-foreground" />
                )}
              </div>
              
              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {file?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file?.size)}
                </p>
                
                {/* Progress Bar */}
                {uploadProgress?.[file?.id] !== undefined && uploadProgress?.[file?.id] < 100 && (
                  <div className="mt-2">
                    <div className="w-full bg-muted rounded-full h-1">
                      <div
                        className="bg-accent h-1 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress?.[file?.id]}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Status & Actions */}
              <div className="flex items-center space-x-2">
                {uploadProgress?.[file?.id] === 100 && (
                  <Icon name="Check" size={16} className="text-success" />
                )}
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(file?.id)}
                  className="w-8 h-8"
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* File Guidelines */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Supported formats: JPG, PNG, GIF, PDF, DOC, DOCX, TXT</p>
        <p>• Maximum file size: {maxSize}MB per file</p>
        <p>• Maximum {maxFiles} files allowed</p>
      </div>
    </div>
  );
};

export default FileUpload;