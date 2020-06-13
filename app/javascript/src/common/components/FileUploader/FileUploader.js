import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box } from "@common/ui";

const ACCEPTED_FILES = ["image/*"];

const FileUploader = ({ handleUpload, multiple, uploading = false }) => {
  const onDropAccepted = useCallback((acceptedFiles) => {
    let files = new Array();

    acceptedFiles.forEach((file, index) => {
      file.preview = URL.createObjectURL(file);
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

  return (
    <Box pointerEvents={uploading ? "none" : ""} my="4" {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta los archivos aqui...</p>
      ) : (
        <p>Arrastra los archivos aqui, o clickea para seleccionar</p>
      )}
    </Box>
  );
};

export default FileUploader;
