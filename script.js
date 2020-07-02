let mic;
let alpha = 0;
let time = 0;
let bg = 0;

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
  background(bg);
    
    
    //数値
    //マイク音量取得
    let vol = mic.getLevel() * 100;
    
    //時間計測
    time += 1;
    
    //音鳴らすとtimeをゼロにする
    if(vol > 5){
        time = 0;
    }
    
    //時間が経つとはっきりする、音量で削られる
    alpha += -vol + 0.1; 
    
    if(alpha < 0){
        alpha = 0;
    }else if(alpha > 255){
        alpha = 255;
    }

    
    if(alpha > 250 && time > 100){
        bg += 0.1;
    }else{
        if(bg < 0){
            bg = 0;
        }
        bg -= 0.1;
    }
    
    
    //描画
    //参考https://processing-fan.firebaseapp.com/galary/flow/index.html
    
    for(var j=0;j<8;j++){
    
    let seed = (j + time) * 0.1;
    let randVal = random() * width/2;
    let pre_x = noise(seed) *  randVal * sin(j * 0.2) + width / 2;
    let c = color(noise(seed + j) * 50 + 100, noise(seed + j + 1) * 200 + 55, noise(seed) * 100 + 155, alpha);
    
    strokeWeight(1 + noise(seed + j) * 2);
    stroke(c);
    
        for(var i=0;i<height;i+=3){


          let x = noise(seed + 0.03 * (i+1)) * randVal * sin(i * 0.03) + width / 2 + j * 5;
          line(pre_x, i, x, i + 3);
          pre_x = x;

        }

    }
    
}

//参考資料
//http://wgg.hatenablog.jp/entry/20181225/1545703427
//https://himco.jp/2020/01/11/5：マイク入力-p5-sound-js-サウンド/