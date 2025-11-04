import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play, RotateCcw, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface GridPatternProps {
  onGameEnd: (score: number, difficulty: string) => void;
  onBack: () => void;
}

type GameState = 'start' | 'memorize' | 'recall' | 'correct' | 'wrong' | 'end';

export function GridPattern({ onGameEnd, onBack }: GridPatternProps) {
  const [gameState, setGameState] = useState<GameState>('start');
  const [gridSize] = useState(5);
  const [level, setLevel] = useState(1);
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [memorizeTime, setMemorizeTime] = useState(3);

  const startGame = () => {
    setLevel(1);
    setScore(0);
    setLives(3);
    startLevel(1);
  };

  const startLevel = (currentLevel: number) => {
    const patternSize = Math.min(3 + currentLevel, 15);
    const newPattern: number[] = [];
    const totalCells = gridSize * gridSize;
    
    while (newPattern.length < patternSize) {
      const cell = Math.floor(Math.random() * totalCells);
      if (!newPattern.includes(cell)) {
        newPattern.push(cell);
      }
    }
    
    setPattern(newPattern);
    setUserPattern([]);
    setMemorizeTime(Math.max(2, 5 - Math.floor(currentLevel / 3)));
    setGameState('memorize');
  };

  useEffect(() => {
    if (gameState === 'memorize') {
      const timer = setTimeout(() => {
        setGameState('recall');
      }, memorizeTime * 1000);
      return () => clearTimeout(timer);
    }
  }, [gameState, memorizeTime]);

  const handleCellClick = (index: number) => {
    if (gameState !== 'recall') return;
    if (userPattern.includes(index)) return;

    const newUserPattern = [...userPattern, index];
    setUserPattern(newUserPattern);

    if (!pattern.includes(index)) {
      setGameState('wrong');
      const newLives = lives - 1;
      setLives(newLives);
      
      if (newLives === 0) {
        setTimeout(() => {
          setGameState('end');
          onGameEnd(score, `Level ${level}`);
        }, 1500);
      } else {
        setTimeout(() => {
          startLevel(level);
        }, 1500);
      }
    } else if (newUserPattern.length === pattern.length) {
      setGameState('correct');
      const levelScore = pattern.length * 20;
      setScore(prev => prev + levelScore);
      setTimeout(() => {
        setLevel(prev => prev + 1);
        startLevel(level + 1);
      }, 1500);
    }
  };

  const getCellClass = (index: number) => {
    if (gameState === 'memorize' && pattern.includes(index)) {
      return 'bg-gradient-to-br from-purple-500 to-pink-500 scale-95';
    }
    if (gameState === 'recall' && userPattern.includes(index)) {
      if (pattern.includes(index)) {
        return 'bg-gradient-to-br from-green-500 to-emerald-500 scale-95';
      } else {
        return 'bg-gradient-to-br from-red-500 to-orange-500 scale-95';
      }
    }
    if (gameState === 'wrong' && pattern.includes(index)) {
      return 'bg-gradient-to-br from-blue-400 to-cyan-400 scale-95';
    }
    return 'bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-300';
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
          <CardTitle>Grid Pattern</CardTitle>
          <CardDescription>
            {gameState === 'start' && 'Memorize the highlighted cells, then recall them!'}
            {gameState === 'memorize' && `Memorize the pattern... (${memorizeTime}s)`}
            {gameState === 'recall' && 'Click all the cells that were highlighted!'}
            {gameState === 'correct' && '✓ Perfect! Next level...'}
            {gameState === 'wrong' && '✗ Missed some cells! Try again...'}
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
                <p className="text-sm text-gray-500 mt-2">Reached Level {level}</p>
              </div>
              <Button onClick={startGame} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Play Again
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div 
                className="grid gap-2 p-4"
                style={{
                  gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                  maxWidth: '400px'
                }}
              >
                {Array.from({ length: gridSize * gridSize }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleCellClick(index)}
                    disabled={gameState !== 'recall'}
                    className={`aspect-square rounded-lg transition-all duration-300 shadow-sm ${getCellClass(index)}`}
                    whileHover={gameState === 'recall' ? { scale: 1.05 } : {}}
                    whileTap={gameState === 'recall' ? { scale: 0.95 } : {}}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Progress indicator */}
          {gameState === 'recall' && (
            <div className="mt-6 text-center">
              <div className="text-sm text-gray-600">
                Selected: {userPattern.length} / {pattern.length}
              </div>
              <div className="w-full max-w-xs mx-auto mt-2 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(userPattern.length / pattern.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
