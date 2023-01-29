# simple-pagenate

## 概要
ページネーションを簡単に行えるようにするjQueryプラグインです。

■サンプル動作環境

https://yslius.github.io/simple-pagenate/

## 必要なもの
jQueryを使用します

## 使い方
jQueryと本プラグインを読み込み、$(".pagenation-block").paginathing()を使用します。
オプションを指定することで１画面の要素数などを設定できます。

```html
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
    <link rel="stylesheet" href="/stylesheets/style.css" />
    <script
      type="text/javascript"
      src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
      id="jquery-js"
    ></script>
    <script src="javascripts/simple-pagenate.min.js"></script>
  </head>

  <body>
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
    <div class="pagenation-block">
      <dl>
        <dt>article001</dt>
      </dl>
      <dl>
        <dt>article002</dt>
      </dl>
      
      (省略)
      
      <dl>
        <dt>article059</dt>
      </dl>
      <dl>
        <dt>article060</dt>
      </dl>
    </div>
  </body>

  <script>
    $(function () {
      $(".pagenation-block").paginathing({ // ページネーションを配置したいブロックの要素を指定
        perPage: 10,
        limitPagination: 4,
        prevText: "prev",
        nextText: "next",
      });
    });
  </script>
</html>
```

## オプション
```js
perPage: 10,        // １ページに表示する要素数（デフォルト:10）
limitPagination: 4, // ページネーションの数字の最大数（デフォルト:なし）
prevText: "prev",   // 前へボタンのテキスト（デフォルト:'prev'）
nextText: "next",   // 次へボタンのテキスト（デフォルト:'next'）
```

## サンプル
CSSを適用したサンプルです。

ページネーション対象の要素数60、以下の設定での表示は以下のようになります。
```js
perPage: 10,        // １ページに表示する要素数（デフォルト:10）
limitPagination: 4, // ページネーションの数字の最大数（デフォルト:なし）
prevText: "prev",   // 前へボタンのテキスト（デフォルト:'prev'）
nextText: "next",   // 次へボタンのテキスト（デフォルト:'next'）
```

![image](https://user-images.githubusercontent.com/47539124/215296721-0ec727e1-d81a-48d5-84af-1ed1b30c2388.png)

間のページ（3ページ、4ページ）を表示しているときは、両脇に"…"が表示されます。

![image](https://user-images.githubusercontent.com/47539124/215279430-9767f65a-76fa-4ba0-9795-c2fd92291f40.png)


