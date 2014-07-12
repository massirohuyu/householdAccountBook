<?php
  session_start();
  header("Content-type: text/html; charset=utf-8");

  // エラーメッセージ
  $errorMessage = "";
  // 画面に表示するため特殊文字をエスケープする
  $viewUserId = htmlspecialchars($_POST["useridrec"], ENT_QUOTES);

  // ログインボタンが押された場合
  if (isset($_POST["login"])) {
    //IDとパスワードの設定
    $userlist = json_decode(file_get_contents('./*******'), true);
    $pass = $userlist["pass"];

    if ( array_key_exists($_POST["useridrec"], $userlist["users"]) && $_POST["password"] == $pass) {
      // セッションID【USERIDREC】を新規に発行する
      session_regenerate_id(TRUE);
      $_SESSION["USERIDREC"] = $_POST["useridrec"];
      $_SESSION["NAME"] = $userlist["users"][$_POST["useridrec"]]["name"];

      $ua=$_SERVER['HTTP_USER_AGENT'];

      if((strpos($ua,'iPhone')!==false)||(strpos($ua,'iPod')!==false)||(strpos($ua,'Android')!==false)) {
        header("Location: sp/index.php");
      } else {
        header("Location: index.php");
      }
      exit;

    }else {
      $errorMessage = '<div id="error">ご入力頂いた ID あるいは PASSWORD に誤りがあります。<br />正しいIDとPASSWORDのご入力をお願い致します。</div>';
    }
  }
  echo $errorMessage;
?>