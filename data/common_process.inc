<?php 
  
  $respDataTxt = file_get_contents($filename);
  
  if($respDataTxt == '') {
    $respDataTxt = '{"data":[], "nextNum": 0}';
  }
  $respData = json_decode($respDataTxt, true);
  
  if( !array_key_exists('nextNum', $respData) ) {
    $maxNum = -1;
    foreach ($respData['data'] as $data) {
      if( is_int(strpos($data['id'], $initial)) ) {
        $num = intval( str_replace($initial, '', $data['id']) );
        $maxNum = $maxNum > $num? $maxNum: $num;
      }
    }
    $respData['nextNum'] = $maxNum + 1;
  }
  
  $request_method = strtolower($_SERVER['REQUEST_METHOD']);
  
  switch ($request_method) {
      case 'get':
        echo $respDataTxt;
        break;
        
      case 'post':
      case 'put':
        $reqData = json_decode(file_get_contents('php://input'), true);
        
        if( !array_key_exists('id', $reqData) ) {
          $num = $respData['nextNum'];
          $reqData['id']= $initial.strval($num);
          $respData['nextNum'] = $num + 1;
          $respData['data'][] = $reqData;
          
        }else{
          $no_data = true;
          foreach ($respData['data'] as $key => $data) {
            if( $reqData['id'] == $data['id'] ) {
              $respData['data'][$key] = $reqData;
              $no_data = false;
              break;
            }
          }
          if($no_data){
            $respData['data'][] = $reqData;
          }
        }
        
        $respDataTxt = json_encode($respData);
        $reqDataTxt = json_encode($reqData);
        
        if(!file_put_contents($filename, $respDataTxt)) {
          echo '失敗した';
        }else{
          echo $reqDataTxt;
        }
        break;
        
      case 'delete':
        $id = str_replace('/', '', $_SERVER['PATH_INFO']);
        foreach ($respData['data'] as $key => $data) {
          if( $data['id'] == $id ) {
            array_splice($respData['data'], $key, 1);
          }
        }
        $respDataTxt = json_encode($respData);
        
        if(!file_put_contents($filename, $respDataTxt)) {
          echo '失敗した';
        }else{
          echo $id;
        }
        break;
  }
//  echo $request_method;