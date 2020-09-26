import React from "react";
import { EditorState, ContentState, RichUtils, convertToRaw, AtomicBlockUtils } from "draft-js";
import Editor from "draft-js-plugins-editor";
import createImagePlugin from "draft-js-image-plugin";
import "draft-js/dist/Draft.css";
import { Box, Button } from "@common/ui";
import FileUploader from "@common/components/FileUploader";
import Modal from "@common/components/Modal";

const imagePlugin = createImagePlugin();

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);

    const { sectionName, setEditorInternalState, prevContent } = this.props;

    const content = prevContent ? prevContent : ContentState.createFromText("");

    this.state = { editorState: EditorState.createWithContent(content), isOpen: false, files: [] };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => {
      this.setState({ editorState });
      if (sectionName && setEditorInternalState) {
        const contentRaw = convertToRaw(editorState.getCurrentContent());
        setEditorInternalState({ [sectionName]: JSON.stringify(contentRaw) });
      }
    };

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.onTab = (e) => this._onTab(e);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  insertImage = (editorState, base64) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity("IMAGE", "IMMUTABLE", { src: base64 });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
  };

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }

  render() {
    const { editorState, isOpen } = this.state;
    const { hideControlls } = this.props;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();

    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }

    const handleUpload = (files) => {
      this.setState({ files: files.map((file) => file.result) });
    };

    const addFiles = () => {
      this.state.files.forEach((file) => {
        const newEditorState = this.insertImage(this.state.editorState, file);
        this.setState({ editorState: newEditorState });
      });

      this.setState({ isOpen: false });
    };

    const openCloseModal = (show) => {
      this.setState({ isOpen: show });
    };

    return (
      <Box className="RichEditor-root" {...this.props}>
        {!hideControlls && (
          <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType} openCloseModal={openCloseModal} />
        )}
        {!hideControlls && <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} />}
        <div className={className} onClick={this.focus} id={`poster-${this.props.sectionName}`}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            ref="editor"
            spellCheck={true}
            plugins={[imagePlugin]}
          />
          <Modal isOpen={isOpen} onClose={() => openCloseModal(false)}>
            <Box pt="5">
              <FileUploader handleUpload={handleUpload} multiple={false} uploading={false} />
              <Button onClick={addFiles}>Listo</Button>
            </Box>
          </Modal>
        </div>
      </Box>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 12,
    padding: 2,
  },
};

const getBlockStyle = (block) => {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
};

const StyleButton = ({ active, style, label, onToggle }) => {
  const handleOnToggle = (e) => {
    e.preventDefault();
    onToggle(style);
  };

  let className = "RichEditor-styleButton";
  if (active) {
    className += " RichEditor-activeButton";
  }

  return (
    <span className={className} onMouseDown={handleOnToggle}>
      {label}
    </span>
  );
};

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Cita", style: "blockquote" },
];

const BlockStyleControls = (props) => {
  const { editorState, openCloseModal } = props;
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
      <StyleButton key={"image"} label={"Imagen"} onToggle={() => openCloseModal(true)} />
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export { RichTextEditor };
