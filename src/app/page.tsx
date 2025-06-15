import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="text-center space-y-6 lg:space-y-8">
          {/* タイトルセクション */}
          <div className="space-y-3 lg:space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Kawaii Poll
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-600">
              どっちがかわいい？ 🎨✨
            </h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto px-4">
              生成AIキャラクターの「かわいさ」を競うマッチアップ投票プラットフォーム
            </p>
          </div>

          {/* ボタンセクション */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Link 
              href="/vote" 
              className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold text-base lg:text-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
            >
              投票を始める 💕
            </Link>
            
            <Link 
              href="/ranking" 
              className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 bg-white text-purple-600 rounded-full font-semibold text-base lg:text-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-purple-200 text-center"
            >
              ランキングを見る 🏆
            </Link>
          </div>

          {/* 特徴カードセクション */}
          <div className="mt-12 lg:mt-16 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {/* カード1 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">公平な評価</h3>
                <p className="text-gray-600 text-sm">
                  Eloレーティングシステムで公平な競争を実現
                </p>
              </div>
              
              {/* カード2 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">AI生成アート</h3>
                <p className="text-gray-600 text-sm">
                  様々なAIで生成されたキャラクターが登場
                </p>
              </div>
              
              {/* カード3 */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">💖</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">かわいさ重視</h3>
                <p className="text-gray-600 text-sm">
                  みんなで決める究極のかわいさランキング
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}