import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play, RotateCcw, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface PatternSequenceProps {
  onGameEnd: (score: number, difficulty: string) => void;
  onBack: () => void;
}

type GameState = 'start' | 'showing' | 'input' | 'correct' | 'wrong' | 'end';

const patterns = ['△', '○', '□', '◇', '★', '♥', '♦', '♣'];
const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500'];

export function PatternSequence({ onGameEnd, onBack }: PatternSequenceProps) {
  const [gameState, setGameState] = useState<GameState>('start');
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [showingIndex, setShowingIndex] = useState(0);
  const [lives, setLives] = useState(3);

  const startGame = () => {
    setGameState('start');
    setScore(0);
    setCurrentLevel(1);
    setLives(3);
    startLevel(1);
  };

  const startLevel = (level: number) => {
    const length = Math.min(3 + level, 12);
    const newSequence = Array.from({ length }, () => Math.floor(Math.random() * patterns.length));
    setSequence(newSequence);
    setUserSequence([]);
    setShowingIndex(0);
    setGameState('showing');
  };

  useEffect(() => {
    if (gameState === 'showing') {
      if (showingIndex < sequence.length) {
        const timer = setTimeout(() => {
          setShowingIndex(prev => prev + 1);
        }, 800);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setGameState('input');
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [gameState, showingIndex, sequence.length]);

  const handlePatternClick = (index: number) => {
    if (gameState !== 'input') return;

    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);

    const currentIndex = newUserSequence.length - 1;
    if (newUserSequence[currentIndex] !== sequence[currentIndex]) {
      setGameState('wrong');
      const newLives = lives - 1;
      setLives(newLives);
      
      if (newLives === 0) {
        setTimeout(() => {
          setGameState('end');
          onGameEnd(score, `Level ${currentLevel}`);
        }, 1500);
      } else {
        setTimeout(() => {
          startLevel(currentLevel);
        }, 1500);
      }
    } else if (newUserSequence.length === sequence.length) {
      setGameState('correct');
      const levelScore = sequence.length * 10;
      setScore(prev => prev + levelScore);
      setTimeout(() => {
        setCurrentLevel(prev => prev + 1);
        startLevel(currentLevel + 1);
      }, 1500);
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
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            Level {currentLevel}
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Score: {score}
          </Badge>
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < lives ? 'bg-red-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Game Card */}
      <Card>
        <CardHeader>
          <CardTitle>Pattern Sequence</CardTitle>
          <CardDescription>
            {gameState === 'start' && 'Watch the sequence carefully, then repeat it!'}
            {gameState === 'showing' && 'Watch carefully...'}
            {gameState === 'input' && 'Now repeat the sequence!'}
            {gameState === 'correct' && '✓ Correct! Next level...'}
            {gameState === 'wrong' && '✗ Wrong pattern! Try again...'}
            {gameState === 'end' && 'Game Over!'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {gameState === 'start' ? (
            <div className="text-center py-12">
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
                <div className="text-4xl mb-2">{score}</div>
                <p className="text-gray-600">Final Score</p>
                <p className="text-sm text-gray-500 mt-2">Reached Level {currentLevel}</p>
              </div>
              <Button onClick={startGame} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Play Again
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Display Area */}
              <div className="min-h-[200px] flex items-center justify-center bg-gray-50 rounded-xl p-8">
                <div className="flex gap-4 flex-wrap justify-center">
                  <AnimatePresence mode="popLayout">
                    {gameState === 'showing' && sequence.slice(0, showingIndex).map((patternIndex, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        className={`w-16 h-16 ${colors[patternIndex]} rounded-xl flex items-center justify-center text-white text-3xl shadow-lg`}
                      >
                        {patterns[patternIndex]}
                      </motion.div>
                    ))}
                    {gameState === 'input' && userSequence.map((patternIndex, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`w-16 h-16 ${colors[patternIndex]} rounded-xl flex items-center justify-center text-white text-3xl shadow-lg`}
                      >
                        {patterns[patternIndex]}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              {/* Input Buttons */}
              {(gameState === 'input' || gameState === 'correct' || gameState === 'wrong') && (
                <div className="grid grid-cols-4 gap-3">
                  {patterns.map((pattern, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePatternClick(index)}
                      disabled={gameState !== 'input'}
                      className={`aspect-square ${colors[index]} rounded-xl flex items-center justify-center text-white text-4xl shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {pattern}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
