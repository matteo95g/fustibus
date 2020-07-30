import React, { useCallback, Fragment, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Image } from "@common/ui";

const ACCEPTED_FILES = ["image/*"];

const FileUploader = ({ handleUpload, multiple, uploading = false }) => {
  const [preview, setPreview] = useState(null);

  const onDropAccepted = useCallback((acceptedFiles) => {
    let files = new Array();

    acceptedFiles.forEach((file, index) => {
      file.preview = URL.createObjectURL(file);
      setPreview(file.preview);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64File = reader.result.split(",")[1];

        const fileToUpload = {
          id: file.preview,
          name: file.name,
          data: base64File,
          type: file.type,
          isPrimary: false,
          preview: file.preview,
        };

        files.push(fileToUpload);
        if (index === acceptedFiles.length - 1) handleUpload(files);
      };
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    multiple,
    accept: ACCEPTED_FILES,
  });

  useEffect(
    () => () => {
      URL.revokeObjectURL(preview);
    },
    [preview]
  );

  return (
    <Fragment>
      <Box pointerEvents={uploading ? "none" : ""} my="4" {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Suelta el archivo aqui...</p> : <p>Arrastra el archivo aqui, o clickea para seleccionar</p>}
      </Box>
      {preview && (
        <Box my="3">
          <Image size="100px" objectFit="contain" src={preview} />
        </Box>
      )}
    </Fragment>
  );
};

export default FileUploader;
