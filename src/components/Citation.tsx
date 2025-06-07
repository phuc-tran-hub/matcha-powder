'use client';

import React from 'react';

interface CitationProps {
  sources: number[];
  className?: string;
}

interface InlineCitationProps {
  sourceNumber: number;
  className?: string;
}

interface BibliographyProps {
  sources: BibliographyEntry[];
  className?: string;
}

export interface BibliographyEntry {
  id: number;
  author: string;
  title: string;
  publication: string;
  year: string | number;
  url?: string;
  type: 'journal' | 'book' | 'report' | 'website' | 'document';
  pages?: string;
  publisher?: string;
  doi?: string;
}

// Component for multiple citations [1, 2, 3]
export const Citation: React.FC<CitationProps> = ({ sources, className = '' }) => {
  return (
    <sup className={`citation text-xs text-blue-600 hover:text-blue-800 ${className}`}>
      [{sources.join(', ')}]
    </sup>
  );
};

// Component for single inline citation [1]
export const InlineCitation: React.FC<InlineCitationProps> = ({ sourceNumber, className = '' }) => {
  return (
    <sup className={`citation text-xs text-blue-600 hover:text-blue-800 ${className}`}>
      [{sourceNumber}]
    </sup>
  );
};

// Component for bibliography/works cited section
export const Bibliography: React.FC<BibliographyProps> = ({ sources, className = '' }) => {
  const formatCitation = (entry: BibliographyEntry): string => {
    switch (entry.type) {
      case 'journal':
        return `${entry.author}. "${entry.title}." ${entry.publication}, ${entry.year}${entry.pages ? `, ${entry.pages}` : ''}.${entry.doi ? ` DOI: ${entry.doi}` : ''}`;
      
      case 'book':
        return `${entry.author}. ${entry.title}. ${entry.publisher ? `${entry.publisher}, ` : ''}${entry.year}.`;
      
      case 'report':
        return `${entry.author}. "${entry.title}." ${entry.publication}, ${entry.year}.`;
      
      case 'website':
        return `${entry.author}. "${entry.title}." ${entry.publication}. Accessed ${entry.year}.${entry.url ? ` ${entry.url}` : ''}`;
      
      case 'document':
        return `${entry.author}. "${entry.title}." ${entry.publication}, ${entry.year}.`;
      
      default:
        return `${entry.author}. "${entry.title}." ${entry.publication}, ${entry.year}.`;
    }
  };

  return (
    <section className={`bibliography bg-gray-50 p-6 rounded-lg shadow-sm ${className}`}>
      <h3 className="text-xl font-bold mb-4 text-gray-900 border-b border-gray-300 pb-2">
        Works Cited
      </h3>
      <ol className="space-y-3 text-sm text-gray-800">
        {sources.map((entry) => (
          <li key={entry.id} className="flex">
            <span className="font-bold mr-3 text-blue-600 min-w-[30px]">
              [{entry.id}]
            </span>
            <span className="flex-1">
              {formatCitation(entry)}
              {entry.url && (
                <a 
                  href={entry.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="ml-2 text-blue-600 hover:text-blue-800 underline"
                >
                  Link
                </a>
              )}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
};

// Component for citation note (for information that needs sources)
interface CitationNeededProps {
  text: string;
  className?: string;
}

export const CitationNeeded: React.FC<CitationNeededProps> = ({ text, className = '' }) => {
  return (
    <span className={`citation-needed ${className}`}>
      {text}
      <sup className="text-xs text-red-600 font-bold ml-1" title="Citation needed">
        [citation needed]
      </sup>
    </span>
  );
};

export default Citation;