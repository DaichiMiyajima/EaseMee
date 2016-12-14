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

    var canvas = {
        icon: icon
    };

    return canvas;

});
