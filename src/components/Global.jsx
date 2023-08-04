import PropTypes from "prop-types";

export const Global = ({ documentData, clipData }) => {
  return (
    <>
      <section>
        <div className="">
          <h3>Palabras Claves (Keywords)</h3>
          <div className="">
            <span> {documentData.keywords} </span>
          </div>
        </div>
        <div className="">
          <h3>Resumen (summary)</h3>
          <div className="">
            <p>{documentData.summary}</p>
          </div>
        </div>
        <div className="">
          <h3>Resumen (summary)</h3>
          <div className="">
            <p>{documentData.keypoints}</p>
          </div>
        </div>
        <div className="">
          <h3>Transcripción (transcription)</h3>
          <div className="">
            {clipData.map((item, index) => (
              <p key={index}>{item.lyrics}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// Definición de propTypes para el componente Global
Global.propTypes = {
  documentData: PropTypes.object.isRequired,
  clipData: PropTypes.array.isRequired,
};
