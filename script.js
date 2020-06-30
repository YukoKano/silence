let mic;
let alpha = 50;
let time = 0;

function setup() {
  // キャンバスをつくる
  createCanvas(windowWidth, windowHeight);
    
    //メニューバー諸々の削除
  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
    
    //マイク設定
    mic = new p5.AudioIn();
    mic.start();
    
    //これだいじ ブラウザでマイク許可
    userStartAudio();  
}

// 計算と表示
function draw() {
  // 背景をぬりつぶす
  background(0);
    
    
    //数値
    //マイク音量取得
    let vol = mic.getLevel() * 100;
    
    //時間計測
    time += 1;
    
    //音鳴らすとtimeをゼロにする
    if(vol > 10){
        time = 0;
    }
    
    //時間が経つとはっきりする、音量で削られる
    alpha += -vol + 0.3; 
    
    if(alpha < 0){
        alpha = 0;
    }

    
    //はっきり＆一定時間静か　で音をならしたい……
//    if(alpha > 200 && time > 1000){
//        fill(255, 0, 0, alpha);
//    }else{
//        fill(255, alpha);
//    }
    
    
    //描画
    //https://processing-fan.firebaseapp.com/galary/flow/index.html
    
    for(var j=0;j<10;j++){
    let seed = (j + frameCount) * 0.1;
    let pre_x = noise(seed) *  width / 4 * sin(j * 0.05) + width / 2;
    let c = color(noise(seed + j) * 50, noise(seed + j + 1) * 200, noise(seed) * 55 + 155);
    
    strokeWeight(1 + noise(seed + j) * 3);
    stroke(c);
    
    for(var i=0;i<height;i+=2){

      let x = noise(seed + 0.03 * (i+1)) *  width / 4 * sin(i * 0.03) + width / 2 + j * 5;
      line(pre_x, i, x, i + 2);
      pre_x = x;
    }
    
  }
    
}

//参考資料
//http://wgg.hatenablog.jp/entry/20181225/1545703427
//https://himco.jp/2020/01/11/5：マイク入力-p5-sound-js-サウンド/