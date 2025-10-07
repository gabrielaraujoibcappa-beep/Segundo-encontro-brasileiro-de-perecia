
import React from 'react';
import { Button } from './Button';
import { DownloadIcon, ShareIcon, BackIcon } from './icons';

interface PreviewStepProps {
  ticketImageUrl: string;
  onReset: () => void;
}

export const PreviewStep: React.FC<PreviewStepProps> = ({ ticketImageUrl, onReset }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = ticketImageUrl;
    link.download = 'ibc-ingresso-story.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    try {
      const response = await fetch(ticketImageUrl);
      const blob = await response.blob();
      const file = new File([blob], 'ibc-ingresso-story.png', { type: blob.type });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Meu Ingresso - Encontro Brasileiro de Perícia',
          text: 'Presença confirmada! Nos vemos no Encontro Brasileiro de Perícia. #EUVOU #IBCAPPA',
        });
      } else {
        // Fallback for browsers that don't support Web Share API or file sharing
        alert('Seu navegador não suporta compartilhamento direto. A imagem será baixada para que você possa compartilhar manualmente.');
        handleDownload();
      }
    } catch (error) {
        // This can happen if the user cancels the share dialog
        if ((error as DOMException).name !== 'AbortError') {
             console.error('Erro ao compartilhar:', error);
             alert('Ocorreu um erro ao tentar compartilhar. A imagem será baixada.');
             handleDownload();
        }
    }
  };
  
  return (
    <div className="w-full flex flex-col items-center gap-6 animate-fade-in">
      <p className="text-center text-gray-300">Seu ingresso está pronto!</p>
      
      <div className="w-full max-w-xs shadow-2xl shadow-purple-900/40 rounded-2xl overflow-hidden">
        <img 
          src={ticketImageUrl} 
          alt="Ingresso Gerado" 
          className="w-full h-auto"
        />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button onClick={handleDownload} variant="secondary">
          <DownloadIcon className="w-5 h-5 mr-2" />
          Baixar Imagem
        </Button>
        <Button onClick={handleShare}>
          <ShareIcon className="w-5 h-5 mr-2" />
          Compartilhar
        </Button>
      </div>
      <p className="text-xs text-gray-500 text-center mt-2">
        Dica: Compartilhe ou baixe a imagem para adicionar aos seus Stories do Instagram!
      </p>

      <button onClick={onReset} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition mt-4">
        <BackIcon className="w-4 h-4"/>
        Gerar Outro Ingresso
      </button>
    </div>
  );
};
