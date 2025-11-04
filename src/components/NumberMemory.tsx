import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Play, RotateCcw, Trophy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

interface NumberMemoryProps {
  onGameEnd: (score: number, difficulty: string) => void;
  onBack: () => void;
}

type GameState = 'start' | 'showing' | 'input' | 'correct' | 'wrong' | 'end';

export function NumberMemory({ onGameEnd, onBack }: NumberMemoryProps) {
  const [gameState, setGameState] = useState<GameState>('start');
  const [level, setLevel] = useState(1);
  const [number, setNumber] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [displayTime, setDisplayTime] = useState(2);

  const startGame = () => {
    setLevel(1);
    setScore(0);
    startLevel(1);
  };

  const generateNumber = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
  };

  const startLevel = (currentLevel: number) => {
    const length = currentLevel + 2;
    const newNumber = generateNumber(length);
    setNumber(newNumber);
    setUserInput('');
    setDisplayTime(Math.max(1.5, 3 - currentLevel * 0.1));
    setGameState('showing');
  };

  useEffect(() => {
    if (gameState === 'showing') {
      const timer = setTimeout(() => {
        setGameState('input');
      }, displayTime * 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState, displayTime]);

  const handleSubmit = () => {
    if (userInput === number) {
      setGameState('correct');
      const levelScore = number.length * 15;
      setScore(prev => prev + levelScore);
      setTimeout(() => {
        setLevel(prev => prev + 1);
        startLevel(level + 1);
      }, 1500);
    } else {
      setGameState('wrong');
      setTimeout(() => {
        setGameState('end');
        onGameEnd(score, `${number.length} digits`);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userInput.length === number.length) {
      handleSubmit();
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
            Level {level}
          </Badge>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Score: {score}
          </Badge>
        </div>
      </div>

      {/* Game Card */}
      <Card>
        <CardHeader>
          <CardTitle>Number Memory</CardTitle>
          <CardDescription>
            {gameState === 'start' && 'Remember increasingly longer numbers!'}
            {gameState === 'showing' && 'Memorize this number...'}
            {gameState === 'input' && 'Enter the number you saw!'}
            {gameState === 'correct' && '✓ Correct! Next level...'}
            {gameState === 'wrong' && '✗ Wrong number!'}
            {gameState === 'end' && 'Game Over!'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {gameState === 'start' ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-gray-600">
                A number will be shown briefly. Memorize it and type it back!
              </p>
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
                <p className="text-sm text-gray-500 mt-2">
                  Reached {number.length} digits
                </p>
                <div className="mt-4 text-sm text-gray-500">
                  Correct number was: <span className="text-purple-600">{number}</span>
                </div>
              </div>
              <Button onClick={startGame} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Play Again
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Display Area */}
              <div className="min-h-[200px] flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8">
                <AnimatePresence mode="wait">
                  {gameState === 'showing' ? (
                    <motion.div
                      key="number"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="text-center"
                    >
                      <div className="text-6xl tracking-wider mb-4 text-purple-600 tabular-nums">
                        {number}
                      </div>
                      <div className="text-sm text-gray-600">
                        {number.length} digits
                      </div>
                    </motion.div>
                  ) : gameState === 'input' ? (
                    <motion.div
                      key="input"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-full max-w-md space-y-4"
                    >
                      <div className="text-center text-sm text-gray-600 mb-4">
                        Enter the {number.length}-digit number
                      </div>
                      <Input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={userInput}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, '');
                          if (value.length <= number.length) {
                            setUserInput(value);
                          }
                        }}
                        onKeyPress={handleKeyPress}
                        placeholder="Type the number..."
                        className="text-center text-3xl h-16 tracking-wider tabular-nums"
                        autoFocus
                      />
                      <div className="flex gap-2 justify-center">
                        {Array.from({ length: number.length }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              i < userInput.length ? 'bg-purple-500' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <Button
                        onClick={handleSubmit}
                        disabled={userInput.length !== number.length}
                        className="w-full gap-2"
                        size="lg"
                      >
                        <Check className="w-5 h-5" />
                        Submit
                      </Button>
                    </motion.div>
                  ) : gameState === 'correct' ? (
                    <motion.div
                      key="correct"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-center"
                    >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-10 h-10 text-green-600" />
                      </div>
                      <div className="text-2xl text-green-600">Correct!</div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="wrong"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-center space-y-4"
                    >
                      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-4xl">✗</span>
                      </div>
                      <div className="text-2xl text-red-600">Wrong!</div>
                      <div className="text-sm text-gray-600">
                        You entered: <span className="text-red-600">{userInput}</span>
                        <br />
                        Correct was: <span className="text-green-600">{number}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
