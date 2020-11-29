import React from "react";
import styled from "styled-components";

import {
  Editor,
  CompositeDecorator,
  EditorState,
  RichUtils,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

const Styles = styled.div`
  border-radius: 4px;
  border: 1px solid #ccc;
  position: "relative";
`;

const Tool = styled.div``;

const MyEditor = () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty(
      new CompositeDecorator([
        {
          strategy: (contentBlock, callback, contentState) => {
            contentBlock.findEntityRanges((character) => {
              const entityKey = character.getEntity();
              return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === "LINK"
              );
            }, callback);
          },
          component: (props) => {
            const { url } = props.contentState
              .getEntity(props.entityKey)
              .getData();
            return <a href={url}>{props.children}</a>;
          },
        },
      ])
    )
  );

  const handleKeyCommand = (command, editor) => {
    const newState = RichUtils.handleKeyCommand(editor, command);
    if (newState) {
      setEditorState(newState);
      return;
    }
  };
  const addLinkEntity = (url) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    setEditorState(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );
  };
  const getLinkEntity = () => {
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return;
    }
    const currentState = editorState.getCurrentContent();
    const startKey = selection.getStartKey();
    const startOffset = selection.getStartOffset();
    console.log("startKey", startKey);
    console.log("startOffset", startOffset);
    const blockKey = currentState.getBlockForKey(startKey);
    const linkKey = blockKey.getEntityAt(startOffset);
    let url = "";
    if (linkKey) {
      const instance = currentState.getEntity(linkKey);
      url = instance.getData().url;
    }
    return url;
  };
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [editorState]);
  console.log("ediotor", convertToRaw(editorState.getCurrentContent()));
  return (
    <Styles>
      {show && (
        <Tool
          style={{
            position: "absolute",
            zIndex: 12,
          }}
        >
          <button>insert link</button>
          <button>insert persion</button>
          <button>insert tag</button>
        </Tool>
      )}
      <Editor
        editorState={editorState}
        onChange={(data) => {
          console.log("data", data);
          setEditorState(data);
        }}
        handleKeyCommand={handleKeyCommand}
      />
      <button
        onClick={() =>
          setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"))
        }
      >
        Bold
      </button>
      <button
        onClick={() =>
          setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"))
        }
      >
        Italic
      </button>
      <button
        onClick={() =>
          setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"))
        }
      >
        Underline
      </button>
      <button
        onClick={() =>
          setEditorState(RichUtils.toggleInlineStyle(editorState, "LINE"))
        }
      >
        New Style
      </button>
      <button
        onClick={() => {
          const oldLink = getLinkEntity();
          let link = prompt("url", oldLink);
          console.log("linkGet", oldLink);
          addLinkEntity(link);
        }}
      >
        addLink
      </button>
      <button
        onClick={() => {
          const selection = editorState.getSelection();
          if (!selection.isCollapsed()) {
            setEditorState(RichUtils.toggleLink(editorState, selection, null));
          }
        }}
      >
        addLink
      </button>
    </Styles>
  );
};

export default MyEditor;
