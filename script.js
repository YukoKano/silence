//マイク
let mic;

//描画用
let alpha = 0;
let txtAlpha = 0;

//flowField用
let flow;
let elapsedTime;
let startTime;

//画面切り替えのbool変数
let isStarted;
let isDescribed;
let isTapped;



function preload() {
    //メニューバー諸々の削除
    window.addEventListener("touchstart", function (event) { event.preventDefault(); }, { passive: false });
    window.addEventListener("touchmove", function (event) { event.preventDefault(); }, { passive: false });
}

function setup() {
  // キャンバスをつくる
    createCanvas(windowWidth, windowHeight);
    
    //色とテキストの設定
    colorMode(HSB, 100);    
    textAlign(CENTER, CENTER);
    textFont(loadFont("assets/EBGaramond-Regular.ttf"));
    
    isStarted = false;
    isDescribed = false;
    isTapped = true;

    //flowFieldの設定
    flow = new FlowField(40);
    flow.init();
    
    //時間設定
    startTime = float(millis())/1000; //setupが呼ばれたときからのミリ秒
    elapsedTime = 0; //経過時間
    
}

// 計算と表示
function draw() {
    //first
    if(isStarted == false){
       introduction();
        
        if(txtAlpha == 0){
            isStarted = true;
        }
    }
    
    //flowline start
    if(isStarted == true && mic.enabled == true){
       drawFlowLine();
        
       if(isDescribed == true){
          description();
       }
    }
}





function introduction(){
    if(isTapped == true && txtAlpha < 100){
        txtAlpha++;
    }else if(isDescribed == true && txtAlpha >= 100){
        txtAlpha = 100;
    }
    
    if(isTapped == false && txtAlpha > 0){
        txtAlpha--;
    }else if(isTapped == false && txtAlpha < 0){
        txtAlpha = 0;
    }
    
    background(0);
    noStroke();
    textSize(60);
    fill(0, 0, 100, txtAlpha);
    text('Silence', width/2, height/2 - 50);
    
    textSize(21);
    textLeading(24);
    text("Please touch\nand\nallow access to microphone.\n\nIf you don't do it, nothing happens.", width/2, height/2 + 100);
}

function description(){
    background(0, 0, 0, txtAlpha / 2);
    
    if(isTapped == true && txtAlpha < 100){
        txtAlpha += 5;
    }else if(isTapped == true && txtAlpha >= 100){
        txtAlpha = 100;
    }
    
    if(isTapped == false && txtAlpha > 0){
        txtAlpha -= 5;
    }else if(isTapped == false && txtAlpha <= 0){
        txtAlpha = 0;
        isDescribed = false;
    }
    
    noStroke();
    
    textSize(32);
    fill(0, 0, 100, txtAlpha);
    text('About', width/2, height/2 - 70);
    
    textSize(18);
    text("The concept of this work is 'silence'.\nIf you wait without making a sound, you'll see a wave.\nThe color changes according to the time of day.\n\n#p5.js", width/2, height/2 + 50);
    
    
    textSize(12);
    text('Created by Yuko Kano.', width/2, height - 50);
}

function drawFlowLine(){
    background(0);
    elapsedTime = float(millis()) / 1000 - startTime;
    
    let h = map(hour(), 0, 24, 0, TWO_PI);
    
    flow.update();
    flow.time = elapsedTime;
    
    //マイクのボリューム設定
    let vol = mic.getLevel() * 50;
    
    
    //時間が経つとはっきりする、音量で削られる
    alpha += -vol + 0.075; 
    
    if(alpha < 0){
        alpha = 0;
    }else if(alpha > 50){
        alpha = 50;
    }

    for(var j=0; j<15; j++){
    
    
        let seed = (j + elapsedTime * 5) * 0.1;
        let pre_x = (0.04 + noise(seed), noise(seed) * 0.8) * 3*width/7 * sin(j * 10 + seed * 0.01) + width / 2;

        //0時と12時が青、6時と18時が赤 0-6,18-24はピンクに変化、6-12, 12-18は緑に変化
        let c = color(50 + 50 * sin(h), noise(seed + j + 1) * 30 + 70, noise(seed) * 30 + 70, alpha);

        strokeWeight(1 + noise(seed + j) * 1.5);
        stroke(c);

            for(var i=-50; i < height + 50; i+=3){
              let pre_y = i + 50 * noise(seed * 0.01);

              let pos = createVector(pre_x, pre_y);
              let vec = flow.lookup(pos);

              let y = pre_y + 3 + vec.y;
              let x = noise(seed + 0.03 * (i+1), noise(seed)*0.8) * width/3 * cos(i * 0.03 + seed * 0.5) + width / 2 + vec.x;

              line(pre_x, pre_y, x, y);

              pre_x = x;
              pre_y = y;
            }

    }

}

function touchStarted() {   
    if(isStarted == true && isDescribed == false){
       isDescribed = true;
       isTapped = true;
    }else if(isStarted == true && isDescribed == true){
       isTapped = false;
    }
    
    if(isStarted == false){
        mic = new p5.AudioIn();
        mic.start();
        userStartAudio();
        
        isTapped = false;
    }
    
}