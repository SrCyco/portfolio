
console.log('hola');
function cubeEvents(){
    var $cubeScene = document.querySelector('.scene');
    var startX = 0;
    var endX = 0;
    var startY = 0;
    var endY = 0;
    $cubeScene.addEventListener('mousedown', function(event){
        startX = event.screenX;
        startY = event.screenY;
    }, false);
    $cubeScene.addEventListener('mouseup', function (event) {
        endX = event.screenX;
        endY = event.screenY;
        swipeDirection();
    })
    var changeDegX = 0;
    var changeDegY = 0;
    function swipeDirection(){
        var difX = Math.abs(endX - startX);
        var difY = Math.abs(endY - startY);
        console.log('X',startX, endX);
        console.log('Y', startY, endY);
        console.log('X',difX, 'Y', difY, 'dif', difX > difY)
        var $cube = $cubeScene.querySelector('.cube')
        var deg = 90;
        
        if( difX > difY){
            if (startX < endX) {
                changeDegX = changeDegX + deg;
                console.log('Derecha');
                $cube.style.transform = `translateZ(-200px) rotateY(${changeDegX}deg)`
                
            }
            if (startX > endX) {
                console.log('Izquierda');
                changeDegX = changeDegX - deg;
                $cube.style.transform = `translateZ(-200px) rotateY(${changeDegX}deg)`
            }
        }else{
            if (startY < endY) {
                changeDegY = changeDegY - deg;
                $cube.style.transform = `translateZ(-200px) rotateX(${changeDegY}deg)`
                console.log('abajo');
                
            }
            if (startY > endY) {
                changeDegY = changeDegY + deg;
                $cube.style.transform = `translateZ(-200px) rotateX(${changeDegY}deg)`
                console.log('arriba');
            }
        }

    }
}



(function(){
    
    cubeEvents();
        


})();


