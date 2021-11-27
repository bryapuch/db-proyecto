let eliminarBtn = document.getElementById("eliminar-btn");

eliminarBtn.addEventListener('click', ()=> {

    let articuloId = document.getElementById("id-atr").value;
    fetch(`/api/articulos/${articuloId}`,{
        method: "delete"
    })
    .then((res) => {
        if(res.status == 204){
            
            window.location.replace(`/?articuloId=${articuloId}`)
        }
    })

})