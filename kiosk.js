const ws = new WebSocket('ws://localhost:8080');

// Connection opened
ws.onopen = () => {
    console.log('Connected to server!');
};


let body = document.querySelector('body');

ws.onmessage = (event) => {
    console.log(event);
    try{
        const data = JSON.parse(event.data);

        const spark = document.createElement('div');
        spark.classList.add('perma-spark');
        if (data.emotion === 'joy') {
            spark.style.background = "radial-gradient(rgba(255, 255, 0, .3), rgba(255, 255, 0, .1))";
            spark.style.boxShadow = "0 0 10px rgba(255,255,0,.3)"
        } else if (data.emotion === 'grief') {
            spark.style.background = "radial-gradient(rgba(0, 0, 255, .3), rgba(0, 0, 255, .1))";
            spark.style.boxShadow = "0 0 10px rgba(0,0,255,.3)"
        } else if (data.emotion === 'stress') {
            spark.style.background = "radial-gradient(rgba(255, 0, 0, .3), rgba(255, 0, 0, .1))";
            spark.style.boxShadow = "0 0 10px rgba(255,0,0,.3)"
        } else {
            spark.style.background = "radial-gradient(rgba(255, 0, 255, .3), rgba(255, 0, 255, .1))";
            spark.style.boxShadow = "0 0 10px rgba(255,0,255,.3)"
        }
        document.body.appendChild(spark);

        spark.style.top = data.x + 'px';
        spark.style.left = data.y + 'px';
    } catch (error) {
        console.log('Error: ' + error.message);
    }
};


ws.onerror = (error) => {
    console.log('Error: ' + error.message);
};

// Handle connection close
ws.onclose = () => {
    console.log('Disconnected from server');
};
