candyService.factory('canvasService', function($q){

    function icon(imageurl){
        var deferred = $q.defer();
        var img =new Image();
        var bg;
        img.crossOrigin = "Anonymous";
        img.src = imageurl;
        img.onload = function(that){
            bg = document.createElement("canvas");
            bg.width = 50;
            bg.height = 55;
            var bgCtx = bg.getContext("2d");
            // 黒枠の作成
            bgCtx.beginPath();
            bgCtx.moveTo(25,55);
            bgCtx.lineTo(15,40);
            bgCtx.moveTo(25,55);
            bgCtx.lineTo(35,40);
            bgCtx.stroke();
            bgCtx.arc(25, 25, 25, 0, Math.PI*2, false);
            bgCtx.clip();
            bgCtx.drawImage(img, 0, 0,50,50);
            deferred.resolve(bg.toDataURL());
        }
        return deferred.promise;
    }

    function infowindow(userObject){
        var deferred = $q.defer();
        var cs = document.createElement("canvas");
        cs.width = 300;
        cs.height = 300;
        var h = 300;
        var w = 300;
        var ctx = cs.getContext('2d');
        ctx.shadowBlur = 8.0;
        ctx.shadowOffsetX = 1.0;
        ctx.shadowOffsetY = 1.0;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.fillStyle = '#FFF';
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();
        roundRect(ctx, 10, 10, 200, 120, 12);
        ctx.moveTo(160, 100);
        ctx.lineTo(60, 100);
        ctx.lineTo(150, 170);
        ctx.closePath();
        ctx.fill();
        //depict name
        var metrics = ctx.measureText(userObject.name);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.font = "22px 'Gilgongo'";
        ctx.strokeText(userObject.name, 20, 30, 180);
        ctx.beginPath();
        ctx.fillStyle = '#47ea7e'; // 緑 //gray #808080
        ctx.arc(30, 60, 10, 0, Math.PI*2, false);
        ctx.fill();
        ctx.strokeText("Online", 50, 65, 180);
        createStar(ctx,30,100,20,"yellow");
        createStar(ctx,60,100,20,"yellow");
        createStar(ctx,90,100,20,"yellow");
        createStar(ctx,120,100,20,"yellow");
        createStar(ctx,150,100,20,"yellow");
        deferred.resolve(cs.toDataURL());
        return deferred.promise;
    }
    var roundRect = function(ctx, x, y, w, h, r) {
        ctx.moveTo(x, y + r);
        ctx.lineTo(x, y + h - r);
        ctx.quadraticCurveTo(x, y + h, x + r, y + h);
        ctx.lineTo(x + w - r, y + h);
        ctx.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
        ctx.lineTo(x + w, y + r);
        ctx.quadraticCurveTo(x + w, y, x + w - r, y);
        ctx.lineTo(x + r, y);
        ctx.quadraticCurveTo(x, y, x, y + r);
    }

    function createStar(ctx,x,y,r,color){
        //五芒星の時の角度
        var c1 = createCordinate(r,-90);
        var c2 = createCordinate(r,-234);
        var c3 = createCordinate(r,-18);
        var c4 = createCordinate(r,-162);
        var c5 = createCordinate(r,-306);
        ctx.fillStyle = color;
        ctx.lineWidth = 0;
        ctx.beginPath();
        ctx.moveTo(x,y-r);
        ctx.lineTo(c1.x + x, c1.y + y);
        ctx.lineTo(c2.x + x, c2.y + y);
        ctx.lineTo(c3.x + x, c3.y + y);
        ctx.lineTo(c4.x + x, c4.y + y);
        ctx.lineTo(c5.x + x, c5.y + y);
        ctx.closePath();
        ctx.fill();
        //ctx.stroke();
        function createCordinate(r,angle){
            var x = r * Math.cos(angle / 180 * Math.PI);
            var y = r * Math.sin(angle / 180 * Math.PI);
            return {
                "x" : x,
                "y" : y
            };
        }
    }

    var canvas = {
        icon: icon,
        infowindow: infowindow
    };

    return canvas;

});
