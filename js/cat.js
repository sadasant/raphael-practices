// sadasant :.~
// Go to http://sadasant.com/license.txt to read the license.

var Sva = {
    mouse: {x: 0, y: 0},
    b: {},
    s: {},
    busy: 0,
    cond: { x:0, y:0, t:0 },
    rest: 0,
    init: function(body){
        this.b = {};
        this.s[0] = body;
        var c = 0, _i = "";
        for(i in body){
            if (c) this.s[0][i].swch = _i;
            this.b[i] =
                (body[i].length)
                ? R.path(body[i])
                : (body[i].path)
                ? R.path(body[i].path).attr(body[i].attr)
                : R.ellipse().attr(body[i]);
            _i = i;
            c += 1;
            }
        return Sva;
        }, 
    set: function(name, body){
        var type = null;
        if (typeof(body) == 'number') var body = this.s[body];
        else
        for (i in body) for (ii in body[i]){
            type = typeof(body[i][ii]);
            //console.debug(type, body[i][ii]);
            if (type == "object"){
                for (iii in body[i][ii])
                    if (!isNaN(body[i][ii][iii])) body[i][ii][iii] += this.s[0][i][ii][iii];
                    }
            else
            if (type == "number") body[i][ii] += this.s[0][i][ii];
            }
//        if (this.s[flip].attr) flop.attr = this.s[flip].attr;
        this.s[name] = body;
        //console.debug(this.s)
        },
    flip: function(name, flip, pos, mid, plus){
        var flop = {},
            flag = 0,
            X = 0, Y = 0;
        if (!plus) plus = {x: 0, y: 0};
        if (!X || !Y)
        for (i in this.s[flip]){
            if (mid && i != mid) continue;
            _X = (!isNaN(this.s[flip][i][1]))? this.s[flip][i][1]
                :(this.s[flip][i].path)? this.s[flip][i].path[1]
                :(!isNaN(this.s[flip][i].cx))? this.s[flip][i].cx
                : X;
            if (!X || _X < X) X = _X; 
            _Y = (!isNaN(this.s[flip][i][2]))? this.s[flip][i][2]
                :(this.s[flip][i].path)? this.s[flip][i].path[2]
                :(!isNaN(this.s[flip][i].cy))? this.s[flip][i].cy
                : Y;
            if (!Y || _Y < Y) Y = _Y; 
            }
        X = X*2;
        Y = Y*2;
        for (i in this.s[flip]){
            flag = 0;
            flop[i] = (this.s[flip][i].length)?[]:{};
            flop[i] = Sva.loop({
                r:flop[i],
                o:this.s[flip][i],
                f:function(obj, o, f){
                    var tmp = null;
                    if (obj == null) return obj;
                    if (typeof(obj) == 'object' && obj)
                        return Sva.loop({r:(obj.length)?[]:{}, o:obj, f:f});
                    else
                    if (typeof(obj) == 'number' && o.slice(0,1) != "r"){
                        flag = (!flag)? 1 : 0;
//                        if (!X) X = 2*obj;
//                        if (X && !Y) Y = 2*obj;
                        if (pos == "x" &&  flag) tmp = -obj+X+plus.x;
                        else
                        if (pos == "y" && !flag) tmp = -obj+plus.y;
                        else return obj;
                        }
                    else return obj;
                    return tmp;
                    }});}
        //console.debug(flop);
//        if (this.s[flip].attr) flop.attr = this.s[flip].attr;
        this.s[name] = flop;
        },
    swch: function(name, swch){  // this can be better
        if (!isNaN(name)) name = [name];
        for (i in name){
            var to_s = [];
            for (ii in swch){
                if (!isNaN(swch[ii][1][0]) || !isNaN(swch[ii][1][0][0])){
                    var swch_ii = (!isNaN(swch[ii][1][0]))? [swch[ii][1]] : swch[ii][1];
                    var path = (this.s[name[i]][swch[ii][0]].path)? this.s[name[i]][swch[ii][0]].path : this.s[name[i]][swch[ii][0]];
                    for (iii in swch_ii){
                        var swch_iii = swch_ii[iii],
                            swch_iii1 = (!isNaN(swch_iii[1]))? [swch_iii[1]] : swch_iii[1],
                            tmp0 = path[swch_iii[0]],
                            tmp1 = path[swch_iii1[0]];
                        //console.debug(swch[ii][0], path);
                        path[swch_iii[0]] = tmp1;
                        for (iiii in swch_iii1) path[swch_iii1[iiii]] = tmp0;
                        }
                    if (this.s[name[i]].path) this.s[name[i]].path[swch[ii][0]] = path;
                    else this.s[name[i]][swch[ii][0]] = path;
                    continue;
                    }
                else{
                    //console.debug(name[i],swch[ii]);
                    if (!swch[ii].length) to_s = [swch[ii], swch[ii+1]];
                    else to_s = swch[ii];
                    var path = (this.s[name[i]].path)? this.s[name[i]].path : this.s[name[i]];
                    var tmp0 = path[to_s[0]];
                    var tmp1 = path[to_s[1]];
                    if (this.s[name[i]].path){
                        this.s[name[i]].path[to_s[0]] = tmp1;
                        this.s[name[i]].path[to_s[1]] = tmp0;
                        }
                    else{
                        this.s[name[i]][to_s[0]] = tmp1;
                        this.s[name[i]][to_s[1]] = tmp0;
                        }
                    if (typeof(to_s[1]) == 'string')
                        this.s[name[i]][to_s[0]].swch = to_s[1];
                    if (!swch[ii].length) break;
                    }}}},
    go: function(names, cond, r, stop){
        //console.debug(names,cond,r);
        if (this.rest && !stop) return;
        if (!r && this.busy && !stop)
            return setTimeout("Sva.go(["+names+"], { x:"+cond.x+", y:"+cond.y+", t:"+cond.t+" })", (this.cond.t)?this.cond.t:500 );
        if (!r){
            r = 1;
            if (cond.t) this.cond.t = cond.t;
        i   }
        if (!this.busy) this.busy = 1;
        this.cond.x += parseInt(cond.x);
        this.cond.y += cond.y;
        this.pos = names[0];
        var prev = 0,
            last = 0,
            _name = (names.length)? this.s[names[0]] : this.s[0],
            x = this.cond.x,
            y = this.cond.y,
            name = {};
        for (i in _name){
            last = i;
            var flag = 0;
            name[i] = (_name[i].length)? [] : {};
            name[i] = Sva.loop({
                r:name[i],
                o:_name[i],
                f:function(obj, o, f){
                    //console.debug(obj,o);
                    var type = typeof(obj);
                    if (type == 'object' && obj)
                        return Sva.loop({r:(obj.length)?[]:{}, o:obj, f:f});
                    else
                    if (type == 'string' || o == 'rx' || o == 'ry')
                        return obj;
                    else{
                        flag = (!flag)? 1 : 0;
                        return obj + ((x &&  flag)? x : ((y && !flag)? y : 0));
                        }}});}
        // executing
        //console.debug(name);
        for (i in name){
            //console.debug(i, name[i], name[i].length);
            var obj = (name[i].length)? {path: name[i]} : (name[i].path)? {path: name[i].path} : name[i];
            if (name[i].attr)
                for (ii in name[i].attr){
                    obj[ii] = name[i].attr[ii];
                    }
            if (name[i].swch){
                //console.debug(names[0]);
                this.b[i].insertAfter(this.b[name[i].swch]);
                }
            this.b[i].animateWith(
                (prev)?prev:0,
                obj, this.cond.t,
                (i == last)? function(){
                    //console.debug(names.slice(1));
                    if (stop) this.rest = 0;
                    if (names.length > 1) Sva.go(names.slice(1), cond, r+1);
                    else {
                        Sva.busy = 0;
                        //console.debug("lol");
                        }
                    } : 0 );
            prev = i;
            }},
    loop: function (p){
            for (o in p.o){
                if (p.o.length) p.r.push(p.f(p.o[o], o, p.f));
                else 
                p.r[o] = p.f(p.o[o], o, p.f);
                }
            return p.r;
            },
    stop: function(z){
        if (this.cute) return 0;
        if (!z) z = 0;
        for(i in this.b){
            this.b[i].stop();
            }
        this.rest = 1;
        setTimeout("Sva.rest = 0", this.cond.t);
        return this.go([z], {x: 0, y: 0, t:this.cond.t}, 0, 1)
        }};

