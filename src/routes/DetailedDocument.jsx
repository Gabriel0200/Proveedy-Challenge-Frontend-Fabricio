import { useState, useEffect } from "react";
import { Global } from "../components/Global";
import {
  BsBoxArrowUpRight,
  BsGlobe,
  BsCardList,
  BsChatRight,
} from "react-icons/bs";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { fetchData } from "../fetchData";

export const DetailedDocument = ({ url_base, token }) => {
  const { uuid } = useParams(); // Obtener el parámetro 'uuid' desde la URL
  const [documentData, setDocumentData] = useState(null);
  const [clipData, setClipData] = useState(null);
  const [showGlobal, setShowGlobal] = useState(false); // Estado para mostrar/ocultar el componente Global

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const responseData = await fetchData(`${url_base}?uuid=${uuid}`, token);
        const jsonData = JSON.parse(responseData).document;
        const jsonClip = JSON.parse(responseData).clips; // Corregir aquí
        setClipData(jsonClip);
        setDocumentData(jsonData);
      } catch (error) {
        console.error("Error al consumir la API: ", error);
      }
    };

    fetchDataAsync();
  }, [url_base, token, uuid]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}/${month}/${day}, ${hours}:${minutes}:${seconds}`;
  };

  // Renderizar un mensaje de carga mientras se obtienen los datos
  if (!documentData) {
    return <div>Cargando...</div>;
  }

  // Renderizar los datos del documento
  return (
    <main>
      <section>
        <h2>
          {documentData.title} | {formatDate(documentData.updated_at)}
          <a
            target="_blank"
            rel="noreferrer"
            href={documentData.location_cloudfront}
          >
            ver archivo <BsBoxArrowUpRight />
          </a>
        </h2>
      </section>
      <section>
        <div className="">
          <button onClick={() => setShowGlobal(true)}>
            <BsGlobe /> Global
          </button>
          <button>
            <BsCardList /> Temas
          </button>
          <button>
            <BsChatRight /> Chat
          </button>
        </div>
      </section>
      {/* Mostrar el componente Global si showGlobal es true */}
      {showGlobal && <Global documentData={documentData} clipData={clipData} />}
    </main>
  );
};

// Definición de propTypes para el componente DetailedDocument
DetailedDocument.propTypes = {
  url_base: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  uuid: PropTypes.string,
};
