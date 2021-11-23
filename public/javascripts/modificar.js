let modificarBtn = document.getElementById("modificar-btn");

modificarBtn.addEventListener('click', ()=> {

    let id    = document.getElementById('id-atr').value;
    let text  = document.getElementById('texto-atr').value;
    let title = document.getElementById('titulo-atr').value;

    fetch(`/api/listas/${id}`,{
        method: "put",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({text, title })
    })
    .then((res) => {
        
        let box = null;

        if( res.status === 204 ){
            box = document.getElementById("alert-success");} 
        else{
            box = document.getElementById("alert-danger");}

        box.style.display = "block";
        setTimeout(() => box.style.display = "none" , 3000);

    });

});