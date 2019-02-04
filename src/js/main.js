function cubeEvents(){
    var $cubeScene = document.querySelector('.scene');
    var startX = 0;
    var endX = 0;
    var startY = 0;
    var endY = 0;
    $cubeScene.addEventListener('mousedown', function(event){
        startX = event.screenX;
        startY = event.screenY;
    });
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
        // console.log('X',startX, endX);
        // console.log('Y', startY, endY);
        // console.log('X',difX, 'Y', difY, 'dif', difX > difY)
        var $cube = $cubeScene.querySelector('.cube')
        var deg = 90;
        
        if( difX > difY){
            if (startX < endX) {
                changeDegX = changeDegX + deg;
                $cube.style.transform = `translateZ(-200px) rotateX(0deg) rotateY(${changeDegX}deg) `;
                // console.log('Derecha');
            }
            if (startX > endX) {
                changeDegX = changeDegX - deg;
                $cube.style.transform = `translateZ(-200px) rotateX(0deg) rotateY(${changeDegX}deg)`;
                // console.log('Izquierda');

            }
        }else{
            if (startY < endY) {
                changeDegY = changeDegY - deg;
                console.log('changeDegY', changeDegY);
                $cube.style.transform = `translateZ(-200px) rotateX(${changeDegY}deg) rotateY(0deg)`;
                // console.log('Abajo');
            }
            if (startY > endY) {
                changeDegY = changeDegY + deg;
                console.log('changeDegY', changeDegY);
                $cube.style.transform = `translateZ(-200px) rotateX(${changeDegY}deg) rotateY(0deg)`;
                // console.log('Arriba');

            }
        }
    }
}

var skills = {
    js:{
        title: 'JavaScript',
        percentage: '40',
        color: '#F7DF1E',
        desc: 'Manejo de ES6. Orientado a Objetos.'
    },
    css: {
        title: 'CSS3',
        percentage: '60',
        color: '#1091C8',
        desc: 'Manejo de animaciones. PostCSS. Responsive design. Grid Layout.'
    },
    html: {
        title: 'HTML5',
        percentage: '60',
        color: '#F16524',
        desc: 'Etiquetas con significado semantico'
    },
    sass: {
        title: 'SASS',
        percentage: '60',
        color: '#CF649A',
        desc: 'Menejo de funciones. Mixins. Condicionales. Tags.'
    },
    git: {
        title: 'Git & Github',
        percentage: '40',
        color: '#5C005C',
        desc: 'Menejo de ramas. Github proyects, conocimiento de git Flow.'
    },
    jquery: {
        title: 'JQuery',
        percentage: '50',
        color: '#1E2C3B',
        desc: 'Experiencia, pero no dependencia.'

    }
}

function getSkill(){
    const $cubeFaces = document.querySelectorAll('[class*="cube__face"]');
    let selectedFace;
    let selectedFaceColor;
    for(let i= 0; i < $cubeFaces.length; i++){
        $cubeFaces[i].addEventListener('click', (event) => {
            selectedFace = event.target.dataset.name;
            selectedFaceColor = event; 
            createSkill(selectedFace);
            console.log(getColor(selectedFace));
        });
    }
}

function getColor(selectedFace){
    const $cube = document.querySelector('.cube');
    const $cubeFaces = $cube.children;
    let faceName;
    var faceColor;
    for (let index = 0; index < $cubeFaces.length; index++) {
        faceName = $cubeFaces[index].getAttribute('data-name');
        if(faceName === selectedFace){
            let classSelected = $cubeFaces[index].getAttribute('class');
            let face = document.querySelector(`.${classSelected}`)
            let compStyles = window.getComputedStyle(face);
            faceColor = compStyles.getPropertyValue('background-color');
        }
    }
    return faceColor;
}

function templateSkill(skill) {
    return(`
        <h3 class="skill__title">${skill.title}</h3>
        <figure class="skill__container">
            <svg class="skill__chart" >
                <circle class="skill__circle-bg" cx="50%" cy="50%" r="90" />
                <circle class="skill__circle" cx="50%" cy="50%" r="90" />
                <text x="50%" y="50%" class="percentage">${skill.percentage}%</text>
            </svg>
        </figure>
        <p class="skill__desc">${skill.desc}</p>
    `) 
}
const $skillContainer = document.querySelector('.skill');


function createSkill(selectedFace) {
    let template = templateSkill(skills[selectedFace]);
    $skillContainer.innerHTML = template;
    loadCircle(skills[selectedFace]);
}

function calculatePercentage($circle, percentage){
    let circleRadius = $circle.getAttribute('r');
    let circleCircumference = (2 * Math.PI) * circleRadius;
    let circlePercent = (percentage * circleCircumference) / 100;
    let finalPercent = circleCircumference - circlePercent;
    setCirclePercentage($circle, circleCircumference, finalPercent);
}
function setCirclePercentage($circle, circumference, percent){
    $circle.style.strokeDasharray = circumference;
    $circle.style.strokeDashoffset = percent;
}


function setCircleColor($circle, skillColor) {
    $circle.style.stroke = skillColor;

}

function loadCircle(selectedFace) {
    const $circle = document.querySelector('.skill__circle');
    let skillColor = selectedFace.color;
    let skillPercent = selectedFace.percentage;
    calculatePercentage($circle, skillPercent);
    setCircleColor($circle, skillColor);
}



(function(){
    cubeEvents();
    getSkill();
})();


