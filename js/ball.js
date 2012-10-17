// sadasant :.~
// Go to http://sadasant.com/license.txt to read the license.

var guy = {
  mouse: {x: 0, y: 0},
  e: 0, s: 0, busy: 0,
  summon: function(){
    s = R.ellipse( 50, 250, 10,  5).attr({fill:"#000", stroke:null, "fill-opacity":0.1})
    e = R.ellipse( 50,  50, 30, 30).attr({fill:"#000", stroke:null});
    this.gravity(e, s);
    this.e = e;
    this.s = s;
    this.track();
  }, 
  gravity: function(e, s){
    if(!e)e = this.e;
    if(!s)s = this.s;
    var t = 1000;
    e.animate({cy: 225}, t,  "bounce", function(){guy.busy = 0;});
    s.animate({rx: 25,  ry:10,  "fill-opacity":0.5}, t, "bounce");
  },
  track: function(){
    var dx = this.mouse.x-this.e.attr("cx"),
        dy = this.mouse.y-this.e.attr("cy");
         t = 1000;
    if(dx > 70 || dx <-70){
      this.e.animate({cx:this.e.attr("cx")+dx+dx*0.2}, t, "<>", function(){guy.track()});
      this.s.animate({cx:this.s.attr("cx")+dx+dx*0.2}, t, "<>");
    } else {
      setTimeout("guy.track()",1000);
    }
  },
  jump: function(){
    if(this.busy)return 0;
    this.busy = 1;
    var t = 300;
    this.e.animate({cy:this.e.attr("cy")-100}, t, ">", function(){guy.gravity();});
    this.s.animate({rx: 15,  ry:7,  "fill-opacity":0.3}, t);
  },
  move: function(){
  
  }
}

function INIT(){
  if(R)R.clear();
  R=Raphael(document.getElementById("_"), "100%", 270);
  guy.summon();
}

window.onload=function(){
  //loaded
  R = false;
  INIT();
  // aiming on mouse move
  document.onmousemove = function(e){
    X = (document.all && event.clientX)? event.clientX +
        (document.documentElement.scrollLeft || document.body.scrollLeft) :
        (e.pageX)? e.pageX : null;
    Y = (document.all && event.clientY)? event.clientY +
        (document.documentElement.scrollTop || document.body.scrollTop) :
        (e.pageY)? e.pageY : null;
    guy.mouse.x = X;
    guy.mouse.y = Y;    
  };


  /// on mouse click
  document.onclick = function(e){
    guy.jump();
  }


  /// on mouse click
  document.onkeypress = function(e){
  }


};
// The End.
