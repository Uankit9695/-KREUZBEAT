import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play, RotateCcw, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface MemoryCardsProps {
  onGameEnd: (score: number, difficulty: string) => void;
  onBack: () => void;
}

type GameState = 'setup' | 'playing' | 'end';
type CardType = { id: number; value: string; isFlipped: boolean; isMatched: boolean };

const emojis = ['🎯', '🎨', '🎭', '🎪', '🎸', '🎮', '🎲', '🎰', '🏆', '🌟', '🌈', '🔥', '💎', '🍕', '🍔', '🍦'];

export function MemoryCards({ onGameEnd, onBack }: MemoryCardsProps) {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const gridSizes = {
    easy: 12,
    medium: 16,
    hard: 20
  };

  const startGame = () => {
    const pairCount = gridSizes[difficulty] / 2;
    const selectedEmojis = emojis.slice(0, pairCount);
    const cardPairs = [...selectedEmojis, ...selectedEmojis];
    
    const shuffledCards = cardPairs
      .sort(() => Math.random() - 0.5)
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false
      }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setStartTime(Date.now());
    setEndTime(0);
    setGameState('playing');
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) return;

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    setCards(prev => prev.map(card => 
      card.id === id ? { ...card, isFlipped: true } : card
    ));

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [first, second] = newFlippedCards;
      
      if (cards[first].value === cards[second].value) {
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          ));
          setFlippedCards([]);
          setMatches(prev => prev + 1);
        }, 600);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map(card =>
            card.id === first || card.id === second
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && matches === gridSizes[difficulty] / 2) {
      setEndTime(Date.now());
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);
      const score = Math.max(1000 - (moves * 10) - timeTaken, 100);
      setTimeout(() => {
        setGameState('end');
        onGameEnd(score, difficulty);
      }, 1000);
    }
  }, [matches, difficulty, gameState, moves, startTime, onGameEnd]);

  const getGridCols = () => {
    switch (difficulty) {
      case 'easy': return 'grid-cols-4';
      case 'medium': return 'grid-cols-4';
      case 'hard': return 'grid-cols-5';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        {gameState === 'playing' && (
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              Moves: {moves}
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Matches: {matches}/{gridSizes[difficulty] / 2}
            </Badge>
          </div>
        )}
      </div>

      {/* Game Card */}
      <Card>
        <CardHeader>
          <CardTitle>Memory Cards</CardTitle>
          <CardDescription>
            {gameState === 'setup' && 'Match all pairs of cards with the fewest moves!'}
            {gameState === 'playing' && 'Find all matching pairs!'}
            {gameState === 'end' && 'Congratulations! All pairs matched!'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {gameState === 'setup' ? (
            <div className="text-center py-12 space-y-6">
              <div>
                <label className="block text-sm mb-2">Select Difficulty</label>
                <Select value={difficulty} onValueChange={(value: any) => setDifficulty(value)}>
                  <SelectTrigger className="w-48 mx-auto">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy (12 cards)</SelectItem>
                    <SelectItem value="medium">Medium (16 cards)</SelectItem>
                    <SelectItem value="hard">Hard (20 cards)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={startGame} size="lg" className="gap-2">
                <Play className="w-5 h-5" />
                Start Game
              </Button>
            </div>
          ) : gameState === 'end' ? (
            <div className="text-center py-12 space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full">
                <Trophy className="w-10 h-10 text-purple-600" />
              </div>
              <div>
                <div className="text-4xl mb-2">{Math.max(1000 - (moves * 10) - Math.floor((endTime - startTime) / 1000), 100)}</div>
                <p className="text-gray-600">Final Score</p>
                <p className="text-sm text-gray-500 mt-2">
                  Completed in {moves} moves • {Math.floor((endTime - startTime) / 1000)}s
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => setGameState('setup')} variant="outline" className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Change Difficulty
                </Button>
                <Button onClick={startGame} className="gap-2">
                  <Play className="w-4 h-4" />
                  Play Again
                </Button>
              </div>
            </div>
          ) : (
            <div className={`grid ${getGridCols()} gap-3`}>
              {cards.map((card) => (
                <motion.button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className="aspect-square relative"
                  whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
                  whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
                  disabled={card.isMatched}
                >
                  <motion.div
                    className="w-full h-full rounded-xl shadow-lg"
                    initial={false}
                    animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Back of card */}
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="text-white text-2xl">?</div>
                    </div>
                    {/* Front of card */}
                    <div
                      className={`absolute inset-0 ${
                        card.isMatched ? 'bg-green-100 border-2 border-green-400' : 'bg-white border-2 border-gray-200'
                      } rounded-xl flex items-center justify-center text-4xl`}
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      {card.value}
                    </div>
                  </motion.div>
                </motion.button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
