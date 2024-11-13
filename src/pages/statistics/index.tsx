import { useEffect, useState } from 'react'
import classicData from '../../assets/statistics/classic.json'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface TeamScore {
  name: string
  total: number
  gamesPlayed: number
}

interface TeamGameData {
  date: string
  total: number
  scores: number[]
}

function Statistics() {
  const [teamTotals, setTeamTotals] = useState<Map<string, TeamScore>>(new Map())
  const [teamHistory, setTeamHistory] = useState<TeamGameData[]>([])
  const TEAM_NAME = "Первые встречные"

  useEffect(() => {
    const calculateTeamTotals = () => {
      const totalsMap = new Map<string, TeamScore>()
      const teamGames: TeamGameData[] = []

      classicData.forEach(game => {
        const teamInGame = game.teams.find(team => team.name === TEAM_NAME)
        if (teamInGame) {
          teamGames.push({
            date: game.date,
            total: teamInGame.total,
            scores: teamInGame.scores
          })
        }

        game.teams.forEach(team => {
          const existingTeam = totalsMap.get(team.name)
          if (existingTeam) {
            totalsMap.set(team.name, {
              name: team.name,
              total: existingTeam.total + team.total,
              gamesPlayed: existingTeam.gamesPlayed + 1
            })
          } else {
            totalsMap.set(team.name, {
              name: team.name,
              total: team.total,
              gamesPlayed: 1
            })
          }
        })
      })

      setTeamHistory(teamGames)
      setTeamTotals(totalsMap)
    }

    calculateTeamTotals()
  }, [])

  // Calculate average points per round
  const averagePointsPerRound = teamHistory.length > 0 
    ? teamHistory[0].scores.map((_, roundIndex) => {
        const sum = teamHistory.reduce((acc, game) => acc + game.scores[roundIndex], 0)
        return Number((sum / teamHistory.length).toFixed(2))
      })
    : []

  const formatDate = (date: string) => {
    // Convert "10.10.2024" to "10.10"
    return date.split('.').slice(0, 2).join('.')
  }

  const pointsPerGameData = {
    labels: teamHistory.map(game => formatDate(game.date)),
    datasets: [
      {
        label: 'Total',
        data: teamHistory.map(game => game.total),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
    ],
  }

  const averagePointsPerRoundData = {
    labels: ['1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        label: 'Average',
        data: averagePointsPerRound,
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth: 1,
      },
    ],
  }

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: window.innerWidth < 768 ? 12 : 40,
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          },
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
  }

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: window.innerWidth < 768 ? 12 : 40,
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      },
      x: {
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      }
    },
  }

  return (
    <div className="p-2 sm:p-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Statistics</h1>
      
      {/* Team Summary */}
      <div className="mb-4 sm:mb-8 p-3 sm:p-4 bg-white rounded-lg shadow">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">{TEAM_NAME}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-gray-600">Games Played</p>
            <p className="text-2xl font-bold">{teamHistory.length}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Total Points</p>
            <p className="text-2xl font-bold">
              {teamTotals.get(TEAM_NAME)?.total || 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Average per Game</p>
            <p className="text-2xl font-bold">
              {((teamTotals.get(TEAM_NAME)?.total || 0) / teamHistory.length).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Points per Game</h3>
          <div className="h-[250px] sm:h-[300px]">
            <Line options={lineChartOptions} data={pointsPerGameData} />
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
          <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Average Points per Round</h3>
          <div className="h-[250px] sm:h-[300px]">
            <Bar options={barChartOptions} data={averagePointsPerRoundData} />
          </div>
        </div>
      </div>

      {/* Game History */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Game History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr>
                <th className="p-3 border-b">Date</th>
                <th className="p-3 border-b">Total</th>
                {[1, 2, 3, 4, 5, 6, 7].map(round => (
                  <th key={round} className="p-3 border-b">Round {round}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teamHistory.map((game, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border-b text-center">{game.date}</td>
                  <td className="p-3 border-b text-center">{game.total}</td>
                  {game.scores.map((score, scoreIndex) => (
                    <td key={scoreIndex} className="p-3 border-b text-center">{score}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Statistics
