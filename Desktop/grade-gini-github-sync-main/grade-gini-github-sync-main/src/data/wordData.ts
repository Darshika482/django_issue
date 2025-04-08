
export interface WordCard {
  id: string;
  word: string;
  pronunciation: string;
  definition: string;
  synonyms: string[];
  example: string;
  difficulty: 'easy' | 'medium' | 'hard';
  known: boolean;
  studyLater: boolean;
}

// Preloaded selection of GRE/SAT vocabulary words
export const initialWordList: WordCard[] = [
  {
    id: '1',
    word: 'Abeyance',
    pronunciation: '/əˈbeɪəns/',
    definition: 'A state of temporary disuse or suspension',
    synonyms: ['Suspension', 'Dormancy', 'Latency'],
    example: 'The project was held in abeyance until additional funding could be secured.',
    difficulty: 'hard',
    known: false,
    studyLater: false
  },
  {
    id: '2',
    word: 'Circumlocution',
    pronunciation: '/ˌsɜːkəmləˈkjuːʃən/',
    definition: 'The use of many words where fewer would do, especially in a deliberate attempt to be vague or evasive',
    synonyms: ['Verbosity', 'Periphrasis', 'Wordiness'],
    example: 'The politician was known for his circumlocution when asked difficult questions.',
    difficulty: 'hard',
    known: false,
    studyLater: false
  },
  {
    id: '3',
    word: 'Ephemeral',
    pronunciation: '/ɪˈfɛm(ə)rəl/',
    definition: 'Lasting for a very short time',
    synonyms: ['Transient', 'Fleeting', 'Momentary'],
    example: 'The beauty of cherry blossoms is ephemeral, lasting only a few days each year.',
    difficulty: 'medium',
    known: false,
    studyLater: false
  },
  {
    id: '4',
    word: 'Loquacious',
    pronunciation: '/ləˈkweɪʃəs/',
    definition: 'Tending to talk a great deal; garrulous',
    synonyms: ['Talkative', 'Garrulous', 'Verbose'],
    example: 'The loquacious tour guide barely paused for breath during the two-hour tour.',
    difficulty: 'hard',
    known: false,
    studyLater: false
  },
  {
    id: '5',
    word: 'Juxtapose',
    pronunciation: '/ˈdʒʌkstəpəʊz/',
    definition: 'To place or deal with close together for contrasting effect',
    synonyms: ['Contrast', 'Compare', 'Set side by side'],
    example: 'The documentary juxtaposes scenes from wealthy neighborhoods with those from impoverished areas.',
    difficulty: 'medium',
    known: false,
    studyLater: false
  },
  {
    id: '6',
    word: 'Pedantic',
    pronunciation: '/pɪˈdæntɪk/',
    definition: 'Excessively concerned with minor details or rules; overscrupulous',
    synonyms: ['Doctrinaire', 'Bookish', 'Fussy'],
    example: "The professor's pedantic insistence on correct citation format was frustrating to his students.",
    difficulty: 'medium',
    known: false,
    studyLater: false
  },
  {
    id: '7',
    word: 'Quintessential',
    pronunciation: '/ˌkwɪntɪˈsɛnʃəl/',
    definition: 'Representing the most perfect or typical example of a quality or class',
    synonyms: ['Archetypal', 'Classic', 'Exemplary'],
    example: 'The small town diner with vinyl booths and homemade pie is the quintessential American eating establishment.',
    difficulty: 'medium',
    known: false,
    studyLater: false
  },
  {
    id: '8',
    word: 'Sycophant',
    pronunciation: '/ˈsɪkəfənt/',
    definition: 'A person who acts obsequiously toward someone important in order to gain advantage',
    synonyms: ['Toady', 'Yes-man', 'Flatterer'],
    example: 'He surrounded himself with sycophants who never challenged his decisions.',
    difficulty: 'hard',
    known: false,
    studyLater: false
  },
  {
    id: '9',
    word: 'Ubiquitous',
    pronunciation: '/juːˈbɪkwɪtəs/',
    definition: 'Present, appearing, or found everywhere',
    synonyms: ['Omnipresent', 'Universal', 'Pervasive'],
    example: 'Smartphones have become ubiquitous in modern society.',
    difficulty: 'medium',
    known: false,
    studyLater: false
  },
  {
    id: '10',
    word: 'Vociferous',
    pronunciation: '/vəˈsɪfərəs/',
    definition: 'Expressing or characterized by vehement opinions; loud and forceful',
    synonyms: ['Clamorous', 'Strident', 'Boisterous'],
    example: 'The candidate received vociferous support from the crowd at the rally.',
    difficulty: 'hard',
    known: false,
    studyLater: false
  },
  {
    id: '11',
    word: 'Ameliorate',
    pronunciation: '/əˈmiːlɪəreɪt/',
    definition: 'To make something bad or unsatisfactory better',
    synonyms: ['Improve', 'Enhance', 'Upgrade'],
    example: 'The new policies were designed to ameliorate working conditions in the factory.',
    difficulty: 'hard',
    known: false,
    studyLater: false
  },
  {
    id: '12',
    word: 'Belligerent',
    pronunciation: '/bəˈlɪdʒərənt/',
    definition: 'Hostile and aggressive',
    synonyms: ['Aggressive', 'Combative', 'Antagonistic'],
    example: 'The belligerent customer yelled at the store manager when denied a refund.',
    difficulty: 'medium',
    known: false,
    studyLater: false
  },
  {
    id: '13',
    word: 'Cacophony',
    pronunciation: '/kəˈkɒfəni/',
    definition: 'A harsh, discordant mixture of sounds',
    synonyms: ['Discord', 'Dissonance', 'Noise'],
    example: 'The cacophony of car horns filled the busy intersection during rush hour.',
    difficulty: 'hard',
    known: false,
    studyLater: false
  },
  {
    id: '14',
    word: 'Duplicity',
    pronunciation: '/djuːˈplɪsɪti/',
    definition: 'Deceitfulness, double-dealing',
    synonyms: ['Deception', 'Dishonesty', 'Guile'],
    example: "The spy's duplicity was discovered when confidential documents were found in his possession.",
    difficulty: 'hard',
    known: false,
    studyLater: false
  },
  {
    id: '15',
    word: 'Fastidious',
    pronunciation: '/faˈstɪdɪəs/',
    definition: 'Very attentive to and concerned about accuracy and detail',
    synonyms: ['Meticulous', 'Scrupulous', 'Exacting'],
    example: "The chef's fastidious attention to detail was evident in the presentation of each dish.",
    difficulty: 'medium',
    known: false,
    studyLater: false
  }
];
