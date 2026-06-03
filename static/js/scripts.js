document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('activo');
    });

    const btnTema = document.getElementById('btn-tema');
    const html = document.documentElement;
    btnTema.addEventListener('click', () => {
        const temaActual = html.getAttribute('data-theme');
        if (temaActual === 'light') {
            html.setAttribute('data-theme', 'dark');
            btnTema.textContent = 'Claro';
        } else {
            html.setAttribute('data-theme', 'light');
            btnTema.textContent = 'Oscuro';
        }
    });

    const btnEnviar = document.getElementById('btn-enviar');
    btnEnviar.addEventListener('click', () => {
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        const respuesta = document.getElementById('respuesta-servidor');

        if (!nombre || !email || !mensaje) {
            respuesta.innerHTML = '<p class="error">Por favor completa todos los campos.</p>';
            return;
        }

        btnEnviar.textContent = 'Enviando...';
        btnEnviar.disabled = true;

        fetch('/api/contacto', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, mensaje })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                respuesta.innerHTML = `<p class="exito">${data.mensaje}</p>`;
                document.getElementById('nombre').value = '';
                document.getElementById('email').value = '';
                document.getElementById('mensaje').value = '';
            } else {
                respuesta.innerHTML = `<p class="error">${data.mensaje}</p>`;
            }
            btnEnviar.textContent = 'Enviar mensaje';
            btnEnviar.disabled = false;
        });
    });

    const btnVolver = document.getElementById('btn-volver-arriba');
    window.addEventListener('scroll', () => {
        btnVolver.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
    btnVolver.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('activo');
        });
    });
});