# これいくら？ 身の回りの値段写真集

100件の「見たことはあるが値段は知らないもの」を、写真付きの値段当てカードとして見られる静的ページです。

## ローカル確認

`index.html` を直接ブラウザで開けます。

ローカルサーバーで確認する場合:

```sh
python3 -m http.server 4173
```

その後、`http://localhost:4173` を開きます。

## GitHub Pages公開

このリポジトリはビルド不要です。GitHub Pagesでは次の設定で公開できます。

- Source: Deploy from a branch
- Branch: `main` または公開したいブランチ
- Folder: `/ (root)`

`index.html`、`styles.css`、`script.js`、`data/items.js` はすべて相対パスで参照しています。`data/items.js` は通常のscriptとして読み込むため、GitHub Pagesだけでなく、`index.html` を直接開いた場合も動きます。`.nojekyll` を置いているため、GitHub Pages上でもそのまま静的ファイルとして配信されます。

## データ再生成

題材や価格帯を見直す場合は、`tools/build-data.mjs` の `baseItems` を編集してから実行します。

```sh
node tools/build-data.mjs
```

このスクリプトは、価格根拠の検索リンクと写真URLを `data/items.js` と `research/sources.md` に書き出します。
