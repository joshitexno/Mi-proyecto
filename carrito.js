console.log("✅ carrito.js cargado");

let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    total += precio;
    actualizarCarrito();
    alert("Prducto agregado al carrito ✅");
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("total", total);
}

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";

    if (carrito.length === 0) {
        lista.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío 🛒</p>`;
    } else {
        carrito.forEach((item, index) => {
            lista.innerHTML += `
                <div class="item-carrito">
                    <span>${item.nombre} - L ${item.precio}</span>
                    <button class="btn-eliminar" onclick="eliminarProducto(${index})">❌</button>
                </div>
            `;
        });
    }

    document.getElementById("total").innerText = total;
}


function eliminarProducto(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarCarrito();
}

function enviarPedido() {
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;

    if (!nombre || !telefono || !direccion || carrito.length === 0) {
        alert("Completa los datos y agrega productos.");
        return;
    }

    let mensaje = "Pedido de Velas Aromáticas%0A%0A";
    mensaje += `Cliente: ${nombre}%0A`;
    mensaje += `Teléfono: ${telefono}%0A`;
    mensaje += `Dirección: ${direccion}%0A%0A`;
    mensaje += "Productos:%0A";

    carrito.forEach(item => {
        mensaje += `- ${item.nombre} (L ${item.precio})%0A`;
    });

    mensaje += `%0ATotal: L ${total}`;

    const numeroWhatsApp = "50498026511"; // ← número real de tu cliente
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

    window.open(url, "_blank");
}


window.onload = function () {
    const carritoGuardado = localStorage.getItem("carrito");
    const totalGuardado = localStorage.getItem("total");

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        total = parseInt(totalGuardado);
        actualizarCarrito();
    }
};

// ===== ANIMACIONES AL HACER SCROLL =====

const elementosAnimados = document.querySelectorAll(".animar");

function animarAlScroll() {
    const alturaVentana = window.innerHeight;

    elementosAnimados.forEach(elemento => {
        const distanciaTop = elemento.getBoundingClientRect().top;

        if (distanciaTop < alturaVentana - 100) {
            elemento.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", animarAlScroll);
animarAlScroll();