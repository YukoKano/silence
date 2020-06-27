let mic;
let alpha = 50;
let time = 0;

function setup() {
  // キャンバスをつくる
  createCanvas(windowWidth, windowHeight);
    
    //メニューバー諸々の削除
  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
    
//    noStroke();
    
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
    alpha += -vol + 0.1; 
    
    console.log(alpha);
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
    
//    ellipse(width / 2, height / 2, 50, 50);
    
    for(j = 0; j < 10; j++){
        var seed = (j - frameCount) * 0.05;
        var pre_y = noise(seed) * 500 - 500/2 + height/4 * sin(0) + height / 2;
        var c = color(noise(seed) * 255, noise(seed + 1) * 255, noise(seed + 2) * 255, alpha); 
        
        stroke(c);
        
        for(i = 0; i < width; i += 3){
            var y = noise(seed + 0.01 * (i + 1)) * 500 - 500/2 + height/4 * sin(TWO_PI/360*i * 0.8) + height / 2;
            
            line(i, pre_y, i + 3, y);
            pre_y = y;
        }
        
    }
    
}

//参考資料
//http://wgg.hatenablog.jp/entry/20181225/1545703427
//https://himco.jp/2020/01/11/5：マイク入力-p5-sound-js-サウンド/