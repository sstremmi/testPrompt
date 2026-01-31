let body = document.querySelector('body');
body.addEventListener('click', function(event){
    let spark = document.createElement('div');
    spark.classList.add('spark');
    body.appendChild(spark);

    spark.style.top = (event.clientY - body.offsetTop) + 'px';
    spark.style.left = (event.clientX - body.offsetLeft) + 'px';

    setTimeout(function(){
        spark.remove();
    }, 1000);
});
