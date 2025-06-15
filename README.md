# 🎨 Kawaii Poll Facemash

<div align="center">
  <h3>どっちがかわいい？ 💕</h3>
  <p>生成AIキャラクターの「かわいさ」を競うマッチアップ投票プラットフォーム</p>
  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iidaatcnt/kawaii-poll-facemash)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

---

## 🌟 概要

**Kawaii Poll Facemash**は、Facebookの創設者が大学時代に作った「Facemash」にインスパイアされた、AIキャラクターの人気投票アプリです。

国際チェス連盟のEloレーティングシステムを採用し、1vs1のマッチアップ投票を通じて公平で動的なランキングを生成します。

### ✨ 主な特徴

- 🎯 **公平な評価**: Eloレーティングシステムによる科学的なランキング
- 🎨 **美しいUI**: Framer Motionによるスムーズなアニメーション
- ⚡ **リアルタイム**: 投票結果の即座反映
- 📱 **レスポンシブ**: モバイル・デスクトップ対応
- 🔒 **セキュア**: Supabase + Vercelによる安全な運用

---

## 🎮 主な機能

### 1vs1 投票システム
- ランダムに選ばれた2つのキャラクターから1つを選択
- 投票結果に基づくEloレーティングの自動計算
- 美しいアニメーション付きの結果表示

### リアルタイムランキング
- Eloレーティング順の動的ランキング
- 総投票数、勝率、タグ情報の表示
- ページネーション対応

### Eloレーティングシステム
```
新レーティング = 旧レーティング + K × (実際の結果 - 期待結果)
期待結果 = 1 / (1 + 10^((相手レーティング - 自分レーティング) / 400))
```

---

## 🛠️ 技術スタック

### フロントエンド
- **Framework**: Next.js 15.3.3 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Animation**: Framer Motion
- **Icons**: Lucide React

### バックエンド
- **Database**: Supabase (PostgreSQL)
- **API**: Next.js API Routes
- **Authentication**: Supabase Auth (Ready)

### インフラ
- **Hosting**: Vercel
- **Version Control**: Git + GitHub
- **CI/CD**: Vercel Auto Deploy

---

## 🚀 クイックスタート

### 前提条件
- Node.js 18+ 
- npm または yarn
- Supabaseアカウント

### 1. リポジトリのクローン
```bash
git clone https://github.com/iidaatcnt/kawaii-poll-facemash.git
cd kawaii-poll-facemash
```

### 2. 依存関係のインストール
```bash
npm install
```

### 3. 環境変数の設定
`.env.local`ファイルを作成し、以下を設定：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Next.js
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Supabaseデータベースの設定
`docs/database-schema.sql`を実行してテーブルを作成

### 5. 開発サーバーの起動
```bash
npm run dev
```

アプリケーションが`http://localhost:3000`で起動します 🎉

---

## 📁 プロジェクト構造

```
kawaii-poll-facemash/
├── public/
│   └── images/           # キャラクター画像
├── src/
│   ├── app/
│   │   ├── api/          # API Routes
│   │   ├── vote/         # 投票ページ
│   │   ├── ranking/      # ランキングページ
│   │   └── page.tsx      # ホームページ
│   ├── lib/
│   │   ├── supabase.ts   # Supabaseクライアント
│   │   └── utils.ts      # Eloアルゴリズム
│   └── types/            # TypeScript型定義
├── .env.local            # 環境変数
└── README.md
```

---

## 🔌 API エンドポイント

### `GET /api/random-pair`
ランダムな2つのキャラクターペアを取得

**Response:**
```json
{
  "success": true,
  "pair": [
    {
      "id": "uuid",
      "imageUrl": "/images/character1.png",
      "title": "Kawaii Character 1",
      "description": "Very cute character",
      "currentRating": 1200
    },
    {
      "id": "uuid",
      "imageUrl": "/images/character2.png", 
      "title": "Kawaii Character 2",
      "description": "Adorable character",
      "currentRating": 1180
    }
  ]
}
```

### `POST /api/submit-vote`
投票結果を送信し、Eloレーティングを更新

**Request:**
```json
{
  "winnerId": "uuid",
  "loserId": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "winner": {...},
    "loser": {...},
    "ratingChange": 16,
    "newWinnerRating": 1216,
    "newLoserRating": 1164
  }
}
```

### `GET /api/rankings`
Eloレーティング順のランキングを取得

**Query Parameters:**
- `page`: ページ番号 (default: 1)
- `limit`: 1ページあたりの件数 (default: 20)
- `minVotes`: 最小投票数フィルタ (default: 0)

---

## 🗃️ データベース設計

### テーブル構造

#### `images` (キャラクター)
- `id`: UUID (Primary Key)
- `title`: キャラクター名
- `url`: 画像URL
- `elo_rating`: Eloレーティング (default: 1200)
- `total_votes`: 総投票数
- `wins` / `losses`: 勝敗数
- `is_approved`: 承認状態
- `tags`: タグ配列

#### `votes` (投票履歴)
- `id`: UUID (Primary Key)
- `winner_id` / `loser_id`: 勝者・敗者のキャラクターID
- `winner_rating_before` / `after`: レーティング変化
- `rating_change`: 変動値
- `voter_ip`: 投票者IP

#### 重要な関数
- `process_vote()`: Eloレーティング計算と投票記録の自動処理

---

## 🎨 カスタマイズ

### 新しいキャラクターの追加
1. `public/images/`に画像ファイルを配置
2. Supabaseの`images`テーブルにレコードを挿入

### UIのカスタマイズ
- `tailwind.config.js`: カラーパレット、フォント
- `src/app/globals.css`: グローバルスタイル
- `src/app/*/page.tsx`: 各ページのレイアウト

### Eloレーティングの調整
`src/lib/utils.ts`の`calculateEloRating`関数でKファクターを変更

---

## 🚢 デプロイ

### Vercelへのデプロイ

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/iidaatcnt/kawaii-poll-facemash)

1. 上記ボタンをクリック
2. GitHubリポジトリを選択
3. 環境変数を設定
4. デプロイ完了 🎉

### 環境変数の設定
Vercel Dashboard > Settings > Environment Variablesで設定

---

## 🧪 テスト

```bash
# ビルドテスト
npm run build

# 型チェック
npm run type-check

# リンターチェック
npm run lint
```

---

## 🤝 コントリビューション

プルリクエストやイシューの報告を歓迎します！

### 開発フロー
1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

### 今後の実装予定
- [ ] ユーザー認証システム
- [ ] 画像アップロード機能
- [ ] コメント・レビュー機能
- [ ] 詳細統計ダッシュボード
- [ ] タグ検索・フィルタ
- [ ] 多言語対応

---

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルをご覧ください。

---

## 🙏 謝辞

- [Next.js](https://nextjs.org/) - 素晴らしいReactフレームワーク
- [Supabase](https://supabase.com/) - オープンソースのFirebase代替
- [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストCSSフレームワーク
- [Framer Motion](https://www.framer.com/motion/) - React用アニメーションライブラリ
- [Vercel](https://vercel.com/) - 最高のホスティングプラットフォーム

---

## 📞 お問い合わせ

質問やフィードバックがありましたら、お気軽に[Issues](https://github.com/iidaatcnt/kawaii-poll-facemash/issues)にお書きください。

---

<div align="center">
  <p>Made with 💕 by iidaatcnt</p>
  <p>⭐ このプロジェクトが気に入ったらスターをお願いします！</p>
</div>