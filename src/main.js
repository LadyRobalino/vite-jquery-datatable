import './style.css';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';

const API_URL = "https://raw.githubusercontent.com/vega/vega/master/docs/data/cars.json"

async function cargarDatos() {
  try {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok) {
      throw new Error('Error al consumir la API');
    }

    const datos = await respuesta.json();

    new DataTable('#tabla-posts', {
      data: datos,
      columns: [
        { data: 'Name' },
        { data: 'Miles_per_Gallon' },
        { data: 'Year' },
        { data: 'Origin' }
      ],
      pageLength: 10,
      language: {
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ registros',
        info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
        paginate: {
          previous: 'Anterior',
          next: 'Siguiente'
        }
      }
    });
  } catch (error) {
    console.error(error);
    document.querySelector('#app').innerHTML += `
      <p class="error">No se pudieron cargar los datos.</p>
    `;
  }
}

cargarDatos();
