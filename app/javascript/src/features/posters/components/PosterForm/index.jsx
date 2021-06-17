import React from "react";
import { RichTextEditor } from "@common/components/RichTextEditor";
import { Flex, Box, Heading, Input, Skeleton } from "@common/ui";
import {
  TITLE,
  ABSTRACT,
  INTRODUCTION,
  METHODOLOGY,
  RESULTS,
  CONCLUSIONS,
  BIBLIOGRAPHY,
  ACKNOWLEDGMENTS,
} from "@app/constants";
import strings from "@common/strings";

const PosterForm = ({ editorInternalState, setEditorInternalState, loading }) => {
  return (
    <>
      {loading ? (
        <div>
          <Skeleton height="80px" my="10px" />
          <Skeleton height="200px" my="10px" />
          <Skeleton height="200px" my="10px" />
          <Skeleton height="200px" my="10px" />
          <Skeleton height="200px" my="10px" />
          <Skeleton height="200px" my="10px" />
        </div>
      ) : (
        <Box w="100%">
          <Heading m="2">{strings.Poster.sections.title}</Heading>
          <Input
            w="99%"
            fontSize="2.5rem"
            py="8"
            m="2"
            value={editorInternalState[TITLE]}
            onChange={(e) => setEditorInternalState({ title: e.target.value })}
          />
          <Flex>
            <Flex direction="column" w="33.3%">
              <Box>
                <Heading m="2">{strings.Poster.sections.abstract}</Heading>
                <RichTextEditor
                  prevContent={editorInternalState[ABSTRACT]}
                  setEditorInternalState={setEditorInternalState}
                  boxShadow="md"
                  m="2"
                  sectionName={ABSTRACT}
                />
              </Box>
              <Box>
                <Heading m="2">{strings.Poster.sections.introduction}</Heading>
                <RichTextEditor
                  prevContent={editorInternalState[INTRODUCTION]}
                  setEditorInternalState={setEditorInternalState}
                  boxShadow="md"
                  m="2"
                  sectionName={INTRODUCTION}
                />
              </Box>
              <Box>
                <Heading m="2">{strings.Poster.sections.methodology}</Heading>
                <RichTextEditor
                  prevContent={editorInternalState[METHODOLOGY]}
                  setEditorInternalState={setEditorInternalState}
                  boxShadow="md"
                  m="2"
                  sectionName={METHODOLOGY}
                />
              </Box>
            </Flex>
            <Flex direction="column" w="33.3%">
              <Box height="99%">
                <Heading m="2">{strings.Poster.sections.results}</Heading>
                <RichTextEditor
                  prevContent={editorInternalState[RESULTS]}
                  setEditorInternalState={setEditorInternalState}
                  boxShadow="md"
                  m="2"
                  sectionName={RESULTS}
                  height="92%"
                />
              </Box>
            </Flex>
            <Flex direction="column" w="33.3%">
              <Box>
                <Heading m="2">{strings.Poster.sections.conclusions}</Heading>
                <RichTextEditor
                  prevContent={editorInternalState[CONCLUSIONS]}
                  setEditorInternalState={setEditorInternalState}
                  boxShadow="md"
                  m="2"
                  sectionName={CONCLUSIONS}
                />
              </Box>
              <Box>
                <Heading m="2">{strings.Poster.sections.bibliography}</Heading>
                <RichTextEditor
                  prevContent={editorInternalState[BIBLIOGRAPHY]}
                  setEditorInternalState={setEditorInternalState}
                  boxShadow="md"
                  m="2"
                  sectionName={BIBLIOGRAPHY}
                />
              </Box>
              <Box>
                <Heading m="2">{strings.Poster.sections.acknowledgments}</Heading>
                <RichTextEditor
                  prevContent={editorInternalState[ACKNOWLEDGMENTS]}
                  setEditorInternalState={setEditorInternalState}
                  boxShadow="md"
                  m="2"
                  sectionName={ACKNOWLEDGMENTS}
                />
              </Box>
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default PosterForm;
