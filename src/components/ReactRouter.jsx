import { Routes, Route as ReactRoute } from "react-router-dom";
import { ListOfDocuments } from "../routes/ListOfDocuments";
import { DetailedDocument } from "../routes/DetailedDocument";
import { Layout } from "./Layout";

export const ReactRouter = () => {
  //** Datos constantes
  const url_base = "https://yachai.lat/documents/api/document/";
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxMTI1NzEyLCJpYXQiOjE2OTEwMzkzMTIsImp0aSI6ImViMTI5YmRkNWQ1YjRlNGE4Njg1OGIxNGMxZTE2ZGIyIiwidXNlcl9pZCI6MX0.NraH4u5vDpBTEO2Nhc78HX3D5lAgwxzZZt-v7xVUGcw";

  return (
    <Routes>
      <ReactRoute path="/" element={<Layout />}>
        <ReactRoute
          index
          element={<ListOfDocuments url_base={url_base} token={token} />}
        />
        <ReactRoute
          path="/:uuid"
          element={
            <DetailedDocument path="/id" url_base={url_base} token={token} />
          }
        />
      </ReactRoute>
    </Routes>
  );
};
