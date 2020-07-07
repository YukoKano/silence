let mic;
let alpha = 0;
let bg = 0;

let flow;
let elapsedTime;
let startTime;

function setup() {
  // キャンバスをつくる
  createCanvas(windowWidth, windowHeight);
    
    colorMode(HSB, 100);
//    frameRate(24);
    
    //メニューバー諸々の削除
  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
    
    //マイク設定
    mic = new p5.AudioIn();
    mic.start();
    
    //これだいじ ブラウザでマイク許可
    userStartAudio();  
    

    
    flow = new FlowField(40);
    flow.init();
    
    startTime = float(millis())/1000; //setupが呼ばれたときからのミリ秒
    elapsedTime = 0; //経過時間
    
}

// 計算と表示
function draw() {
    elapsedTime = float(millis()) / 1000 - startTime;
    
  // 背景をぬりつぶす
    background(bg);
    
    let h = map(hour(), 0, 24, 0, TWO_PI);
    
    flow.update();
    flow.time = elapsedTime;
    
    
    //数値
    //マイク音量取得
    let vol = mic.getLevel() * 100;
    
    
    //時間が経つとはっきりする、音量で削られる
    alpha += -vol + 0.1; 
    
    if(alpha < 0){
        alpha = 0;
    }else if(alpha > 255){
        alpha = 255;
    }

    for(var j=0; j<15; j++){
    
    
    let seed = (j + elapsedTime * 5) * 0.1;
    let pre_x = (0.04 + noise(seed), noise(seed) * 0.8) * 3*width/7 * sin(j * 10 + seed * 0.01) + width / 2;
    
    //0時と12時が青、6時と18時が赤 0-6,18-24はピンクに変化、6-12, 12-18は緑に変化
    let c = color(50 + 50 * sin(h), noise(seed + j + 1) * 50 + 50, noise(seed) * 50 + 50, alpha);
    
    strokeWeight(1 + noise(seed + j) * 1.5);
    stroke(c);
    
        for(var i=-50; i < height + 50; i+=2){
          let pre_y = i + 50 * noise(seed * 0.01);
            
          let pos = createVector(pre_x, pre_y);
          let vec = flow.lookup(pos);
            
          let y = pre_y + 2 + vec.y;
          let x = noise(seed + 0.03 * (i+1), noise(seed)*0.8) * width/3 * cos(i * 0.03 + seed * 0.5) + width / 2 + vec.x;
            
          line(pre_x, pre_y, x, y);
            
          pre_x = x;
          pre_y = y;
        }

    }
}

//参考資料
//http://wgg.hatenablog.jp/entry/20181225/1545703427
//https://himco.jp/2020/01/11/5：マイク入力-p5-sound-js-サウンド/