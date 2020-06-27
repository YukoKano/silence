let t = 150;

// 全体の初期化（最初に一回だけ呼ばれる）
function setup() {
  // キャンバスをつくる
  createCanvas(windowWidth, windowHeight);
    
  window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
  window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
}

// 計算と表示
function draw() {
  // 背景をぬりつぶす
  background(0);
  
  for(j = 0; j < 40; j++){
    var seed = (j - frameCount) * 0.02;
    var pre_y = noise(seed) * t - t/2 + height/4 * sin(0) + height / 2;
    var c = color(noise(seed) * 255,noise(seed + 1) * 255,noise(seed + 2) * 255); 
    stroke(c);
    for(i = 0;i < w;i+=3){
      var y = noise(seed + 0.01 * (i + 1)) * t - t/2 + h/4 * sin(TWO_PI/360*i * 0.8) + h / 2;
      line(i, pre_y, i + 3, y);
      pre_y = y;
    }
  }

}
