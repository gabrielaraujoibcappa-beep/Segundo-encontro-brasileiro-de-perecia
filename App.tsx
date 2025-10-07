
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UploadStep } from './components/UploadStep';
import { PreviewStep } from './components/PreviewStep';
import { generateTicketImage } from './services/ticketService';
import { AppState } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.UPLOAD);
  const [userImage, setUserImage] = useState<File | null>(null);
  const [city, setCity] = useState<string>('');
  const [generatedTicket, setGeneratedTicket] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (imageFile: File, city: string) => {
    setIsLoading(true);
    setError(null);
    setGeneratedTicket(null);

    try {
      const ticketUrl = await generateTicketImage(imageFile, city);
      setGeneratedTicket(ticketUrl);
      setUserImage(imageFile);
      setCity(city);
      setAppState(AppState.PREVIEW);
    } catch (err) {
      setError('Falha ao gerar o ingresso. Por favor, tente com outra imagem.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setAppState(AppState.UPLOAD);
    setUserImage(null);
    setCity('');
    setGeneratedTicket(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <Header />
      <main className="w-full max-w-md mx-auto flex-grow flex flex-col justify-center">
        {appState === AppState.UPLOAD && (
          <UploadStep 
            onGenerate={handleGenerate} 
            isLoading={isLoading} 
            error={error} 
          />
        )}
        {appState === AppState.PREVIEW && generatedTicket && (
          <PreviewStep 
            ticketImageUrl={generatedTicket} 
            onReset={handleReset} 
          />
        )}
      </main>
      <footer className="text-center text-xs text-gray-500 py-4">
        <p>&copy; {new Date().getFullYear()} ibc. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
