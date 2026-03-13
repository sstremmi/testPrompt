//opens live connection to the WebSocket server
const ws = new WebSocket('ws://localhost:8080');

//every spark will be 30px by 30px
const sparkSize = 30;

// logs connection has opened
ws.onopen = () => {
    console.log('Connected to server');
};

//defines body
let body = document.querySelector('body');
//checks if user has clicked
let hasClicked = false;

body.addEventListener('click', function(event){
 if (event.target.tagName === 'A' || event.target.closest('a') || event.target.tagName === 'BUTTON') return;

    event.preventDefault();
//only lets 1 click happen
    if (hasClicked) return;
    hasClicked = true;
//sets the emotion variable to the emotion from an input field 
//with an id of emotion
    const emotion = document.querySelector('#emotion').value;
//creates a new div called spark and adds it to the page
    let spark = document.createElement('div');
    spark.classList.add('spark');
    body.appendChild(spark);
//positions the spark where clicked
    const previewX = event.clientX - sparkSize/2;
    const previewY = event.clientY - sparkSize/2;

    spark.style.left = previewX + 'px';
    spark.style.top = previewY + 'px';

    // convert click to fixed 1920x1080 coordinates
    const x = (event.clientX / window.innerWidth) * 1920;
    const y = (event.clientY / window.innerHeight) * 1080;

//sends the click info to the server
    ws.send(JSON.stringify({
        x: x, 
        y: y,
        emotion: emotion
    }));
//removes spark after 1 second
    setTimeout(function(){
        spark.remove();
    }, 1000);
});
