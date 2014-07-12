<?php
session_start();

// ログイン状態のチェック
if (!isset($_SESSION["USERIDREC"])) {
  header("Location: login.html");
  exit;
}
?>

<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8">
    <title>Backbone Household Acount Book</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/app.css">
    <script src="js/lib/jquery-2.0.3.js"></script>
    <script src="js/lib/underscore.js"></script>
    <script src="js/lib/backbone.js"></script>
    <script src="js/lib/moment.js"></script>
    <script src="js/app.js"></script>
    <script src="js/model.js"></script>
    <script src="js/view.js"></script>
    <script src="js/helper.js"></script>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
  </head>
  <body>
<p id="login-info">こんにちは、<?= $_SESSION["NAME"] ?>さん <a href="logout.php">ログアウト</a></p>
<div class="calendarContainer">
  <div class="account-control">
  </div>
  <div class="calendar-control">
   <button class="calendar-incomeBtn">収入</button>
   <button class="calendar-expendBtn">支出</button>
    <button class="calendar-prevBtn">Prev</button>
    <button class="calendar-nextBtn">Next</button>
    <button class="calendar-todayBtn">Today</button>
    <button class="calendar-averageBtn">月平均</button>
    <input type="number" value="2014" class="calendar-average-first-year">
    <input type="number" value="1" class="calendar-average-first-month">
    -
    <input type="number" value="2014" class="calendar-average-finish-year">
    <input type="number" value="1" class="calendar-average-finish-month">
  </div>

  <table class="calendar" id="actionsList">
    <caption></caption>
    <thead>
      <tr>
        <th>日付</th>
        <th>費目</th>
        <th>内訳</th>
        <th>収支</th>
        <th>詳細</th>
        <th>取扱</th>
        <th>引落日</th>
        <th>店名</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>

  <table class="calendar" id="sectionsList">
    <caption>費目ごとの収支</caption>
    <thead>
      <tr>
        <th>費目</th>
        <th>収支</th>
        <th>予算</th>
        <th>予算との差</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>

  <div class="calendar-control">
    <button class="calendar-sectionBtn">費目編集</button>
    <button class="calendar-subsectionBtn">内訳編集</button>
    <button class="calendar-accountBtn">家計簿アカウント編集</button>
    <button class="calendar-wayBtn">取扱口座編集</button>
  </div>
</div>

<div class="dialog" id="input-dialog" hidden>
  <div class="dialog-body">
    <div class="dialog-close">close</div>
    <div class="dialog-content"></div>
      <h2 class="title">収支の入力</h2>
      <form>
        <h3>日付</h3>
        <p><input type="date" name="date"></p>

        <h3>費目</h3>
        <p><select name="section">
        </select></p>

        <h3>内訳</h3>
        <p><select name="subsection">
        </select></p>

        <h3>詳細</h3>
        <p><input type="text" name="detail"></p>

        <h3>金額</h3>
        <p><input type="number" name="amount"></p>

        <h3>お店</h3>
        <div class="shopContainer">
          <p><input type="text" name="shop" class="shopInput"></p>
          <div class="shopList" hidden></div>
        </div>

        <h3>家計簿</h3>
        <p><select name="account">
        </select></p>

        <h3>取扱</h3>
        <p><select name="way">
        </select></p>

        <h3>引き落とし日</h3>
        <p><input type="date" name="debitDay"></p>

        <input type="hidden" name="isIncome" value="0">
        <div class="dialog-controll">
          <input type="submit" value="Save">
          <button class="dialog-copyBtn">Copy</button>
          <button class="dialog-removeBtn">Remove</button>
        </div>
      </form>
    </div>
  </div>
</div>

<div class="dialog" id="section-dialog" hidden>
  <div class="dialog-body">
    <div class="dialog-close">close</div>
    <div class="dialog-content"></div>
      <h2 class="title">費目の編集</h2>
      <p><select name="section">
      </select></p>
      <form>
        <h3>名称</h3>
        <p><input type="text" name="name"></p>
        <h3>収入／支出</h3>
        <p><select name="isIncome">
          <option value="0">支出</option>
          <option value="1">収入</option>
        </select></p>
        <h3>属する内訳</h3>
        <p><select name="subsection" size="8" multiple>
        </select></p>
        <div class="dialog-controll">
          <input type="submit" value="Save">
          <button class="dialog-removeBtn">Remove</button>
          <button class="dialog-newBtn">New</button>
        </div>
      </form>
    </div>
  </div>
</div>

<div class="dialog" id="subsection-dialog" hidden>
  <div class="dialog-body">
    <div class="dialog-close">close</div>
    <div class="dialog-content"></div>
      <h2 class="title">内訳の編集</h2>
      <p><select name="section">
      </select></p>
      <p><select name="subsection">
      </select></p>
      <form>
        <h3>名称</h3>
        <p><input type="text" name="name"></p>
        <div class="dialog-controll">
          <input type="submit" value="Save">
          <button class="dialog-removeBtn">Remove</button>
          <button class="dialog-newBtn">New</button>
        </div>
      </form>
    </div>
  </div>
</div>

<div class="dialog" id="account-dialog" hidden>
  <div class="dialog-body">
    <div class="dialog-close">close</div>
    <div class="dialog-content"></div>
      <h2 class="title">家計簿アカウントの編集</h2>
      <p><select name="account">
      </select></p>
      <form>
        <h3>名称</h3>
        <p><input type="text" name="name"></p>
        <h3>予算</h3>
        <div class="budgetAmounts">
        </div>
        <div class="dialog-controll">
          <input type="submit" value="Save">
          <button class="dialog-removeBtn">Remove</button>
          <button class="dialog-newBtn">New</button>
        </div>
      </form>
    </div>
  </div>
</div>

<div class="dialog" id="way-dialog" hidden>
  <div class="dialog-body">
    <div class="dialog-close">close</div>
    <div class="dialog-content"></div>
      <h2 class="title">取扱口座・カードの編集</h2>
      <p><select name="way">
      </select></p>
      <form>
        <h3>名称</h3>
        <p><input type="text" name="name"></p>
        <h3>引き落とし日(翌月)</h3>
        <p><input type="number" name="debitDayNum">日</p>
        <div class="dialog-controll">
          <input type="submit" value="Save">
          <button class="dialog-removeBtn">Remove</button>
          <button class="dialog-newBtn">New</button>
        </div>
      </form>
    </div>
  </div>
</div>

<div id="calculator" hidden>
  <div class="nums">
    <button type="button" class="num" value="1">1</button>
    <button type="button" class="num" value="2">2</button>
    <button type="button" class="num" value="3">3</button>
    <button type="button" class="num" value="4">4</button>
    <button type="button" class="num" value="5">5</button>
    <button type="button" class="num" value="6">6</button>
    <button type="button" class="num" value="7">7</button>
    <button type="button" class="num" value="8">8</button>
    <button type="button" class="num" value="9">9</button>
    <button type="button" class="num" value="0">0</button>
    <button type="button" class="num" value="00">00</button>
  </div>
  <div class="ops">
    <button  type="button"class="op" value="add">+</button>
    <button type="button" class="op" value="subtract">-</button>
    <button type="button" class="op" value="multiple">×</button>
    <button type="button" class="op" value="divid">÷</button>
  </div>
    <button type="button" class="clear" value="clear">C</button>
    <button type="button" class="result" value="result">=</button>
</div>
  <!-- <form class="filterForm">
    <h3>フィルタ</h3>
    <input type="date" name="filterDate">
    <input type="submit">
  </form>

  <p class="count"></p>
  <ul class="list"></ul> -->
  </body>
</html>
