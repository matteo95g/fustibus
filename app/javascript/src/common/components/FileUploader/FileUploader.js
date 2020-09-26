import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Image, Flex } from "@common/ui";

const ACCEPTED_FILES = ["image/*"];

const FileUploader = ({ handleUpload, multiple, uploading = false }) => {
  const [previews, setPreviews] = useState([]);

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
          result: reader.result,
        };

        files.push(fileToUpload);
        if (index === acceptedFiles.length - 1) handleUpload(files);
      };
    });
    setPreviews(acceptedFiles.map((file) => URL.createObjectURL(file)));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    multiple,
    accept: ACCEPTED_FILES,
  });

  return (
    <>
      <Box pointerEvents={uploading ? "none" : ""} my="4" {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Suelta el archivo aqui...</p> : <p>Arrastra el archivo aqui, o clickea para seleccionar</p>}
      </Box>
      {previews.length > 0 &&
        previews.map((preview, index) => (
          <Flex my="3" key={index}>
            <Image size="100px" objectFit="contain" src={preview} />
          </Flex>
        ))}
    </>
  );
};

export default FileUploader;
