// =====================
// GESTIÓN DE USUARIOS
// =====================

// Registro de usuario con almacenamiento local
function validarRegistro() {
    let usuario = document.getElementById("usuarioRegistro").value.trim();
    let pass1 = document.getElementById("pass1").value;
    let pass2 = document.getElementById("pass2").value;

    if (usuario === "" || pass1 === "" || pass2 === "") {
        alert("Por favor complete todos los campos.");
        return false;
    }

    if (pass1 !== pass2) {
        mostrarError("errorPass", "Las contraseñas no coinciden.");
        return false;
    } else {
        limpiarError("errorPass");
    }

    // Obtener usuarios existentes
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Verificar si ya existe
    let existe = usuarios.find(u => u.usuario === usuario);
    if (existe) {
        alert("El usuario ya está registrado. Intente con otro nombre.");
        return false;
    }

    // Guardar usuario
    usuarios.push({ usuario: usuario, contrasena: pass1 });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Registro completado correctamente.");
    return true;
}

// Inicio de sesión
function validarLogin() {
    let usuario = document.getElementById("usuario").value.trim();
    let contrasena = document.getElementById("contrasena").value;

    if (usuario === "" || contrasena === "") {
        alert("Por favor complete todos los campos.");
        return false;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let encontrado = usuarios.find(u => u.usuario === usuario && u.contrasena === contrasena);

    if (encontrado) {
        alert("Inicio de sesión exitoso.");
        localStorage.setItem("usuarioActivo", usuario);
        return true;
    } else {
        alert("Usuario o contraseña incorrectos.");
        return false;
    }
}

// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    alert("Has cerrado sesión correctamente.");
    window.location.href = "login.html";
}

// =====================
// VALIDACIONES GENERALES
// =====================

// Registro de clientes
function validarInformacion() {
    if (!verificarSesion()) return false;

    let nombre = document.getElementById("nombreCliente").value;
    let telefono = document.getElementById("telefono").value;

    if (telefono.length < 10) {
        alert("El teléfono debe tener al menos 10 dígitos.");
        return false;
    }
    alert("Información guardada correctamente para " + nombre);
    return true;
}

// Reservas
function validarReserva() {
    if (!verificarSesion()) return false;

    let fecha = document.getElementById("fecha").value;
    let hora = document.getElementById("hora").value;
    let personas = document.getElementById("personas").value;

    if (fecha === "" || hora === "" || personas === "") {
        alert("Debe completar todos los campos de la reserva.");
        return false;
    }

    alert("Reserva registrada correctamente.");
    return true;
}

// Reseñas
function validarReseña() {
    if (!verificarSesion()) return false;

    let nombre = document.getElementById("nombreReseña").value;
    let comentario = document.getElementById("comentario").value;
    let calificacion = document.getElementById("calificacion").value;

    if (nombre === "" || comentario === "" || calificacion === "") {
        alert("Por favor complete todos los campos de la reseña.");
        return false;
    }

    alert("Reseña enviada correctamente. ¡Gracias por tu opinión!");
    return true;
}

// =====================
// FUNCIONES DE APOYO
// =====================

// Verifica si el usuario ha iniciado sesión
function verificarSesion() {
    let usuarioActivo = localStorage.getItem("usuarioActivo");
    if (!usuarioActivo) {
        alert("Debe iniciar sesión para realizar esta acción.");
        window.location.href = "login.html";
        return false;
    }
    return true;
}

// Mostrar mensaje de error debajo de un campo
function mostrarError(id, mensaje) {
    document.getElementById(id).textContent = mensaje;
    document.getElementById(id).style.color = "red";
}

// Limpiar mensaje de error
function limpiarError(id) {
    document.getElementById(id).textContent = "";
}

// Mostrar fuerza de contraseña
function medirFuerzaContrasena() {
    let pass = document.getElementById("pass1").value;
    let mensaje = document.getElementById("fuerzaPass");

    if (pass.length === 0) {
        mensaje.textContent = "";
        return;
    }

    let fuerza = 0;
    if (pass.length >= 8) fuerza++;
    if (/[A-Z]/.test(pass)) fuerza++;
    if (/[0-9]/.test(pass)) fuerza++;
    if (/[^A-Za-z0-9]/.test(pass)) fuerza++;

    let texto = "";
    switch (fuerza) {
        case 1: texto = "Débil"; mensaje.style.color = "red"; break;
        case 2: texto = "Media"; mensaje.style.color = "orange"; break;
        case 3: texto = "Fuerte"; mensaje.style.color = "green"; break;
        case 4: texto = "Muy fuerte"; mensaje.style.color = "darkgreen"; break;
    }
    mensaje.textContent = "Seguridad: " + texto;
}




