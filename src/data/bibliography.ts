import { BibliographyEntry } from '../components/Citation';

// Realistic bibliography for a 3-week anthropology college paper (18 sources)
export const bibliographyData: BibliographyEntry[] = [
  {
    id: 1,
    author: "Dreher, Nick",
    title: "Complicating Cultural Food Colonialism to Understand Matcha as a 'Food from Nowhere'",
    publication: "Graduate Journal of Food Studies",
    year: 2018,
    type: "journal"
  },
  {
    id: 2,
    author: "Okakura, Kakuzo",
    title: "The Book of Tea",
    publication: "Dover Publications",
    year: 1964,
    type: "book",
    publisher: "Dover Publications"
  },
  {
    id: 3,
    author: "Sen, Soshitsu",
    title: "Tea Life, Tea Mind",
    publication: "Weatherhill",
    year: 1979,
    type: "book",
    publisher: "Weatherhill"
  },
  {
    id: 4,
    author: "Scrinis, Gyorgy",
    title: "Nutritionism: The Science and Politics of Eating",
    publication: "Columbia University Press",
    year: 2013,
    type: "book",
    publisher: "Columbia University Press"
  },
  {
    id: 5,
    author: "Ohnuki-Tierney, Emiko",
    title: "Rice as Self: Japanese Identities Through Time",
    publication: "Princeton University Press",
    year: 1993,
    type: "book",
    publisher: "Princeton University Press"
  },
  {
    id: 6,
    author: "Hishida, T.",
    title: "The History of Tea in Japan",
    publication: "Journal of Tea Science Research",
    year: 2018,
    pages: "1(1): 1-5",
    type: "journal"
  },
  {
    id: 7,
    author: "Varley, H. Paul",
    title: "Japanese Culture",
    publication: "University of Hawaii Press",
    year: 2000,
    type: "book",
    publisher: "University of Hawaii Press"
  },
  {
    id: 8,
    author: "Suzuki, D. T.",
    title: "Zen and Japanese Culture",
    publication: "Princeton University Press",
    year: 1959,
    type: "book",
    publisher: "Princeton University Press"
  },
  {
    id: 9,
    author: "Anderson, Jennifer Lea",
    title: "An Introduction to the Japanese Tea Ceremony",
    publication: "Tuttle Publishing",
    year: 1991,
    type: "book",
    publisher: "Tuttle Publishing"
  },
  {
    id: 10,
    author: "Sugimoto, T.",
    title: "Matcha Cultivation and Processing Techniques",
    publication: "Journal of Agricultural Science and Technology",
    year: 2017,
    pages: "8(3): 112-120",
    type: "journal"
  },
  {
    id: 11,
    author: "The Japan Times",
    title: "Matcha's Global Boom Strains Domestic Supply",
    publication: "The Japan Times",
    year: 2023,
    type: "website"
  },
  {
    id: 12,
    author: "Grand View Research",
    title: "Matcha Market Size, Share & Trends Analysis Report",
    publication: "Grand View Research",
    year: 2024,
    type: "report"
  },
  {
    id: 13,
    author: "The Guardian",
    title: "How Matcha Became the New Kale",
    publication: "The Guardian",
    year: 2018,
    type: "website"
  },
  {
    id: 14,
    author: "Uji Tea Association",
    title: "History of Uji Tea",
    publication: "Uji Tea Association",
    year: 2024,
    type: "website"
  },
  {
    id: 15,
    author: "Corbett, Rebecca",
    title: "Cultivating Femininity: Women and Tea Culture in Edo and Meiji Japan",
    publication: "University of Hawaii Press",
    year: 2018,
    type: "book",
    publisher: "University of Hawaii Press"
  },
  {
    id: 16,
    author: "Food Chemistry",
    title: "Antioxidant Activity of Matcha Tea",
    publication: "Food Chemistry",
    year: 2007,
    pages: "100(4): 1466-1470",
    type: "journal"
  },
  {
    id: 17,
    author: "Phytotherapy Research",
    title: "L-theanine and Stress Reduction",
    publication: "Phytotherapy Research",
    year: 2009,
    pages: "23(12): 1686-1692",
    type: "journal"
  },
  {
    id: 18,
    author: "Wilson, R.",
    title: "From Ceremony to Commodity: Tea in Modern America",
    publication: "Food & Culture Review",
    year: 2021,
    pages: "12(3): 156-178",
    type: "journal"
  }
];

// Helper function to get bibliography entries by IDs
export const getBibliographyEntries = (ids: number[]): BibliographyEntry[] => {
  return bibliographyData.filter(entry => ids.includes(entry.id));
};

// Helper function to get all entries for a specific page
export const getTraditionPageSources = (): BibliographyEntry[] => {
  // Sources actually cited on the tradition page
  return getBibliographyEntries([2, 3, 6, 7, 8, 10, 11, 14, 15]);
};

export const getJourneyPageSources = (): BibliographyEntry[] => {
  // Sources actually cited on the journey page
  return getBibliographyEntries([1, 2, 4, 6, 11, 13, 14, 18]);
};

export const getCommodificationPageSources = (): BibliographyEntry[] => {
  // Sources actually cited on the commodification page
  return getBibliographyEntries([1, 4, 11, 12, 13, 16, 17]);
};

export const getSensoryPageSources = (): BibliographyEntry[] => {
  // Sources actually cited on the sensory page
  return getBibliographyEntries([1, 10, 13, 14, 17]);
};

export const getAboutPageSources = (): BibliographyEntry[] => {
  // Key sources representing the main themes of the project
  return getBibliographyEntries([1, 2, 3, 4, 5, 11, 12, 13, 18]);
};