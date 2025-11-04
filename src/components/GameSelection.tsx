import { GameType } from '../App';
import { Grid3x3, Palette, Hash, Sparkles, Grid2x2, Brain } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { UserProgress } from '../App';

interface GameSelectionProps {
  onSelectGame: (game: GameType) => void;
  userProgress: UserProgress;
}

const games = [
  {
    id: 'pattern-sequence' as GameType,
    title: 'Pattern Sequence',
    description: 'Remember and repeat increasingly complex patterns',
    icon: Grid3x3,
    color: 'from-blue-500 to-cyan-500',
    difficulty: 'Medium'
  },
  {
    id: 'memory-cards' as GameType,
    title: 'Memory Cards',
    description: 'Match pairs of cards to test your memory',
    icon: Grid2x2,
    color: 'from-purple-500 to-pink-500',
    difficulty: 'Easy'
  },
  {
    id: 'grid-pattern' as GameType,
    title: 'Grid Pattern',
    description: 'Memorize positions on a grid and recall them',
    icon: Grid3x3,
    color: 'from-emerald-500 to-teal-500',
    difficulty: 'Hard'
  },
  {
    id: 'number-memory' as GameType,
    title: 'Number Memory',
    description: 'Remember longer and longer sequences of numbers',
    icon: Hash,
    color: 'from-orange-500 to-red-500',
    difficulty: 'Medium'
  },
  {
    id: 'color-sequence' as GameType,
    title: 'Color Sequence',
    description: 'Follow the pattern of colors and repeat it back',
    icon: Palette,
    color: 'from-indigo-500 to-purple-500',
    difficulty: 'Easy'
  }
];

export function GameSelection({ onSelectGame, userProgress }: GameSelectionProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-purple-200">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm text-purple-600">Challenge Your Mind</span>
        </div>
        <h2 className="text-4xl sm:text-5xl">Choose Your Challenge</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Select a game to improve your cognitive abilities and track your progress
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-2xl border border-purple-100 text-center">
          <div className="text-3xl text-indigo-600">{userProgress.totalGamesPlayed}</div>
          <div className="text-sm text-gray-600 mt-1">Games Played</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-purple-100 text-center">
          <div className="text-3xl text-purple-600">{userProgress.totalScore.toLocaleString()}</div>
          <div className="text-sm text-gray-600 mt-1">Total Score</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-purple-100 text-center">
          <div className="text-3xl text-pink-600">{Object.keys(userProgress.highScores).length}</div>
          <div className="text-sm text-gray-600 mt-1">Games Mastered</div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => {
          const Icon = game.icon;
          const highScore = userProgress.highScores[game.title] || 0;
          
          return (
            <Card 
              key={game.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-purple-300"
              onClick={() => onSelectGame(game.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`bg-gradient-to-br ${game.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary">{game.difficulty}</Badge>
                </div>
                <CardTitle className="mt-4">{game.title}</CardTitle>
                <CardDescription>{game.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {highScore > 0 && (
                  <div className="flex items-center justify-between bg-amber-50 px-3 py-2 rounded-lg border border-amber-200">
                    <span className="text-sm text-amber-800">Best Score</span>
                    <span className="text-amber-900">{highScore}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="bg-white p-6 rounded-2xl border border-purple-100 max-w-3xl mx-auto">
        <div className="flex items-start gap-4">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Brain className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg mb-2">Training Tips</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Practice regularly for 10-15 minutes daily for best results</li>
              <li>• Start with easier games and gradually increase difficulty</li>
              <li>• Take breaks between sessions to avoid mental fatigue</li>
              <li>• Challenge yourself with different game types to exercise various cognitive skills</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
