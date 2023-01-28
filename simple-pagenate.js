// Copyright (c) 2021, Nakagawa
// Released under the MIT license.

(function ($, window, document) {
  var Paginator = function (element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn.paginathing.defaults, options);

    // 最初のページ
    this.firstPage = 1;
    // 現在のページ
    this.currentPage = 1;
    this.totalItems = this.element.children().length;
    // 最後のページ
    this.finalPage = Math.max(
      Math.ceil(this.totalItems / this.options.perPage),
      this.options.limitPagination
    );
    this.container = $("<nav></nav>").addClass(this.options.containerClass);
    this.ul = $("<ul></ul>").addClass("pagination");

    this.show(this.firstPage);

    return this;
  };

  Paginator.prototype = {
    // paginationメソッドでページネーションのリストを作る
    // 前へ次へボタンもここで作る
    pagination: function (type, page) {
      var liTag = $("<li></li>");
      // CSSクラス名
      var cssClass = type === "number" ? "page" : type;
      // リストに表示するテキストとAタグの設定
      var text = "";
      var aTag;
      if (type === "number") {
        text = page;
        aTag = $("<a></a>").attr("href", "#");
      } else if (type === "dot") {
        text = "...";
      } else {
        // ここで前へ次へボタンのテキストを設定している
        text = this.paginationText(type);
        aTag = $("<a></a>").attr("href", "#");
      }
      liTag.addClass(cssClass);
      liTag.data("pagination-type", type);
      liTag.data("page", page);
      if (aTag === undefined) {
        liTag.html(text);
      } else {
        liTag.append(aTag.html(text));
      }

      return liTag;
    },

    paginationText: function (type) {
      return this.options[type + "Text"];
    },

    calcStartEndPage: function () {
      // 表示上最初のページ
      var startPage;
      // 表示上最後のページ
      var endPage;
      // 表示上の最大ページ数
      var limit = this.options.limitPagination;
      // 表示されていないページ数を…で表示するための変数
      var isPrevDot = false;
      var isNextDot = false;

      if (limit) {
        if (this.currentPage <= Math.floor(limit / 2) + 1) {
          // 現在のページが最大ページ数/2(切り下げ)+1以下のとき
          startPage = 1;
          endPage = limit;
          isNextDot = true;
        } else if (this.currentPage + Math.floor(limit / 2) >= this.finalPage) {
          // 現在のページ+最大ページ数/2(切り下げ)が最終ページ以上のとき
          startPage = this.finalPage + 1 - limit;
          endPage = this.finalPage;
          isPrevDot = true;
        } else {
          // 上記以外の真ん中にいる場合
          startPage = this.currentPage - Math.floor(limit / 2);
          endPage = this.currentPage + Math.floor(limit / 2);
          isPrevDot = true;
          isNextDot = true;
        }
      } else {
        startPage = this.firstPage;
        endPage = this.finalPage;
      }

      return [startPage, endPage, isPrevDot, isNextDot];
    },

    buildPagination: function () {
      var _self = this;
      var pagination = [];
      var prevPage =
        _self.currentPage - 1 < _self.firstPage
          ? _self.firstPage
          : _self.currentPage - 1;
      var nextPage =
        _self.currentPage + 1 > _self.finalPage
          ? _self.finalPage
          : _self.currentPage + 1;

      // 表示上の最初のページ、最後のページを算出する
      [startPage, endPage, isPrevDot, isNextDot] = this.calcStartEndPage();

      // 前へボタン
      pagination.push(_self.pagination("prev", prevPage));

      // ページの数分数字のリンクを作る
      // 表示が消えている部分は...を表示する
      if (isPrevDot) pagination.push(_self.pagination("dot", prevPage));
      for (var i = startPage; i <= endPage; i++) {
        pagination.push(_self.pagination("number", i));
      }
      if (isNextDot) pagination.push(_self.pagination("dot", nextPage));

      // 次へボタン
      pagination.push(_self.pagination("next", nextPage));

      return pagination;
    },

    render: function (page) {
      var _self = this;
      var options = _self.options;
      var pagination = _self.buildPagination();

      // render前に要素を取り除いてから追加する
      _self.ul.children().remove();
      _self.ul.append(pagination);

      var startAt = page === 1 ? 0 : (page - 1) * options.perPage;
      var endAt = page * options.perPage;

      _self.element.children().hide();
      _self.element.children().slice(startAt, endAt).show();

      _self.ul.children().each(function () {
        var _li = $(this);
        var type = _li.data("pagination-type");

        switch (type) {
          case "number":
            if (_li.data("page") === page) {
              _li.addClass("active");
            }
            break;
          case "prev":
            page - 1 < _self.firstPage && _li.toggleClass("disabled");
            break;
          case "next":
            page + 1 > _self.finalPage && _li.toggleClass("disabled");
            break;
          default:
            break;
        }
      });

      _self.element.after(_self.container.append(_self.ul));
    },

    handle: function () {
      var _self = this;
      _self.container.find("li").each(function () {
        var _li = $(this);

        _li.click(function (e) {
          e.preventDefault();
          var page = _li.data("page");

          _self.currentPage = page;
          _self.show(page);
        });
      });
    },

    show: function (page) {
      var _self = this;

      _self.render(page);
      _self.handle();
    },
  };

  $.fn.paginathing = function (options) {
    var _self = this;

    return _self.each(function () {
      return new Paginator(this, options);
    });
  };

  $.fn.paginathing.defaults = {
    perPage: 10, // 1ページに表示する要素の数
    limitPagination: false, // 1ページに表示する要素の数
    prevText: "&laquo;", // 前へボタンに表示するテキスト
    nextText: "&raquo;", // 次へボタンに表示するテキスト
    containerClass: "pagination-container", // ページネーションに表示するクラス
  };
})(jQuery, window, document);
