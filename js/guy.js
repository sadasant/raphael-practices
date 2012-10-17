// sadasant :.~
// Go to http://sadasant.com/license.txt to read the license.

var guy = {
    mouse: {x: 0, y: 0},
    s: {},   //thy body
    busy: 0, //if busy
    step: { x: 30, y: 3 }, //x step value
    steps: 4,
    time: 500,
    summon: function(){
        this.s.head = R.ellipse( 83, 58, 25, 25).attr({fill:"#fff", stroke:"#000"});
        this.s.body = R.path([["M",  78, 177], ["C",  75, 150,  60, 120,  70,  80]]);
        this.s.lleg = R.path([["M",  90, 280], ["C",  95, 240,  85, 200,  78, 177]]);
        this.s.rleg = R.path([["M",  50, 280], ["C",  65, 240,  79, 200,  78, 177]]);
        this.s.larm = R.path([["M",  95, 180], ["C",  85, 140,  80, 120,  68,  90]]);
        this.s.rarm = R.path([["M",  60, 180], ["C",  40, 140,  50, 120,  68,  90]]);
        this.s.lips = R.path([["M", 100,  67], ["C",  87,  69,  82,  68,  75,  70]]);
        this.s.leye = R.ellipse( 75, 57, 3, 3).attr({fill:"#000", stroke:null});
        this.s.reye = R.ellipse( 95, 55, 3, 3).attr({fill:"#000", stroke:null});
        this.s.reyb = R.path([["M",  76,  53], ["C",  74,  53,  74,  53,  70,  54]]);
        this.s.leyb = R.path([["M", 100,  53], ["C",  98,  52,  98,  52,  94,  51]]);
        this.track();
        }, 
    gravity: function(e, s){ },
    track: function(){
        if (this.busy || !this.mouse.x)
        return TIME("guy.track()",1000);
        var x = this.mouse.x-this.s.head.attr("cx"),
            y = this.mouse.y-this.s.head.attr("y"),
            t = 1000;
        console.debug(x);
        if (x > 70 || x <-70){ //Moving
            this.busy = 1;
            this.move("ALL", x);
            }
        TIME("guy.track()",1000);
        },
    move: function(who, x, y, flag, prev){
        var sx = 0, sy = 0, path = 0, plus = [];
        if (!flag) flag = 0;
                console.debug(flag);
        if (x){
            x = x - this.step.x;
            sx = this.step.x;
            }
        if (y){
            y = y - this.step.y;
            sy = this.step.y;
            }
        if (x < 0 || y < 0) return;
        //Checking parts
        if (who == "ALL"){
            var _e = 0; // previous e
            for (e in this.s){
                this.move(e, x, y, 0, _e);
                _e = e;
                }}
        else
        if (who == "head"){
            var path = [
                this.s[who].attr("cx"), this.s[who].attr("cy"),
                this.s[who].attr("rx"), this.s[who].attr("ry")
                ];
            if (flag == 0){ plus = [  0,  0,  0,  0] }
            if (flag == 1){ plus = [  0,  0,  0,  0] }
            if (flag == 2){ plus = [  0,  0,  0,  0] }
            }
        else
        if (who == "body"){
            var path = this.s[who].attr("path");
            if (flag == 0){ plus = [  0,  0,  0,  0,  0,  0,  0,  0] }
            if (flag == 1){ plus = [  0,  0,  0,  0,  0,  0,  0,  0] }
            if (flag == 2){ plus = [  0,  0,  0,  0,  0,  0,  0,  0] }
            }
        else
        if (who == "lleg"){
            var path = this.s[who].attr("path");
            if (flag == 0){ plus = [  0,  0,-30,  0,  0,  0,  0,  0] }
            if (flag == 1){ plus = [-23,  0,  0,  0,  0,  0,  0,  0] }
            if (flag == 2){ plus = [-23,  0,  0,  0,  0,  0,  0,  0] }
            }
        else
        if (who == "rleg"){
            var path = this.s[who].attr("path");
            if (flag == 0){ plus = [  0,-30,-30,  0, 30,  0,  0,  0] }
            if (flag == 1){ plus = [ 23,  0, 30,  0, 30, 30,  0,  0] }
            if (flag == 2){ plus = [ 23, 30, 30,  0,-50,  0,  0,  0] }
            }
        else
        if (who == "larm"){
            var path = this.s[who].attr("path");
            if (flag == 0){ plus = [  0,  0, -5,  0, -5,  0,  0,  0] }
            if (flag == 1){ plus = [  0,  0,-10,  0,-10,  0,  0,  0] }
            if (flag == 2){ plus = [-20,  0,-20,  0,  0,  0,  0,  0] }
            }
        else
        if (who == "rarm"){
            var path = this.s[who].attr("path");
            if (flag == 0){ plus = [  0,  0,  5,  0,  5,  0,  0,  0] }
            if (flag == 1){ plus = [  0,  0, 10,  0, 10,  0,  0,  0] }
            if (flag == 2){ plus = [ 20,  0, 20,  0,  0,  0,  0,  0] }
            }
        else
        if (who == "lips"){
            var path = this.s[who].attr("path");
            if (flag == 0){ plus = [  1,  0,  5,  0,  5,  0,  5,  0] }
            if (flag == 1){ plus = [  1,  0, 10,  0, 10,  0,  7,  0] }
            if (flag == 2){ plus = [  0,  0,  0,  0,  0,  0,  0,  0] }
            }
        else
        if (who == "leye"){
            var path = [
                this.s[who].attr("cx"), this.s[who].attr("cy"),
                this.s[who].attr("rx"), this.s[who].attr("ry")
                ];
            if (flag == 0){ plus = [  8,  0,  0,  0] }
            if (flag == 1){ plus = [  8,  0,  0, -5] }
            if (flag == 2){ plus = [  0,  0,  0,  5] }
            }
        else
        if (who == "reye"){
            var path = [
                this.s[who].attr("cx"), this.s[who].attr("cy"),
                this.s[who].attr("rx"), this.s[who].attr("ry")
                ];
            if (flag == 0){ plus = [  5,  0, -1,  0] }
            if (flag == 1){ plus = [  5,  0, -1, -5] }
            if (flag == 2){ plus = [  0,  0,  0,  5] }
            }
        else
        if (who == "reyb"){
            var path = this.s[who].attr("path");
            if (flag == 0){ plus = [  8,  0,  8,  0,  8,  0,  8,  0] }
            if (flag == 1){ plus = [  8,  0,  8,  0,  8,  0,  8,  0] }
            if (flag == 2){ plus = [  0,  0,  0,  0,  0,  0,  0,  0] }
            }
        else
        if (who == "leyb"){
            var path = this.s[who].attr("path");
            if (flag == 0){ plus = [  3,  0,  5,  0,  5,  0,  5,  0] }
            if (flag == 1){ plus = [  3,  0,  5,  0,  5,  0,  5,  0] }
            if (flag == 2){ plus = [  0,  0,  0,  0,  0,  0,  0,  0] }
            }
        if (plus.length == 8){
            path = [ [
                "M",
                path[0][1]+sx+plus[0],
                path[0][2]+sy+plus[1]
                ],[
                "C",
                path[1][1]+sx+plus[2],
                path[1][2]+sy+plus[3],
                path[1][3]+sx+plus[4],
                path[1][4]+sy+plus[5],
                path[1][5]+sx+plus[6],
                path[1][6]+sy+plus[7]
                ]];
            this.s[who].animateWith(
                (prev)?this.s[prev]:0,
                { path:path },
                this.time,
                function(){
                    if (flag < guy.steps) guy.move(who, x, y, flag+1)
                    })}
        else
        if (plus.length == 4){
            this.s[who].animateWith(
                (prev)?this.s[prev]:0,
                { cx: path[0]+sx+plus[0], cy: path[1]+sy+plus[1],
                  rx: path[2]+plus[2], ry: path[3]+plus[3], },
                this.time,
                function(){
                    if (flag < guy.steps) guy.move(who, x, y, flag+1)
                    })}},}

function INIT(){
    if (R) R.clear();
    R = Raphael(document.getElementById("_"), "100%", 270);
    guy.summon();
    }

window.onload = function(){
    //loaded
    TIME = setTimeout;
    R = false;
    INIT();
    // aiming on mouse move
    document.onmousemove = function(e){
        guy.mouse.x = e.pageX;
        guy.mouse.y = e.pageY;    
        };

    /// on mouse click
    document.onclick = function(e){
        // guy.jump(); 
        }

    /// on mouse click
    document.onkeypress = function(e){
        }};



// The End.
