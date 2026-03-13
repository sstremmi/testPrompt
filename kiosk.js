// open WebSocket connection to the server
const ws = new WebSocket('ws://localhost:8080');

// log when connection opens
ws.onopen = () => {
    console.log('Connected to server!');
};

// defines body
const body = document.querySelector('body');

// function to create a spark on the page
function createSpark(data) {
    const spark = document.createElement('div');
    spark.classList.add('perma-spark');

    // size and position
    const sparkSize = 30;
    spark.style.position = 'absolute';
    spark.style.width = sparkSize + 'px';
    spark.style.height = sparkSize + 'px';
    spark.style.borderRadius = '50%';
    spark.style.pointerEvents = 'none'; // prevents interfering with clicks

    // set color based on emotion
    switch (data.emotion) {
        case 'joy':
            spark.style.background = "radial-gradient(circle, rgba(255,255,0,.6) 0%, rgba(255,255,0,.4) 40%, rgba(255,255,0,0) 70%)";
            break;
        case 'grief':
            spark.style.background = "radial-gradient(rgba(0,0,255,.3), rgba(0,0,255,.1))";
            break;
        case 'stress':
            spark.style.background = "radial-gradient(rgba(255,0,0,.3), rgba(255,0,0,.1))";
            break;
        default:
            spark.style.background = "radial-gradient(rgba(255,0,255,.3), rgba(255,0,255,.1))";
    }

     // scale 1920x1080 → current body size
    const x = (data.x / 1920) * window.innerWidth;
    const y = (data.y / 1080) * window.innerHeight;

    spark.style.left = x + 'px';
    spark.style.top = y + 'px';
    spark.style.transform = "translate(-50%, -50%)";

    // adds to page
    body.appendChild(spark);
}

// handles messages from the server
ws.onmessage = (event) => {
    try {
        const data = JSON.parse(event.data);

        // if (touchData.json) is an array, draw all sparks
        if (Array.isArray(data)) {
            data.forEach(createSpark);
        } else {
            // single spark from live update
            createSpark(data);
        }

    } catch (error) {
        console.error('Error parsing server message:', error);
    }
};

// handle errors
ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

// handle connection closed
ws.onclose = () => {
    console.log('Disconnected from server');
};