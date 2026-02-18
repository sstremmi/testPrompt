const sparkSize = 80;
const ws = new WebSocket('ws://localhost:8080');

// Connection opened
ws.onopen = () => {
    console.log('Connected to server');
};


let body = document.querySelector('body');
body.addEventListener('click', function(event){

    const emotion = document.querySelector('#emotion').value;
    let spark = document.createElement('div');
    spark.classList.add('spark');
    body.appendChild(spark);

    let x = event.clientY - sparkSize/2; // - body.offsetTop;
    let y = event.clientX - sparkSize/2; // - body.offsetLeft;
    spark.style.top = x + 'px';
    spark.style.left = y + 'px';

    ws.send(JSON.stringify({
        x: x, 
        y: y,
        emotion: emotion
    }));

    setTimeout(function(){
        spark.remove();
    }, 1000);
});
