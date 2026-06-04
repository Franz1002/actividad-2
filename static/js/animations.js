document.addEventListener('DOMContentLoaded', () => {

    fetch('/api/skills')
        .then(res => res.json())
        .then(skills => {
            const lista = document.getElementById('habilidades-lista');
            lista.innerHTML = '';
            skills.forEach(skill => {
                lista.innerHTML += `
                    <div class="habilidad-item" data-categoria="${getCategoria(skill.nombre)}">
                        <div class="habilidad-header">
                            <span class="habilidad-nombre">${skill.nombre}</span>
                            <span class="habilidad-nivel">${skill.nivel}%</span>
                        </div>
                        <div class="barra-fondo">
                            <div class="barra-progreso" data-nivel="${skill.nivel}"></div>
                        </div>
                    </div>`;
            });
            animarBarras();
            configurarFiltrosHabilidades();
        });

    fetch('/api/projects')
        .then(res => res.json())
        .then(projects => {
            const grid = document.getElementById('proyectos-grid');
            grid.innerHTML = '';
            projects.forEach(proyecto => {
                const tags = proyecto.tecnologias.map(t => `<span>${t}</span>`).join('');
                grid.innerHTML += `
                    <div class="card" data-tecnologias="${proyecto.tecnologias.join(',')}">
                        <h3>${proyecto.titulo}</h3>
                        <p>${proyecto.descripcion}</p>
                        <div class="tags">${tags}</div>
                        <div class="card-detalles" id="detalles-${proyecto.id}">${proyecto.detalles}</div>
                        <button class="btn-ver-mas" onclick="toggleDetalles(${proyecto.id})">Ver más</button>
                    </div>`;
            });
            configurarFiltrosProyectos();
        });
});

function getCategoria(nombre) {
    const categorias = {
        'HTML': 'frontend', 'CSS': 'frontend', 'JavaScript': 'frontend',
        'Laravel': 'backend', 'PHP': 'backend', 'Java': 'backend', 'Python': 'backend',
        'MySQL': 'base-datos', 'PostgreSQL': 'base-datos', 'SQL Server': 'base-datos',
        'Git': 'herramientas'
    };
    return categorias[nombre] || 'herramientas';
}

function animarBarras() {
    document.querySelectorAll('.barra-progreso').forEach(barra => {
        setTimeout(() => {
            barra.style.width = barra.dataset.nivel + '%';
        }, 300);
    });
}

function toggleDetalles(id) {
    const detalles = document.getElementById(`detalles-${id}`);
    const btn = detalles.nextElementSibling;
    detalles.classList.toggle('visible');
    btn.textContent = detalles.classList.contains('visible') ? 'Ver menos' : 'Ver más';
}

function configurarFiltrosHabilidades() {
    document.querySelectorAll('.filtros-habilidades .filtro-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filtros-habilidades .filtro-btn').forEach(b => b.classList.remove('activo'));
            btn.classList.add('activo');
            const filtro = btn.dataset.filtro;
            document.querySelectorAll('.habilidad-item').forEach(item => {
                item.style.display = filtro === 'todos' || item.dataset.categoria === filtro ? 'block' : 'none';
            });
        });
    });
}

function configurarFiltrosProyectos() {
    document.querySelectorAll('.filtros-proyectos .filtro-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filtros-proyectos .filtro-btn').forEach(b => b.classList.remove('activo'));
            btn.classList.add('activo');
            const filtro = btn.dataset.filtro;
            document.querySelectorAll('.card').forEach(card => {
                card.style.display = filtro === 'todos' || card.dataset.tecnologias.includes(filtro) ? 'block' : 'none';
            });
        });
    });
}