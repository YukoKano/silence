class FlowField {
    
  constructor(resolution) {
      
    this.resolution = resolution;
    this.cols = int(width/this.resolution);
    this.rows = int(height/this.resolution); 
      
    this.field = new Array(this.rows);
    for(let row=0; row<this.rows; row++) { 
      this.field[row] = new Array(this.cols).fill(0);
    }
      
    this.time = 0;
  }
  
  init() {
    let xoff = 0;
    for(let col=0; col < this.cols; col++) {
      let yoff = 0;
        
      for(let row=0; row < this.rows; row++) {
        let theta = map(noise(xoff, yoff), 0, 1, 0, PI);
          
        this.field[row][col] = createVector(sin(theta), sin(theta));
        yoff += 0.1;
      }
        
      xoff += 0.1;
    }
  }
  
    
  lookup(lookup) {
    let col = int(constrain(lookup.x/this.resolution, 0, this.cols-1));
    let row = int(constrain(lookup.y/this.resolution, 0, this.rows-1));
    return this.field[row][col];
  }
  
  update() {
    let size = this.resolution * 0.75;
    let xoff = 0;
    for(let col=0; col < this.cols; col++) {
      let yoff = 0;
      for(let row=0; row < this.rows; row++) {
        // let val = this.field[row][col];
        // let theta = atan2(val.y, val.x);
        
        let theta = map(noise(xoff - this.time, yoff + this.time), 0, 1, 0, PI);
        this.field[row][col] = createVector(sin(theta), sin(theta));
        yoff += 0.1;
      }
      xoff += 0.1;
    }
  }
    
}