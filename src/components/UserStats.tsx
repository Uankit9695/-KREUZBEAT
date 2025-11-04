import { UserProgress } from '../App';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Trophy, TrendingUp, Target, Calendar } from 'lucide-react';
import { Button } from './ui/button';

interface UserStatsProps {
  userProgress: UserProgress;
  onClose: () => void;
}

export function UserStats({ userProgress, onClose }: UserStatsProps) {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const highScoreEntries = Object.entries(userProgress.highScores);
  const averageScore = userProgress.totalGamesPlayed > 0 
    ? Math.round(userProgress.totalScore / userProgress.totalGamesPlayed)
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">Your Statistics</h2>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Games</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{userProgress.totalGamesPlayed}</div>
            <p className="text-xs text-muted-foreground">Games completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total Points</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{userProgress.totalScore.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Lifetime score</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{averageScore}</div>
            <p className="text-xs text-muted-foreground">Per game</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Games Played</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{highScoreEntries.length}</div>
            <p className="text-xs text-muted-foreground">Different games</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* High Scores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              High Scores
            </CardTitle>
          </CardHeader>
          <CardContent>
            {highScoreEntries.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">
                No games played yet. Start playing to see your high scores!
              </p>
            ) : (
              <div className="space-y-3">
                {highScoreEntries
                  .sort((a, b) => b[1] - a[1])
                  .map(([game, score], index) => (
                    <div
                      key={game}
                      className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant={index === 0 ? 'default' : 'secondary'}>
                          #{index + 1}
                        </Badge>
                        <span className="text-sm">{game}</span>
                      </div>
                      <span className="text-purple-600">{score}</span>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Games */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Recent Games
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userProgress.recentScores.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">
                No recent games. Start playing to track your progress!
              </p>
            ) : (
              <div className="space-y-3">
                {userProgress.recentScores.map((gameScore, index) => (
                  <div
                    key={`${gameScore.timestamp}-${index}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200"
                  >
                    <div>
                      <div className="text-sm">{gameScore.game}</div>
                      <div className="text-xs text-gray-500">
                        {formatDate(gameScore.timestamp)}
                        {gameScore.difficulty && ` • ${gameScore.difficulty}`}
                      </div>
                    </div>
                    <Badge variant="outline">{gameScore.score}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
