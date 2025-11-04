import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Play, RotateCcw, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface ColorSequenceProps {
  onGameEnd: (score: number, difficulty: string) => void;
  onBack: () => void;
}

type GameState = 'start' | 'showing' | 'input' | 'end';

const colors = [
  { name: 'Red', bg: 'bg-red-500', active: 'bg-red-600', sound: 261.63 },
  { name: 'Blue', bg: 'bg-blue-500', active: 'bg-blue-600', sound: 329.63 },
  { name: 'Green', bg: 'bg-green-500', active: 'bg-green-600', sound: 392.00 },
  { name: 'Yellow', bg: 'bg-yellow-400', active: 'bg-yellow-500', sound: 523.25 }
];

export function ColorSequence({ onGameEnd, onBack }: ColorSequenceProps) {
  const [gameState, setGameState] = useState<GameState>('start');
  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(-1);
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = (frequency: number) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const startGame = () => {
    setLevel(1);
    setScore(0);
    playSequence([Math.floor(Math.random() * colors.length)]);
  };

  const playSequence = (seq: number[]) => {
    setSequence(seq);
    setUserSequence([]);
    setGameState('showing');
    setIsPlaying(true);
    
    seq.forEach((colorIndex, i) => {
      setTimeout(() => {
        setCurrentPlayingIndex(colorIndex);
        playSound(colors[colorIndex].sound);
        setTimeout(() => {
          setCurrentPlayingIndex(-1);
          if (i === seq.length - 1) {
            setIsPlaying(false);
            setGameState('input');
          }
        }, 400);
      }, i * 800);
    });
  };

  const handleColorClick = (colorIndex: number) => {
    if (gameState !== 'input' || isPlaying) return;

    playSound(colors[colorIndex].sound);
    const newUserSequence = [...userSequence, colorIndex];
    setUserSequence(newUserSequence);

    const currentIndex = newUserSequence.length - 1;
    
    if (newUserSequence[currentIndex] !== sequence[currentIndex]) {
      setTimeout(() => {
        setGameState('end');
        onGameEnd(score, `Level ${level}`);
      }, 500);
      return;
    }

    if (newUserSequence.length === sequence.length) {
      const levelScore = level * 10;
      setScore(prev => prev + levelScore);
      setLevel(prev => prev + 1);
      
      setTimeout(() => {
        const newSequence = [...sequence, Math.floor(Math.random() * colors.length)];
        playSequence(newSequence);
      }, 1000);
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
          <CardTitle>Color Sequence</CardTitle>
          <CardDescription>
            {gameState === 'start' && 'Watch the color pattern and repeat it!'}
            {gameState === 'showing' && 'Watch carefully...'}
            {gameState === 'input' && 'Repeat the sequence!'}
            {gameState === 'end' && 'Game Over!'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {gameState === 'start' ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-gray-600">
                Watch the sequence of colors light up, then repeat them in order!
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
                  Reached Level {level} • {sequence.length} colors
                </p>
              </div>
              <Button onClick={startGame} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Play Again
              </Button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Progress Indicator */}
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-2">
                  {gameState === 'showing' ? 'Watch the sequence...' : `Tap the colors (${userSequence.length}/${sequence.length})`}
                </div>
                <div className="flex gap-2 justify-center">
                  {sequence.map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all ${
                        i < userSequence.length ? 'bg-purple-500 scale-125' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Color Buttons */}
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {colors.map((color, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleColorClick(index)}
                    disabled={gameState !== 'input'}
                    className={`aspect-square rounded-2xl shadow-lg transition-all ${
                      currentPlayingIndex === index ? color.active : color.bg
                    } ${
                      currentPlayingIndex === index ? 'scale-95' : ''
                    } disabled:cursor-not-allowed`}
                    whileHover={gameState === 'input' ? { scale: 1.05 } : {}}
                    whileTap={gameState === 'input' ? { scale: 0.95 } : {}}
                    animate={{
                      scale: currentPlayingIndex === index ? 0.95 : 1,
                      boxShadow: currentPlayingIndex === index 
                        ? '0 0 30px rgba(255, 255, 255, 0.5)' 
                        : '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="sr-only">{color.name}</span>
                  </motion.button>
                ))}
              </div>

              {/* Instructions */}
              {gameState === 'input' && (
                <div className="text-center text-sm text-gray-500">
                  Click the colored buttons in the same order they lit up
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
