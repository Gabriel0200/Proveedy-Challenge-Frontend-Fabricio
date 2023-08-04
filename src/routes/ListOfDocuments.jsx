import { useState, useEffect } from "react";
import {
  BsChevronExpand,
  BsFiletypePdf,
  BsFiletypeMp3,
  BsFillEyeFill,
} from "react-icons/bs";
import { NavLink } from "../components/NavLink";
import { fetchData } from "../fetchData";
import PropTypes from "prop-types";

export const ListOfDocuments = ({ url_base, token }) => {
  //** UseState
  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState(""); // Campo de ordenamiento actual
  const [sortDirection, setSortDirection] = useState("asc"); // Dirección del orden (ascendente o descendente)
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda por título
  const [currentPage, setCurrentPage] = useState(1); // Página actual

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const responseData = await fetchData(url_base, token);
        const jsonData = JSON.parse(responseData);
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, [url_base, token]);

  const handleSort = (field) => {
    // Si el campo de ordenamiento es el mismo, cambia la dirección del orden
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Si el campo de ordenamiento es diferente, establece el nuevo campo y la dirección del orden en asc
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Función para comparar los valores de los campos de ordenamiento
  const compareValues = (a, b) => {
    if (a < b) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (a > b) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
  };

  const formatSizeToKB = (bytes) => {
    return parseInt(bytes / 1024); // Redondear al número entero más cercano
  };

  // Filtrar los documentos por título
  let filteredItems = data;
  if (searchTerm.trim() !== "") {
    filteredItems = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Ordena la lista de elementos filtrados según el campo de ordenamiento y la dirección del orden
  if (sortField) {
    filteredItems.sort((a, b) => {
      return compareValues(a[sortField], b[sortField]);
    });
  }

  // Cálculo de la paginación
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(filteredItems.length, startIndex + itemsPerPage);
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Función para cambiar de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generar los números de página
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };
  return (
    <main>
      <section>
        <div>
          {/* Selector para la cantidad de elementos por página */}
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            {[5, 10, 22].map((value) => (
              <option key={value} value={value}>
                Mostrar {value} documentos
              </option>
            ))}
          </select>
        </div>
        {/* Buscador */}
        <div>
          <input
            type="text"
            placeholder="Buscar por título"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>
      <table>
        <thead>
          <tr>
            <th>
              ID <BsChevronExpand onClick={() => handleSort("id")} />
            </th>
            <th>
              SUBIDO
              <BsChevronExpand onClick={() => handleSort("updated_at")} />
            </th>
            <th>
              TITULO
              <BsChevronExpand onClick={() => handleSort("title")} />
            </th>
            <th>
              TAMAÑO
              <BsChevronExpand onClick={() => handleSort("size")} />
            </th>
            <th>
              TIPO
              <BsChevronExpand onClick={() => handleSort("extension")} />
            </th>
            <th>
              Estado <BsChevronExpand />
            </th>
            <th>
              Ícono <BsChevronExpand />
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.uuid}>
              <td>{item.id}</td>
              <td>{formatDate(item.updated_at)}</td>
              <td>{item.title}</td>
              <td>{formatSizeToKB(item.size)} KB</td>
              <td>
                {item.extension === "pdf" ? (
                  <BsFiletypePdf />
                ) : (
                  <BsFiletypeMp3 />
                )}
              </td>
              <td>{item.processed ? "PROCESADO" : "PENDIENTE"}</td>
              <td>
                <NavLink to={item.uuid}>
                  <BsFillEyeFill />
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Paginación */}
      <div>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
      </div>
    </main>
  );
};

// Definición de propTypes para el componente ListOfDocuments
ListOfDocuments.propTypes = {
  url_base: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};
