const formulario = document.getElementById('formulario');
const tabla = document.getElementById('tabla');

    // Verifica si hay un usuario logueado
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) {
      window.location.href = 'login.html'; // ✅ Redirige al login si no hay sesión
    } else {
      document.getElementById('usuarioNombre').textContent = `Usuario: ${usuario.username}`;
    }

    function cerrarSesion() {
      localStorage.removeItem('usuario');
      window.location.href = 'index.html';
    }

    async function cargarProductos() {
      const res = await fetch('/api/productos');
      const data = await res.json();
      tabla.innerHTML = '';
      data.forEach(p => {
        tabla.innerHTML += `
          <tr class="text-center">
            <td class="border px-4 py-2">${p.id}</td>
            <td class="border px-4 py-2">${p.nombre}</td>
            <td class="border px-4 py-2">${p.cantidad}</td>
            <td class="border px-4 py-2">${p.precio}</td>
            <td class="border px-4 py-2 space-x-2">
              <button onclick="editarProducto(${p.id}, '${p.nombre}', ${p.cantidad}, ${p.precio})" class="bg-yellow-400 text-white px-2 py-1 rounded">Editar</button>
              <button onclick="eliminarProducto(${p.id})" class="bg-red-600 text-white px-2 py-1 rounded">Eliminar</button>
            </td>
          </tr>
        `;
      });
    }

    formulario.addEventListener('submit', async e => {
      e.preventDefault();
      const id = document.getElementById('producto-id').value;
      const producto = {
        nombre: document.getElementById('nombre').value,
        cantidad: document.getElementById('cantidad').value,
        precio: document.getElementById('precio').value
      };
    
      try {
        if (id) {
          // Actualizar producto
          const res = await fetch(`/api/productos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
          });
          if (res.ok) {
            Swal.fire('Actualizado', 'Producto actualizado con éxito', 'success');
          }
        } else {
          // Agregar producto
          const res = await fetch('/api/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
          });
          if (res.ok) {
            Swal.fire('Agregado', 'Producto agregado con éxito', 'success');
          }
        }
    
        formulario.reset();
        document.getElementById('producto-id').value = '';
        cargarProductos();
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Algo salió mal', 'error');
      }
    });
    
    async function eliminarProducto(id) {
      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });
    
      if (confirmacion.isConfirmed) {
        try {
          const res = await fetch(`/api/productos/${id}`, { method: 'DELETE' });
          if (res.ok) {
            Swal.fire('Eliminado', 'Producto eliminado correctamente', 'success');
            cargarProductos();
          }
        } catch (err) {
          console.error(err);
          Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
        }
      }
    }

    cargarProductos();