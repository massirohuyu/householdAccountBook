<?php
session_start();

// ログイン状態のチェック
if (!isset($_SESSION["USERIDREC"])) {
  header("Location: ../login.html");
  exit;
}
?>

<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <title>Backbone Household Acount Book</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/html5reset-1.6.1.css">
    <link rel="stylesheet" href="../css/sp_app.css">
    <script src="../js/lib/jquery-2.0.3.js"></script>
    <script src="../js/lib/underscore.js"></script>
    <script src="../js/lib/backbone.js"></script>
    <script src="../js/lib/moment.js"></script>
    <script src="../js/sp_app.js"></script>
    <script src="../js/sp_model.js"></script>
    <script src="../js/sp_view.js"></script>
    <script src="../js/helper.js"></script>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
  </head>
  <body>
    <div id="page-input-record" class="active page-containner">
      <header class="header">
        <h1 class="title">支出入力</h1>
        <button class="btn-left">戻る</button>
        <button class="btn-right">履歴</button>
      </header>
      <div class="body">
        <form id="input-record">

          <div class="box-input">
            <label for="date">日付</label>
            <input type="date" id="date" name="date">
          </div>
          <div class="box-input">
            <label for="section">費目</label>
              <select id="section" name="section">
              </select>
          </div>
          <div class="box-input">
            <label for="subsection">内訳</label>
            <select id="subsection" name="subsection"></select>
          </div>
          <div class="box-input">
            <label for="amount">費用</label>
            <input type="number" id="amount" name="amount">
          </div>
          <div class="box-input">
            <label for="detail">詳細</label>
            <input type="text" id="detail" name="detail">
          </div>



          <div class="box-input hidden">
            <label for="shop">お店</label>
            <p><input type="text" id="shop" name="shop"><p>
          </div>
          <div class="box-input">
            <label for="account">家計簿</label>
            <select id="account" name="account"></select>
          </div>
          <div class="box-input hidden">
            <label for="way">取扱</label>
            <select id="way" name="way"></select>
          </div>
          <div class="box-input hidden">
            <label for="debitDay">引き落とし日</label>
            <input type="date" id="debitDay" name="debitDay">
          </div>
          <div class="box-submit">
            <input type="hidden" name="isIncome" value="0">
            <button type="submit" class="btn-submit">入力する</button>
          </div>
        </form>
      </div>
    </div>
    <header>
  </body>
</html>
