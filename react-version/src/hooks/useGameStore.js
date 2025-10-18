import { create } from 'zustand';

// Game constants
const GAME_TIME = 600; // 10 minutes in seconds
const MEMORIZING_TIME = 9; // 9 seconds

import { cardPairs } from '../data/cardPairs.js';

// Create game cards from pairs
const createGameCards = () => {
  const cards = [];
  
  cardPairs.forEach((pair) => {
    // Icon card
    cards.push({
      id: `${pair.id}-icon`,
      pairId: pair.id,
      type: 'icon',
      content: pair.tip,
      image: pair.icon,
      category: pair.category,
      note: pair.note,
      isFlipped: true, // Start flipped for memorizing
      isMatched: false,
    });
    
    // Tip card
    cards.push({
      id: `${pair.id}-tip`,
      pairId: pair.id,
      type: 'tip',
      content: pair.tip,
      category: pair.category,
      note: pair.note,
      isFlipped: true, // Start flipped for memorizing
      isMatched: false,
    });
  });
  
  // Shuffle cards
  return cards.sort(() => Math.random() - 0.5);
};

export const useGameStore = create((set, get) => ({
  // Game state
  cards: createGameCards(),
  flippedIndices: [],
  matchedPairs: 0,
  tries: 0,
  score: 0,
  timeLeft: GAME_TIME,
  memorizingTimeLeft: MEMORIZING_TIME,
  status: 'ready', // 'ready' | 'memorizing' | 'playing' | 'win' | 'lose'
  educationalNote: null,
  
  // Actions
  startGame: () => {
    set({
      cards: createGameCards(),
      flippedIndices: [],
      matchedPairs: 0,
      tries: 0,
      score: 0,
      timeLeft: GAME_TIME,
      memorizingTimeLeft: MEMORIZING_TIME,
      status: 'memorizing',
      educationalNote: null,
    });
  },
  
  flipCard: (index) => {
    const state = get();
    if (state.status !== 'playing') return;
    
    const card = state.cards[index];
    if (card.isFlipped || card.isMatched || state.flippedIndices.length >= 2) return;
    
    const newFlippedIndices = [...state.flippedIndices, index];
    const newCards = [...state.cards];
    newCards[index] = { ...card, isFlipped: true };
    
    set({
      cards: newCards,
      flippedIndices: newFlippedIndices,
    });
    
    // Check for match if two cards are flipped
    if (newFlippedIndices.length === 2) {
      setTimeout(() => {
        get().checkMatch();
      }, 1000);
    }
  },
  
  checkMatch: () => {
    const state = get();
    const [firstIndex, secondIndex] = state.flippedIndices;
    const firstCard = state.cards[firstIndex];
    const secondCard = state.cards[secondIndex];
    
    const newCards = [...state.cards];
    const newTries = state.tries + 1;
    let newScore = state.score;
    let newMatchedPairs = state.matchedPairs;
    let newEducationalNote = state.educationalNote;
    
    if (firstCard.pairId === secondCard.pairId) {
      // Match found
      newCards[firstIndex] = { ...firstCard, isMatched: true };
      newCards[secondIndex] = { ...secondCard, isMatched: true };
      newMatchedPairs += 1;
      
      // Calculate score based on time and tries
      const timeBonus = Math.max(0, state.timeLeft - 300) * 2;
      const tryPenalty = Math.max(0, newTries - 12) * 10;
      newScore += Math.max(50, 100 + timeBonus - tryPenalty);
      
      // Set educational note
      const pair = cardPairs.find(p => p.id === firstCard.pairId);
      if (pair) {
        newEducationalNote = pair.note;
      }
      
      // Check win condition
      if (newMatchedPairs === 12) {
        set({
          cards: newCards,
          flippedIndices: [],
          tries: newTries,
          score: newScore,
          matchedPairs: newMatchedPairs,
          status: 'win',
          educationalNote: newEducationalNote,
        });
        return;
      }
    } else {
      // No match
      newCards[firstIndex] = { ...firstCard, isFlipped: false };
      newCards[secondIndex] = { ...secondCard, isFlipped: false };
    }
    
    set({
      cards: newCards,
      flippedIndices: [],
      tries: newTries,
      score: newScore,
      matchedPairs: newMatchedPairs,
      educationalNote: newEducationalNote,
    });
  },
  
  decrementTime: () => {
    const state = get();
    const newTimeLeft = state.timeLeft - 1;
    
    if (newTimeLeft <= 0) {
      set({
        timeLeft: 0,
        status: 'lose',
      });
    } else {
      set({ timeLeft: newTimeLeft });
    }
  },
  
  decrementMemorizingTime: () => {
    const state = get();
    const newMemorizingTimeLeft = state.memorizingTimeLeft - 1;
    
    if (newMemorizingTimeLeft <= 0) {
      // Start playing phase - flip all cards back
      const newCards = state.cards.map(card => ({
        ...card,
        isFlipped: false,
      }));
      
      set({
        memorizingTimeLeft: 0,
        status: 'playing',
        cards: newCards,
      });
    } else {
      set({ memorizingTimeLeft: newMemorizingTimeLeft });
    }
  },
  
  restartGame: () => {
    get().startGame();
  },
  
  resetGame: () => {
    set({
      cards: createGameCards(),
      flippedIndices: [],
      matchedPairs: 0,
      tries: 0,
      score: 0,
      timeLeft: GAME_TIME,
      memorizingTimeLeft: MEMORIZING_TIME,
      status: 'ready',
      educationalNote: null,
    });
  },
}));