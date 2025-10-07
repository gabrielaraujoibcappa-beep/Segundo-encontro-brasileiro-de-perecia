
import React from 'react';
import { TicketIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-md mx-auto text-center py-8">
      <div className="flex items-center justify-center gap-3">
        <TicketIcon className="w-10 h-10 text-purple-400" />
        <h1 className="text-4xl font-bold tracking-tight">
          ibc<span className="text-purple-400">.</span>
        </h1>
      </div>
      <p className="text-gray-400 mt-2">Gere seu ingresso para os Stories</p>
    </header>
  );
};
