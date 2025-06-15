'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VoteOption, VoteResult } from '@/types'

export default function VotePage() {
  const [currentPair, setCurrentPair] = useState<[VoteOption, VoteOption] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVoting, setIsVoting] = useState(false)
  const [lastResult, setLastResult] = useState<VoteResult | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [totalVotes, setTotalVotes] = useState(0)

  // ランダムペアを取得する関数
  const fetchRandomPair = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/random-pair')
      const data = await response.json()
      
      if (data.success && data.pair) {
        setCurrentPair(data.pair as [VoteOption, VoteOption])
      } else {
        console.error('Failed to fetch pair:', data.error)
      }
    } catch (error) {
      console.error('Error fetching pair:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // 投票を送信する関数
  const submitVote = async (winnerId: string, loserId: string) => {
    try {
      setIsVoting(true)
      const response = await fetch('/api/submit-vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ winnerId, loserId }),
      })
      
      const data = await response.json()
      
      if (data.success && data.result) {
        setLastResult(data.result)
        setShowResult(true)
        setTotalVotes(prev => prev + 1)
        
        // 3秒後に結果を隠して次のペアを取得
        setTimeout(() => {
          console.log('Starting next pair fetch...')
          setShowResult(false)
          setLastResult(null)
          setIsVoting(false) // 投票状態をリセット
          fetchRandomPair()
        }, 3000)
      } else {
        console.error('Failed to submit vote:', data.error)
        setIsVoting(false)
      }
    } catch (error) {
      console.error('Error submitting vote:', error)
      setIsVoting(false)
    }
  }

  // 投票ハンドラー
  const handleVote = (selectedId: string) => {
    if (!currentPair || isVoting || showResult) return
    
    const winnerId = selectedId
    const loserId = currentPair[0].id === selectedId ? currentPair[1].id : currentPair[0].id
    
    submitVote(winnerId, loserId)
  }

  // コンポーネントマウント時にペアを取得
  useEffect(() => {
    fetchRandomPair()
  }, [])

  if (isLoading && !currentPair) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">キャラクターを読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
            どっちがかわいい？ 💕
          </h1>
          <p className="text-gray-600">
            あなたの投票でキャラクターのランキングが決まります！
          </p>
          {totalVotes > 0 && (
            <p className="text-sm text-purple-600 mt-2">
              投票回数: {totalVotes}回
            </p>
          )}
        </div>

        <AnimatePresence mode="wait">
          {showResult && lastResult ? (
            // 投票結果表示
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-purple-200">
                <h2 className="text-2xl font-bold text-purple-600 mb-4">
                  投票結果 ✨
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="text-center">
                      <img
                        src={lastResult.winner.imageUrl}
                        alt={lastResult.winner.title}
                        className="w-24 h-24 rounded-xl object-cover mx-auto mb-2 ring-4 ring-yellow-400"
                      />
                      <p className="font-bold text-green-600">勝利!</p>
                      <p className="text-sm">{lastResult.winner.title}</p>
                      <p className="text-xs text-green-600">
                        +{lastResult.ratingChange} → {lastResult.newWinnerRating}
                      </p>
                    </div>
                    <div className="text-2xl">VS</div>
                    <div className="text-center">
                      <img
                        src={lastResult.loser.imageUrl}
                        alt={lastResult.loser.title}
                        className="w-24 h-24 rounded-xl object-cover mx-auto mb-2 ring-2 ring-gray-300"
                      />
                      <p className="font-bold text-gray-600">惜敗</p>
                      <p className="text-sm">{lastResult.loser.title}</p>
                      <p className="text-xs text-red-600">
                        -{lastResult.ratingChange} → {lastResult.newLoserRating}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  次のペアを読み込み中...
                </p>
              </div>
            </motion.div>
          ) : currentPair ? (
            // 投票UI
            <motion.div
              key="voting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {currentPair.map((option, index) => (
                  <motion.div
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative cursor-pointer ${
                      isVoting ? 'pointer-events-none' : ''
                    }`}
                    onClick={() => handleVote(option.id)}
                  >
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-purple-200 hover:border-purple-400 transition-all duration-300">
                      <div className="aspect-square relative">
                        <img
                          src={option.imageUrl}
                          alt={option.title}
                          className="w-full h-full object-cover"
                        />
                        {isVoting && (
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {option.title}
                        </h3>
                        {option.description && (
                          <p className="text-gray-600 text-sm mb-3">
                            {option.description}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-purple-600 font-semibold">
                            Rating: {option.currentRating}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow"
                            disabled={isVoting}
                          >
                            この子に投票! 💕
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {!isVoting && (
                <div className="text-center mt-8">
                  <button
                    onClick={fetchRandomPair}
                    className="text-purple-600 hover:text-purple-800 text-sm underline"
                    disabled={isLoading}
                  >
                    別のペアを表示
                  </button>
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}