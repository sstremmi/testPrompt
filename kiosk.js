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
            spark.style.background = "yellow";
        } else if (data.emotion === 'grief') {
            spark.style.background = "#00e";
        } else if (data.emotion === 'stress') {
            spark.style.background = "red";
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
