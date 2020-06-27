let mic;
let alpha = 100;

function setup() {
  // キャンバスをつくる
  createCanvas(windowWidth, windowHeight);
    
  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
    
    noStroke();
    
    mic = new p5.AudioIn();
    mic.start();
    
    userStartAudio();  //これだいじ
}

// 計算と表示
function draw() {
  // 背景をぬりつぶす
  background(0);

    let vol = mic.getLevel() * 20; //0 - 20
    alpha -= vol - 0.3;

    fill(255, alpha);
    ellipse(width / 2, height / 2, 50, 50);
    
}

//http://wgg.hatenablog.jp/entry/20181225/1545703427