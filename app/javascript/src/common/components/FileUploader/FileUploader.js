import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Image, Flex, Text } from "@common/ui";
import reportIcon from "@images/icons/report.svg";
import { ReactSVG } from "react-svg";

const ACCEPTED_FILES = ["image/*"];

const FileUploader = ({
  handleUpload,
  multiple,
  uploading = false,
  accept = ACCEPTED_FILES,
  setFilesSelected,
  hideSelectorOnPreview = false,
}) => {
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
        if (index === acceptedFiles.length - 1 && handleUpload) handleUpload(files);
      };
    });
    setPreviews(acceptedFiles.map((file) => [file.type, file.name, URL.createObjectURL(file)]));
    if (setFilesSelected) setFilesSelected(acceptedFiles.length > 0);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    multiple,
    accept: accept,
  });

  return (
    <>
      {hideSelectorOnPreview && previews.length > 0 ? (
        <></>
      ) : (
        <Box pointerEvents={uploading ? "none" : ""} {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          {isDragActive ? <p>Suelta el archivo aqui...</p> : <p>Arrastra el archivo aqui, o clickea para seleccionar</p>}
        </Box>
      )}

      {previews.length > 0 &&
        previews.map(([type, name, preview], index) => {
          return (
            <Flex key={index}>
              {type.startsWith("application") ? (
                <>
                  <Box width="50px" m="2">
                    <ReactSVG src={reportIcon} />
                    <Text textAlign="center" fontSize="xs">
                      {name}
                    </Text>
                  </Box>
                </>
              ) : (
                <Image size="100px" objectFit="contain" src={preview} />
              )}
            </Flex>
          );
        })}
    </>
  );
};

export default FileUploader;
