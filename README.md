# simple-pagenate

## 概要
ページネーションを簡単に行えるようにするjQueryプラグインです。

## 必要なもの
jQueryを使用します

## 使い方

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
        perPage: 10,        // １ページに表示する要素数
        limitPagination: 4, // ページネーションの数字の最大数
        prevText: "prev",   // 前へボタンのテキスト
        nextText: "next",   // 次へボタンのテキスト
      });
    });
  </script>
</html>
```
