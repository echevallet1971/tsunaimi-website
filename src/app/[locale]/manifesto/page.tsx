'use client';

import { useTranslations } from 'next-intl';

export default function ManifestoPage() {
  const t = useTranslations('aboutus.manifesto');

  const renderBlock = (blockNumber: number, lineCount: number) => {
    return (
      <div className="mb-16">
        {Array.from({ length: lineCount }).map((_, i) => (
          <p 
            key={`block${blockNumber}_line${i + 1}`}
            className="text-xl md:text-2xl text-[#111827] leading-relaxed"
          >
            {t(`block${blockNumber}.line${i + 1}`)}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="h-24 bg-gradient-to-b from-[#7057A0] to-[#251C6B]" />

      {/* Content */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <p className="text-xl md:text-2xl text-[#111827] italic mb-16">
            {t('title')}
          </p>

          {/* Blocks */}
          {renderBlock(1, 2)}
          {renderBlock(2, 4)}
          {renderBlock(3, 4)}
          {renderBlock(4, 3)}
          {renderBlock(5, 3)}
          {renderBlock(6, 5)}
          {renderBlock(7, 2)}
        </div>
      </div>
    </div>
  );
} 