import React, { useState, useEffect } from "react";
import { Box, Button, Heading, Text, Flex, Image, Icon } from "@common/ui";
import FileUploader from "@common/components/FileUploader";
import { update, find } from "@features/reports/reportsSlice";
import { useDispatch, useSelector } from "react-redux";
import { currentReport } from "@features/reports/selectors";
import reportZeroState from "@images/reportZeroState";
import reportIcon from "@images/icons/report.svg";
import { ReactSVG } from "react-svg";
import AlertWithIcon from "@common/components/AlertWithIcon";
import strings from "@common/strings";

const ACCEPTED_FILES = ["application/*"];

const Reports = () => {
  const dispatch = useDispatch();
  const [report, setReport] = useState(null);
  const [submiting, setSubmitting] = useState(null);
  const [success, setSuccess] = useState(false);
  const [filesSelected, setFilesSelected] = useState(false);
  const clubReport = useSelector((state) => currentReport(state));

  const handleUpload = (files) => {
    setReport(files[0]);
  };

  useEffect(() => {
    dispatch(find());
  }, []);

  const handleSubmit = async () => {
    let values = {};
    setSubmitting(true);
    if (report) values.report = report;
    await dispatch(update(values));
    setSubmitting(false);
    setSuccess(true);
  };

  return (
    <>
      {success && (
        <AlertWithIcon status="success" variant="left-accent" mt="1">
          {strings.Reports.update.success}
        </AlertWithIcon>
      )}
      <Heading my="6">Informe de investigación</Heading>
      <Text>TODO: poner info sobre el informe :)</Text>
      {clubReport ? (
        <Box my="6">
          <Box width="100px" m="2">
            <ReactSVG src={reportIcon} />
            <Flex justify="center" mt="2">
              <a href={clubReport?.attributes?.file?.url} target="_blank">
                <Icon mx="2" name="external-link" />
              </a>
              <a
                href={clubReport?.attributes?.file?.url?.replace("/upload/", "/upload/fl_attachment/")}
                download={clubReport?.attributes?.name}
              >
                <Icon mx="2" name="download" />
              </a>
            </Flex>
            <Text textAlign="center" fontSize="xs">
              {clubReport?.attributes?.name}
            </Text>
          </Box>
        </Box>
      ) : (
        <Box position="relative">
          <Heading as="h4" size="md" position="absolute" left="50%" top="75%" transform="translate(-50%, -50%)">
            Todavía no hay ningún informe
          </Heading>
          <Image src={reportZeroState} width="700px" mx="auto" />
        </Box>
      )}

      <FileUploader
        setFilesSelected={setFilesSelected}
        handleUpload={handleUpload}
        multiple={false}
        uploading={submiting}
        accept={ACCEPTED_FILES}
      />
      <Button onClick={handleSubmit} mb="6" isLoading={submiting} isDisabled={!filesSelected}>
        Agregar
      </Button>
    </>
  );
};

export default Reports;