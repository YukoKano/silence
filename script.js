let mic;

// 全体の初期化（最初に一回だけ呼ばれる）
function setup() {
  // キャンバスをつくる
  createCanvas(windowWidth, windowHeight);
    
  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
    
    noStroke();
    
    mic = new p5.AudioIn();
    mic.start();
    
    userStartAudio();
}

// 計算と表示
function draw() {
  // 背景をぬりつぶす
  background(0);
    
//  ellipse(100, 100, 100);
    
    let vol = mic.getLevel();
//    console.log(vol);
    fill(255);
    
  let h = map(vol, 0, 1, height, 0);
    
    ellipse(width / 2, h, 50, 50);
}

//http://wgg.hatenablog.jp/entry/20181225/1545703427