function INIT(){
    if (R) R.clear();
    R = Raphael(document.getElementById("_"), "100%", 270);
    }

function WALK(r){
    BUSY = 1;
    //setTimeout("Sva.stop()", 1500);
    //console.debug(Sva.mouse)
    var dx = Sva.mouse.x-Sva.b.leye.attr("cx"),
    //    dy = Sva.mouse.y-Sva.b.head.attr("cy"),
         x = 20, t = 400;
    //alert(Sva.pos);
    if (dx > x){
        POS = 1;
        if (Sva.pos == 0 || Sva.pos == 8){
            Sva.go([0], {x: 0, y: 0, t:t});
            Sva.go([1,2,3,4], {x:  0, y:  0, t:t});
            Sva.go([5], {x:  x, y:  0, t:t});
            }
        else if (Sva.pos > 4 && Sva.pos < 8){Sva.go([6,7], {x:  x, y: 0, t:t});}
        }
    else if (dx <-x){
        POS = 0
        if (Sva.pos == 8 || Sva.pos == 0){
            Sva.go([8], {x: 0, y: 0, t:t});
            Sva.go([9,10,11,12], {x:  0, y:  0, t:t});
            Sva.go([13], {x: -x, y:  0, t:t});
            }
        else if (Sva.pos > 12  && Sva.pos < 16){Sva.go([14,15], {x: -x, y: 0, t:t});}
        }
    else 
    if (dx != Sva.mouse.dx) Sva.stop((POS)?0:8);
    Sva.mouse.dx = dx;
    if (!r) return setTimeout("WALK("+r+")", t);
    }

