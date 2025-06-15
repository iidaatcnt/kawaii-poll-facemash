import Link from 'next/link'

export default function VotePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            どっちがかわいい？ 💕
          </h1>
          <p className="text-gray-600 text-sm lg:text-base">
            投票システムは準備中です...
          </p>
        </div>
        
        {/* メインコンテンツ */}
        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg text-center">
          <div className="text-4xl lg:text-6xl mb-6">🚧</div>
          <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-gray-800">投票機能を構築中</h2>
          <p className="text-gray-600 mb-8 text-sm lg:text-base max-w-md mx-auto">
            Supabaseデータベースを設定してから投票機能を実装します
          </p>
          
          {/* プレースホルダー画像 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 max-w-4xl mx-auto">
            <div className="bg-gray-100 rounded-xl p-8 lg:p-12 aspect-square flex items-center justify-center hover:bg-gray-200 transition-colors duration-300">
              <span className="text-gray-400 text-base lg:text-lg font-medium">画像1</span>
            </div>
            <div className="bg-gray-100 rounded-xl p-8 lg:p-12 aspect-square flex items-center justify-center hover:bg-gray-200 transition-colors duration-300">
              <span className="text-gray-400 text-base lg:text-lg font-medium">画像2</span>
            </div>
          </div>
          
          {/* ナビゲーションボタン */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/" 
              className="px-6 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors duration-300 font-medium"
            >
              ホームに戻る
            </Link>
            <Link 
              href="/ranking" 
              className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors duration-300 font-medium"
            >
              ランキングを見る
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}