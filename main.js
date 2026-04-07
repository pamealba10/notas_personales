// API URL (ajusta según tu backend)
const API_URL = 'http://localhost:3000/api/notas';

// Cargar notas al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarNotas();
    
    // Configurar el formulario
    const notaForm = document.getElementById('notaForm');
    notaForm.addEventListener('submit', agregarNota);
});

// Función para cargar todas las notas
async function cargarNotas() {
    const notesList = document.getElementById('notesList');
    
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Error al cargar las notas');
        }
        
        const notas = await response.json();
        mostrarNotas(notas);
    } catch (error) {
        console.error('Error:', error);
        notesList.innerHTML = `
            <div class="empty-state">
                <p>❌ Error al cargar las notas</p>
                <small>${error.message}</small>
            </div>
        `;
    }
}

// Función para mostrar notas en el DOM
function mostrarNotas(notas) {
    const notesList = document.getElementById('notesList');
    
    if (!notas || notas.length === 0) {
        notesList.innerHTML = `
            <div class="empty-state">
                <p>📭 No hay notas guardadas</p>
                <small>¡Crea tu primera nota usando el formulario!</small>
            </div>
        `;
        return;
    }
    
    notesList.innerHTML = notas.map(nota => `
        <div class="note-card" data-id="${nota.id}">
            <div class="note-title">📌 ${escapeHtml(nota.titulo)}</div>
            <div class="note-content">${escapeHtml(nota.contenido)}</div>
            <div class="note-actions">
                <button class="btn btn-danger" onclick="eliminarNota('${nota.id}')">
                    🗑️ Eliminar
                </button>
            </div>
        </div>
    `).join('');
}

// Función para agregar una nueva nota
async function agregarNota(event) {
    event.preventDefault();
    
    const titulo = document.getElementById('titulo').value;
    const contenido = document.getElementById('contenido').value;
    
    // Mostrar mensaje de carga
    mostrarMensaje('Agregando nota...', 'info');
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo, contenido })
        });
        
        if (!response.ok) {
            throw new Error('Error al agregar la nota');
        }
        
        // Limpiar formulario
        document.getElementById('titulo').value = '';
        document.getElementById('contenido').value = '';
        
        // Recargar notas
        await cargarNotas();
        
        mostrarMensaje('✅ Nota agregada con éxito', 'success');
        
        // Ocultar mensaje después de 3 segundos
        setTimeout(() => limpiarMensajes(), 3000);
        
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje(`❌ Error: ${error.message}`, 'error');
        setTimeout(() => limpiarMensajes(), 3000);
    }
}

// Función para eliminar una nota
async function eliminarNota(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
        return;
    }
    
    mostrarMensaje('Eliminando nota...', 'info');
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar la nota');
        }
        
        await cargarNotas();
        mostrarMensaje('✅ Nota eliminada con éxito', 'success');
        setTimeout(() => limpiarMensajes(), 3000);
        
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje(`❌ Error: ${error.message}`, 'error');
        setTimeout(() => limpiarMensajes(), 3000);
    }
}

// Función para mostrar mensajes temporales
function mostrarMensaje(mensaje, tipo) {
    limpiarMensajes();
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${tipo === 'error' ? 'error' : 'success'}`;
    alertDiv.textContent = mensaje;
    
    const formSection = document.querySelector('.form-section');
    formSection.insertBefore(alertDiv, formSection.firstChild);
}

function limpiarMensajes() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => alert.remove());
}

// Función de seguridad para evitar XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}