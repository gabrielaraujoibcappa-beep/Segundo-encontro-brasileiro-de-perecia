import React, { useState, useCallback, DragEvent } from 'react';
import { Button } from './Button';
import { UploadIcon, LoaderIcon } from './icons';

interface UploadStepProps {
  onGenerate: (imageFile: File, city: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const UploadStep: React.FC<UploadStepProps> = ({ onGenerate, isLoading, error }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [city, setCity] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileChange = useCallback((files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
      }
    }
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [handleFileChange]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageFile && city) {
      onGenerate(imageFile, city);
    }
  };

  const isFormValid = imageFile && city.trim().length > 0;

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="file-upload" 
            className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? 'border-purple-400 bg-gray-700' : 'border-gray-600 bg-gray-800 hover:bg-gray-700'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="h-full w-full object-cover rounded-lg"/>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-400">
                <UploadIcon className="w-10 h-10 mb-3"/>
                <p className="mb-2 text-sm"><span className="font-semibold text-purple-400">Clique para enviar</span> ou arraste</p>
                <p className="text-xs">JPG, PNG (MAX. 5MB)</p>
              </div>
            )}
            <input id="file-upload" type="file" className="hidden" accept="image/jpeg, image/png" onChange={(e) => handleFileChange(e.target.files)} />
          </label>
        </div>
        
        <div>
          <label htmlFor="city" className="sr-only">Cidade</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Sua cidade"
            className="bg-gray-800 border-2 border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-3 transition"
            required
          />
        </div>

        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        
        <Button type="submit" disabled={!isFormValid || isLoading} fullWidth>
          {isLoading ? (
            <>
              <LoaderIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
              Gerando...
            </>
          ) : (
            'Gerar Meu Ingresso'
          )}
        </Button>
      </form>
    </div>
  );
};