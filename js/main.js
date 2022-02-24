// buscador
document.addEventListener("keyup", e => {
    if (e.target.matches("#buscador")) {

        document.querySelectorAll(".boxProduct").forEach(product => {

            product.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ? product.classList.remove("filtro")
                : product.classList.add("filtro")
        })
    }

})


// CARRITO
const baseDeDatos = [
    {
        id: 1,
        name: "Mix Tradicional",
        precio: 670,
        img: "/img/tradicional.png"
    },
    {
        id: 2,
        name: "Mix Sport",
        precio: 790,
        img: "/img/sport.png"
    },
    {
        id: 3,
        name: "Mix Tropical",
        precio: 940,
        img: "/img/tropical.png"
    },
    {
        id: 4,
        name: "Mix Europeo",
        precio: 980,
        img: "/img/europeo.png"
    },
    {
        id: 5,
        name: "Mix Secos Premium",
        precio: 1340,
        img: "/img/secos premium.png"
    },
    {
        id: 6,
        name: "Granola y Almendras",
        precio: 450,
        img: "/img/granola.png"
    },
    {
        id: 7,
        name: "Almohaditas Rellenas",
        precio: 450,
        img: "/img/DSC_0220.jpg"
    },
    {
        id: 8,
        name: "Copo de Maiz",
        precio: 250,
        img: "/img/DSC_0240.jpg"
    },
    {
        id: 9,
        name: "Mix Semillas",
        precio: 320,
        img: "/img/DSC_0250.jpg"
    },
    {
        id: 10,
        name: "Harina Integral",
        precio: 100,
        img: "/img/DSC_0193.jpg"
    },
    {
        id: 11,
        name: "Avena Instantanea",
        precio: 170,
        img: "/img/AVENA INSTANTANEA.jpg"
    },
    {
        id: 12,
        name: "Aceite de Coco",
        precio: 450,
        img: "/img/ACEITE DE COCO.jpg"
    },
    {
        id: 13,
        name: "Pasta de Mani",
        precio: 200,
        img: "/img/DSC_0254.jpg"
    },
    {
        id: 14,
        name: "Nuez Mariposa",
        precio: 670,
        img: "/img/DSC_0243.jpg"
    },
    {
        id: 15,
        name: "Mani sin Sal",
        precio: 150,
        img: "/img/DSC_0246.jpg"
    }
]
let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const miLocalStorage = window.localStorage;



function renderizarProductos() {
    baseDeDatos.forEach((producto) => {
        const miNodo = document.createElement('div');
        miNodo.classList.add('conteinerProduct');
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('boxProduct');
        const miNodoTitle = document.createElement('h2');
        miNodoTitle.classList.add('productTittle');
        miNodoTitle.textContent = producto.name;
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('img');
        miNodoImagen.setAttribute('src', producto.img);
        const miNodoPrecio = document.createElement('h4');
        miNodoPrecio.classList.add('precioProducto');
        miNodoPrecio.textContent = `${producto.precio}${divisa}`;
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btnCompra');
        miNodoBoton.textContent = 'Agregar al Carrito';
        miNodoBoton.setAttribute('marcador', producto.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);


        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}



function anyadirProductoAlCarrito(evento) {
    carrito.push(evento.target.getAttribute('marcador'))


    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}
function renderizarCarrito() {
    DOMcarrito.textContent = '';
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            return itemId === item ? total += 1 : total;
        }, 0);
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].name} - ${miItem[0].precio}${divisa}`;
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'Eliminar Producto';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    const totalContainer = document.createElement("div");
    totalContainer.className = "total-carrito";
    totalContainer.innerHTML = `<button class= "finalizar" id="finalizar" onClick="finalizarCompra()"> FINALIZAR COMPRA </button>`;
    DOMcarrito.appendChild(totalContainer);
    DOMtotal.textContent = calcularTotal();


}

const finalizarCompra = () => {
    const total = document.getElementsByClassName("total")[0].innerHTML;
    DOMcarrito.innerHTML = "";
    const compraFinalizada = `<div class="compra-finalizada"><p class="compra-parrafo"> YA CASI ES TUYA LA COMPRA, EL TOTAL ES  ${total} </p></div>
    <div class="datos-cliente">
    <p class="datos-parrafo"> Complete el formulario con sus datos para coordinar la entrega</p>
    <button class= "btn-formulario" id="formulario" onClick="dibujarFormu()"> FORMULARIO </button>
    </div>`;
    DOMcarrito.innerHTML = compraFinalizada;
}

function borrarItemCarrito(evento) {
    const id = evento.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });

    renderizarCarrito();
    guardarCarritoEnLocalStorage();
}

function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
    }, 0).toFixed(2);
}
const dibujarFormu = () => {
    DOMcarrito.innerHTML = "";
    const formulario = `
    <h2> DATOS PARA EL ENVÍO </h2>
    <div class=" container__carro">
     <div class="row">
       <div class="contact__secction__item">
         <label>Nombre</label>
         <input type="text" id="nombre" placeholder="Nombre"  />
       </div>
       <div class="contact__secction__item">
         <label>E-mail</label>
         <input type="text" id="mail" placeholder="E-mail" />
       </div>
       <div class="contact__secction__item">
         <label>Telefono</label>
         <input type="text" id="telefono" placeholder="Telefono"  />
       </div>
       <div class="contact__secction__item">
         <label>Domicilio</label>
         <input type="text" id="domicilio" placeholder="Domicilio" />
       </div>
       <div class="contact-button">
         <button type="button" class="btn btn-danger envio" onClick="mostrarMensaje()" >Confirmar</button>
       </div>
     </div>
   </div>`;
    DOMcarrito.innerHTML = formulario;
};
const mostrarMensaje = () => {
    const nombreCliente = document.getElementById("nombre").value;
    const domicilioCliente = document.getElementById("domicilio").value;
    DOMcarrito.innerHTML = "";
    let mensaje = `<div class="mensaje-final">Gracias por tu compra ${nombreCliente} en 48 horas recibiras tu paquete en ${domicilioCliente} </div>`;
    DOMcarrito.innerHTML = mensaje;
};


function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
    localStorage.clear();
}

function guardarCarritoEnLocalStorage() {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage() {
    if (miLocalStorage.getItem('carrito') !== null) {
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
}



DOMbotonVaciar.addEventListener('click', vaciarCarrito);


// Inicio
cargarCarritoDeLocalStorage();
renderizarProductos();
renderizarCarrito();
