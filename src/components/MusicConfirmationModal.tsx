import React from 'react';
import { Volume2, X } from 'lucide-react';

interface MusicConfirmationModalProps {
  onConfirm: () => void;
  onDecline: () => void;
  isOpen: boolean;
}

const MusicConfirmationModal: React.FC<MusicConfirmationModalProps> = ({
  onConfirm,
  onDecline,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Volume2 className="mr-2" size={20} />
            Background Music
          </h2>
          <button
            onClick={onDecline}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close dialog"
            tabIndex={0}
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-700 mb-6">
          Would you like to play background music for an enhanced experience?
        </p>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onDecline}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            tabIndex={0}
          >
            No, thanks
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            tabIndex={0}
            autoFocus
          >
            Yes, play music
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicConfirmationModal;
