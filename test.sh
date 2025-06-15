# 1. 最重要: package.jsonの依存関係
cat package.json

# 2. 現在のTailwind設定ファイルを確認
ls tailwind.config.*
cat tailwind.config.*

# 3. PostCSS設定
cat postcss.config.mjs

# 4. globals.css
cat src/app/globals.css

# 5. 現在のページファイル
cat src/app/page.tsx

# 6. インストールされているTailwind関連パッケージ
npm list | grep tailwind