window.onload = function(){
    //loaded
    TIME = setTimeout;
    POS = 1;
    R = false;
    INIT();

    Sva.init({
        tail:{path:["M", 110,266, "C",  93, 256,  63, 256,  60, 263, "C",  63, 266,  63, 266, 116, 265], attr:{fill:"#dddddd"}},
        body:{path:["M", 122,240, "C", 124, 205,  76, 205,  80, 240, "C",  66, 275, 138, 275, 122, 240], attr:{fill:"#dddddd"}},
        head:{path:["M", 122,210, "C", 128, 181,  72, 181,  78, 210, "C",  81, 235, 121, 232, 122, 210], attr:{fill:"#dddddd"}},
        lear:{path:["M", 122,201, "C", 121, 179, 126, 179, 108, 191], attr:{fill:"#dddddd"}},
        rear:{path:["M",  92,191, "C",  75, 179,  80, 179,  78, 201], attr:{fill:"#dddddd"}},
        leye:{cx:108, cy:205, rx:  2, ry:  3, fill:"#000000", stroke:"#000000"},
        reye:{cx: 92, cy:205, rx:  2, ry:  3, fill:"#000000", stroke:"#000000"},
        nose:{path:["M",  103, 212, "C", 100, 215, 100, 215,  97, 212], attr:{fill:"#000000"}},
        ujaw:["M", 100, 215, "C",  95, 220, 95, 220,  90, 216, "M", 111, 216, "C", 106, 220, 106, 220, 100, 215],
        djaw:["M", 104, 221, "C", 100, 224,100, 224,  96, 221],
        lblg:{path:["M",  95, 266, "C",  95, 266,  95, 266,  95, 266, "L", 122, 266, "C", 126, 255, 126, 245, 123, 247], attr:{fill:"#cccccc"}},
        lbft:{path:["M", 123, 266, "C", 124, 260, 118, 260, 107, 266, "Z"], attr:{fill:"#dddddd"}},
        rblg:{path:["M", 107, 266, "C", 107, 266, 107, 266, 107, 266, "L",  80, 266, "C",  76, 255,  76, 245,  79, 247], attr:{fill:"#cccccc"}},
        rbft:{path:["M",  79, 266, "C",  79, 260,  85, 260,  95, 266, "Z"], attr:{fill:"#dddddd"}},
        lflg:{path:["M", 107, 241, "C", 107, 245, 107, 254, 107, 266, "L", 115, 266, "C", 115, 255, 119, 245, 119, 245], attr:{fill:"#dddddd"}},
        lfft:{path:["M", 117, 266, "C", 116, 260, 109, 260, 107, 266, "Z"], attr:{fill:"#dddddd"}},
        rflg:{path:["M",  95, 241, "C",  95, 245,  95, 254,  95, 266, "L",  87, 266, "C",  87, 255,  83, 245,  83, 245], attr:{fill:"#dddddd"}},
        rfft:{path:["M",  85, 266, "C",  87, 260,  94, 260,  95, 266, "Z"], attr:{fill:"#dddddd"}},
        });
    Sva.set(1,{
        tail:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#dddddd"}},
        body:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#dddddd"}},
        head:{path:["M",   0,   0, "C",   3,   0,   3,   0,   3,   0, "C",   3,   0,   3,   0,   0,   0], attr:{fill:"#dddddd"}},
        lear:{path:["M",   0,   0, "C",   0,   2,   0,   2,   8,   0], attr:{fill:"#dddddd"}},
        rear:{path:["M",  11,   0, "C",  11,   0,  11,   0,   8,   0], attr:{fill:"#dddddd"}},
        leye:{cx:  8, cy:  0, rx:  0, ry:  0},
        reye:{cx: 13, cy:  0, rx:  0, ry:  0},
        nose:{path:["M",  11,   0, "C",  11,   0,  11,   0,  12,   0], attr:{fill: "#000000"}},
        ujaw:["M",   11,   0, "C",   8,   0,   8,   0,   8,   0, "M",   8,   0, "C",   8,   0,   8,   0,  11,   0],
        djaw:["M",    9,   0, "C",   8,   0,   8,   0,   8,   0],
        lblg:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "L",   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#cccccc"}},
        lbft:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "Z"], attr:{fill:"#dddddd"}},
        rblg:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "L",   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#cccccc"}},
        rbft:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "Z"], attr:{fill:"#dddddd"}},
        lflg:{path:["M",   0,   5, "C",   0,   0,   0,   0,  15, -10, "L",  15, -10, "C",   3, -10,   3,   5,   2,  -5], attr:{fill:"#dddddd"}},
        lfft:{path:["M",  13, -10, "C",  13, -10,  13, -10,  13, -10, "Z"], attr:{fill:"#dddddd"}},
        rflg:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "L",   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#dddddd"}},
        rfft:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "Z"], attr:{fill:"#dddddd"}},
        });
    Sva.set(2,{
        tail:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#dddddd"}},
        body:{path:["M",   1,   0, "C",   0,   0,   2,   0,   0,   0, "C",   0, -10, -12,   0,   1,   0], attr:{fill:"#dddddd"}},
        head:{path:["M",   2,   0, "C",   5,   0,   5,   0,   5,   0, "C",   5,   0,   5,   0,   2,   0], attr:{fill:"#dddddd"}},
        lear:{path:["M",   2,   0, "C",   0,   4,   0,   2,   8,   0], attr:{fill:"#dddddd"}},
        rear:{path:["M",  13,   0, "C",  13,   0,  13,   0,  10,   0], attr:{fill:"#dddddd"}},
        leye:{cx: 10, cy:  0, rx:  0, ry:  0},
        reye:{cx: 15, cy:  0, rx:  0, ry:  0},
        nose:{path:["M",  13,   0, "C",  13,   0,  13,   0,  14,   0], attr:{fill: "#000000"}},
        ujaw:["M",   13,   0, "C",  10,   0,  10,   0,  10,   0, "M",  10,   0, "C",  10,   0,  10,   0,  13,   0],
        djaw:["M",   11,   0, "C",  10,   0,  10,   0,  10,   0],
        lblg:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "L",   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#cccccc"}},
        lbft:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "Z"], attr:{fill:"#dddddd"}},
        rblg:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "L",   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#cccccc"}},
        rbft:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "Z"], attr:{fill:"#dddddd"}},
        lflg:{path:["M",   2,   8, "C",   0,   0,   0,   0,  17,   0, "L",  17,   0, "C",   5,   0,   5,   5,   4,  -5], attr:{fill:"#dddddd"}},
        lfft:{path:["M",  15,   0, "C",  15,   0,  15,   0,  15,   0, "Z"], attr:{fill:"#dddddd"}},
        rflg:{path:["M",   2,   0, "C",   0,   0,   0,   0,   0,   0, "L",   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#dddddd"}},
        rfft:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "Z"], attr:{fill:"#dddddd"}},
        });
    Sva.set(3,{
        tail:{path:["M",   0,   0, "C",   0,  13,  -5, -16,   0, -13, "C",   0,  -5,   0,   0,   0,   0], attr:{fill:"#dddddd"}},
        body:{path:["M",   6,   0, "C",   5,   0,   7,   0,   0,   0, "C",   0, -10, -12,   0,   6,   0], attr:{fill:"#dddddd"}},
        head:{path:["M",   7,   0, "C",  10,   0,  10,   0,  10,   0, "C",  10,   0,  10,   0,   7,   0], attr:{fill:"#dddddd"}},
        lear:{path:["M",   7,   0, "C",   5,   4,   5,   2,  13,   0], attr:{fill:"#dddddd"}},
        rear:{path:["M",  18,   0, "C",  18,   0,  18,   0,  15,   0], attr:{fill:"#dddddd"}},
        leye:{cx: 15, cy:  0, rx:  0, ry:  0},
        reye:{cx: 20, cy:  0, rx:  0, ry:  0},
        nose:{path:["M",  18,   0, "C",  18,   0,  18,   0,  19,   0], attr:{fill: "#000000"}},
        ujaw:["M",   18,   0, "C",  15,   0,  15,   0,  15,   0, "M",  15,   0, "C",  15,   0,  15,   0,  17,   0],
        djaw:["M",   16,   0, "C",  15,   0,  15,   0,  15,   0],
        lblg:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "L",   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#cccccc"}},
        lbft:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "Z"], attr:{fill:"#dddddd"}},
        rblg:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "L",   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#cccccc"}},
        rbft:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "Z"], attr:{fill:"#dddddd"}},
        lflg:{path:["M",   9,   8, "C",  10,   0,   8,   0,  17,   0, "L",  17,   0, "C",   7,   0,  10,   5,   9,  -5], attr:{fill:"#dddddd"}},
        lfft:{path:["M",  18,   0, "C",  18,   0,  18,   0,  18,   0, "Z"], attr:{fill:"#dddddd"}},
        rflg:{path:["M",   7,   0, "C",   5,   5,   5, -10,  15, -10, "L",  15, -10, "C",   5,   0,   5,   0,   5,   0], attr:{fill:"#dddddd"}},
        rfft:{path:["M",  15, -10, "C",  15, -10,  15, -10,  15, -10, "Z"], attr:{fill:"#dddddd"}},
        });
    Sva.set(4,{
        tail:{path:["M",   0, -10, "C",   5,  33,  15, -36,  10, -38, "C",   0, -35,  10,  -5,   0, -10], attr:{fill:"#dddddd"}},
        body:{path:["M",  11,   0, "C",  10,   0,  13,   0,   5,   0, "C",   5,  -5, -12,   3,  11,   0], attr:{fill:"#dddddd"}},
        head:{path:["M",  22,   3, "C",  25,   3,  25,   3,  25,   3, "C",  25,   3,  25,   3,  22,   3], attr:{fill:"#dddddd"}},
        lear:{path:["M",  22,   3, "C",  20,   7,  20,   5,  28,   3], attr:{fill:"#dddddd"}},
        rear:{path:["M",  33,   3, "C",  33,   3,  33,   3,  30,   3], attr:{fill:"#dddddd"}},
        leye:{cx: 30, cy:  3, rx:  0, ry:  0},
        reye:{cx: 35, cy:  3, rx:  0, ry:  0},
        nose:{path:["M",  33,   3, "C",  33,   3,  33,   3,  34,   3], attr:{fill: "#000000"}},
        ujaw:["M",   33,   3, "C",  30,   3,  30,   3,  30,   3, "M",  30,   3, "C",  30,   3,  30,   3,  32,   3],
        djaw:["M",   31,   3, "C",  30,   3,  30,   3,  30,   3],
        lblg:{path:["M",  12,   0, "C",  12,   0,  12,   0,  12,   0, "L",   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#cccccc"}},
        lbft:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "Z"], attr:{fill:"#cccccc"}},
        rblg:{path:["M", -10,  -5, "C", -11,   0, -13,   0, -15,   0, "L",   0,   0, "C",   0,   0,   5,  -5,  10,  -5], attr:{fill:"#dddddd"}},
        rbft:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "Z"], attr:{fill:"#dddddd"}},
        lflg:{path:["M",  11,  13, "C",  15,  10,   8,   0,  17,   0, "L",  17,   0, "C",   7,   0,  10,   5,  11,   0], attr:{fill:"#cccccc"}},
        lfft:{path:["M",  18,   0, "C",  18,   0,  18,   0,  18,   0, "Z"], attr:{fill:"#cccccc"}},
        rflg:{path:["M",  37,   0, "C",  35,   5,  35, -10,  50,   0, "L",  50,   0, "C",  35,   0,  35,   0,  30,   0], attr:{fill:"#dddddd"}},
        rfft:{path:["M",  50,   0, "C",  50,   0,  50,   0,  50,   0, "Z"], attr:{fill:"#dddddd"}},
        });
    Sva.set(5,{
        tail:{path:["M", -30, -50, "C", -40, -43, -10, -77, -13, -80, "C", -27, -70,  -8, -38, -35, -45], attr:{fill:"#dddddd"}},
        body:{path:["M",  11,   0, "C",  30,   0,   0,   5,  -5, -20, "C",   5, -35, -22,  -2,  11,   0], attr:{fill:"#dddddd"}},
        head:{path:["M",  38,   6, "C",  37,   6,  52,   6,  44,   6, "C",  50,   6,  41,   6,  38,   6], attr:{fill:"#dddddd"}},
        lear:{path:["M",  36,   3, "C",  40,  12,  40,  13,  42,   4], attr:{fill:"#dddddd"}},
        rear:{path:["M",  54,  13, "C",  62,   4,  58,   4,  52,   3], attr:{fill:"#dddddd"}},
        leye:{cx: 48, cy:  6, rx: -1, ry:  0},
        reye:{cx: 56, cy:  6, rx:  0, ry:  0},
        nose:{path:["M",  52,   6, "C",  52,   6,  54,   6,  54,   6], attr:{fill: "#000000"}},
        ujaw:["M",   53,   6, "C",  52,   6,  50,   6,  53,   6, "M",  49,   6, "C",  49,   6,  49,   6,  53,   6],
        djaw:["M",   50,   6, "C",  50,   6,  51,   6,  51,   6],
        lblg:{path:["M",  -5, -25, "C", -10, -15, -22, -22,  -2,  -1, "L", -20,  -1, "C", -30,   3, -36,  10, -28,   2], attr:{fill:"#cccccc"}},
        lbft:{path:["M", -21,   0, "C", -19,   0, -19,   0, -14,   0, "Z"], attr:{fill:"#cccccc"}},
        rblg:{path:["M", -12, -26, "C", -22, -13, -37, -22, -34,  -5, "L", -16,  -9, "C", -16, -13,   0,   0,  -5, -25], attr:{fill:"#dddddd"}},
        rbft:{path:["M", -14,  -8, "C",  -6,  -3,  -8,   1, -24,  -2, "Z"], attr:{fill:"#dddddd"}},
        lflg:{path:["M",  11,  13, "C",  15,  10,   8,   0,  27,  -8, "L",  27, -13, "C",  12,  -5,  15,  -5,  15,  -7], attr:{fill:"#cccccc"}},
        lfft:{path:["M",  28,  -8, "C",  30,  -8,  30,  -8,  28,  -8, "Z"], attr:{fill:"#cccccc"}},
        rflg:{path:["M",  34,  -5, "C",  34,   5,  30, -10,  30,   0, "L",  30,   0, "C",  25,   0,  35,   0,  30,   0], attr:{fill:"#dddddd"}},
        rfft:{path:["M",  33,   0, "C",  35,   0,  35,   0,  33,   0, "Z"], attr:{fill:"#dddddd"}},
        });
    Sva.set(6,{
        tail:{path:["M", -30, -48, "C", -40, -41, -10, -65, -13, -68, "C", -27, -58,  -8, -36, -35, -43], attr:{fill:"#dddddd"}},
        body:{path:["M",  11,   0, "C",  30,   0,   0,   7,  -5, -18, "C",   5, -33, -22,   0,  11,   0], attr:{fill:"#dddddd"}},
        head:{path:["M",  38,   6, "C",  37,   6,  52,   6,  44,   6, "C",  50,   6,  41,   6,  38,   6], attr:{fill:"#dddddd"}},
        lear:{path:["M",  36,   3, "C",  40,  12,  40,  13,  42,   4], attr:{fill:"#dddddd"}},
        rear:{path:["M",  54,  12, "C",  62,   4,  58,   4,  52,   3], attr:{fill:"#dddddd"}},
        leye:{cx: 48, cy:  6, rx: -1, ry:  0},
        reye:{cx: 56, cy:  6, rx:  0, ry:  0},
        nose:{path:["M",  53,   6, "C",  53,   6,  55,   6,  55,   6], attr:{fill: "#000000"}},
        ujaw:["M",   54,   6, "C",  53,   6,  51,   6,  54,   6, "M",  49,   6, "C",  50,   6,  50,   6,  54,   6],
        djaw:["M",   51,   6, "C",  51,   6,  52,   6,  52,   6],
        lblg:{path:["M", -20, -43, "C", -15, -16, -35, -36, -29, -15, "L", -49,  -6, "C", -47,  -8, -60,   4, -33,  -1], attr:{fill:"#cccccc"}},
        lbft:{path:["M", -55,  -3, "C", -47,  -1, -47,  -4, -41, -15, "Z"], attr:{fill:"#cccccc"}},
        rblg:{path:["M", -10, -25, "C", -10, -11, -28, -19,  -7,   0, "L",  11,   0, "C", -14, -13,  13,  10,  -5, -25], attr:{fill:"#dddddd"}},
        rbft:{path:["M",  13,   0, "C",  19,   0,  19,   0,   9,   0, "Z"], attr:{fill:"#dddddd"}},
        lflg:{path:["M",  18,   8, "C",  20,   5,  17,  -5,  31,   0, "L",  31,   0, "C",  23,  -8,  23,  15,  16,  -9], attr:{fill:"#cccccc"}},
        lfft:{path:["M",  31,   0, "C",  33,   0,  33,   0,  31,   0, "Z"], attr:{fill:"#cccccc"}},
        rflg:{path:["M",  34,  -2, "C",  25,  10,  32,  -9,  29,  -5, "L",  30, -10, "C",  16,  -7,  30,   5,  30,  -5], attr:{fill:"#dddddd"}},
        rfft:{path:["M",  31, -10, "C",  34,  -5,  34,   2,  24,  -1, "Z"], attr:{fill:"#dddddd"}},
        });
    Sva.set(7,{
        tail:{path:["M", -30, -50, "C", -40, -43, -10, -77, -13, -80, "C", -27, -70,  -8, -38, -35, -45], attr:{fill:"#dddddd"}},
        body:{path:["M",  11,   0, "C",  30,   0,   0,   5,  -5, -20, "C",   5, -35, -22,  -2,  11,   0], attr:{fill:"#dddddd"}},
        head:{path:["M",  38,   6, "C",  37,   6,  52,   6,  44,   6, "C",  50,   6,  41,   6,  38,   6], attr:{fill:"#dddddd"}},
        lear:{path:["M",  36,   3, "C",  40,  12,  40,  13,  42,   4], attr:{fill:"#dddddd"}},
        rear:{path:["M",  54,  12, "C",  62,   4,  58,   4,  52,   3], attr:{fill:"#dddddd"}},
        leye:{cx: 48, cy:  6, rx: -1, ry:  0},
        reye:{cx: 56, cy:  6, rx:  0, ry:  0},
        nose:{path:["M",  53,   6, "C",  53,   6,  55,   6,  55,   6], attr:{fill: "#000000"}},
        ujaw:["M",   54,   6, "C",  53,   6,  51,   6,  54,   6, "M",  49,   6, "C",  50,   6,  50,   6,  54,   6],
        djaw:["M",   51,   6, "C",  51,   6,  52,   6,  52,   6],
        // erease what is below
        lblg:{path:["M", -20, -40, "C",  -4,  -8, -31, -26,  -5,   0, "L", -24,   0, "C", -43,  -3, -36,   9, -29,   2], attr:{fill:"#cccccc"}},
        lbft:{path:["M", -21,   0, "C", -23,   0, -21,   0, -17,   0, "Z"], attr:{fill:"#cccccc"}},
        rblg:{path:["M", -14, -20, "C", -43, -18, -25, -15, -35,  -5, "L", -14, -15, "C", -16, -26,   6,   6,  -5, -25], attr:{fill:"#dddddd"}},
        rbft:{path:["M", -13, -13, "C",  -8,  -4,  -8,  -2, -27,  -3, "Z"], attr:{fill:"#dddddd"}},
        lflg:{path:["M",   5,  14, "C",  11,  15,   5,   0,   7, -10, "L",   8,  -5, "C",  13,   0,   9,   9,   9,   4], attr:{fill:"#cccccc"}},
        lfft:{path:["M",   3,  -1, "C",  12,   2,  12,  -4,   9,  -8, "Z"], attr:{fill:"#cccccc"}},
        rflg:{path:["M",  39,  -6, "C",  48,  15,  39,  -9,  54,   0, "L",  53,   0, "C",  36,  -5,  45,   5,  37,   0], attr:{fill:"#dddddd"}},
        rfft:{path:["M",  55,   0, "C",  57,   0,  57,   0,  55,   0, "Z"], attr:{fill:"#dddddd"}},
        });

    /// cute stuff
    Sva.set(16,{
        tail:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#dddddd"}},
        body:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#dddddd"}},
        head:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#dddddd"}},
        lear:{path:["M",   0,   5, "C",   0,  11,   0,   0,   0,   0], attr:{fill:"#dddddd"}},
        rear:{path:["M",   0,   0, "C",   0,   0,   0,  11,   0,   5], attr:{fill:"#dddddd"}},
        leye:{cx: -3, cy: 10, rx:  0, ry: -3},
        reye:{cx:  2, cy: 10, rx:  0, ry: -3},
        nose:{path:["M",   0,  10, "C",   0,  10,   0,  10,   0,  10], attr:{fill: "#000000"}},
        ujaw:["M",    0,   7, "C",   0,   7,   0,   7,   0,   7, "M",   0,   7, "C",   0,   7,   0,   7,   0,   7],
        djaw:["M",    0,   5, "C",   0,   5,   0,   5,   0,   5],
        // erease what is below
        lblg:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "L",   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#cccccc"}},
        lbft:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "Z"], attr:{fill:"#cccccc"}},
        rblg:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "L",   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#dddddd"}},
        rbft:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "Z"], attr:{fill:"#dddddd"}},
        lflg:{path:["M",   0,  -5, "C",   0,  -5,   0,  -5,   0, -50, "L",   0, -50, "C",   0, -15,   0, -15,   0,  -5], attr:{fill:"#cccccc"}},
        lfft:{path:["M",  -2, -50, "C",  -2, -50,  -2, -50,  -2, -50, "Z"], attr:{fill:"#cccccc"}},
        rflg:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "L",   0,   0, "C",   0,   0,   0,   0,   0,   0], attr:{fill:"#dddddd"}},
        rfft:{path:["M",   0,   0, "C",   0,   0,   0,   0,   0,   0, "Z"], attr:{fill:"#dddddd"}},
        });


    var X = 0, Xp = 40;
    Sva.flip( 8, 0, "x", X, {x:Xp});
    Sva.flip( 9, 1, "x", X, {x:Xp});
    Sva.flip(10, 2, "x", X, {x:Xp});
    Sva.flip(11, 3, "x", X, {x:Xp});
    Sva.flip(12, 4, "x", X, {x:Xp});
    Sva.flip(13, 5, "x", X, {x:Xp});
    Sva.flip(14, 6, "x", X, {x:Xp});
    Sva.flip(15, 7, "x", X, {x:Xp});
    Sva.flip(17, 16, "x", X, {x:Xp});
    Sva.swch(
        [8, 9, 10, 11, 12, 13, 14, 15, 17],[
            ["lear", "rear"],
            ["head", [[8, [1, 15]], [4, 6], [5, 7], [9, [2 ,16]], [11, 13], [12, 14]]],
            ["body", [[8, [1, 15]], [4, 6], [5, 7], [9, [2 ,16]], [11, 13], [12, 14]]],
            ["lear", [[1, 8], [4, 6], [5, 7], [2, 9]]],
            ["rear", [[1, 8], [4, 6], [5, 7], [2, 9]]],
            ["leye", "reye"],
            ["nose", [[1, 8], [4, 6], [5, 7], [2, 9]]],
            ["ujaw", [[1, 18], [4, 16], [5, 17], [2, 19], [11, 8], [14, 6], [15, 7], [12, 9]]],
            ["djaw", [[1, 8], [4, 6], [5, 7], [2, 9]]],
            ["lblg", "rblg"],
            ["lbft", "rbft"],
            ["lflg", "rflg"],
            ["lfft", "rfft"],
            ]);
    BUSY = 0;
    Sva.CUTE = 0;
    
    var cute = function(){
        var t = 200;
        if (Sva.pos == 0 || Sva.pos == 8){
            Sva.cute = 1;
            Sva.go([(Sva.pos == 0)?16:17], {x: 0, t:t});
            setTimeout("Sva.cute = 0;", t);
            }};
    Sva.b["head"].click(cute);

    // aiming on mouse move
    document.onmousemove = function(e){
        X = (document.all && event.clientX)? event.clientX +
            (document.documentElement.scrollLeft || document.body.scrollLeft) :
            (e.pageX)? e.pageX : null;
        Y = (document.all && event.clientY)? event.clientY +
            (document.documentElement.scrollTop || document.body.scrollTop) :
            (e.pageY)? e.pageY : null;
        var dx = Sva.mouse.x - X;
        if (dx > 70 || dx <-70) Sva.stop((POS)?0:8);
        Sva.mouse.x = X;
        Sva.mouse.y = Y;    
        if (Sva.cute) return;
        if(!BUSY) WALK();
        };

    // on mouse click
    document.onclick = function(e){
        if (Sva.pos != 0 && Sva.pos != 8) Sva.stop((POS)?0:8);
        }

    // on mouse click
    document.onkeypress = function(e){
        }};



// The End.
