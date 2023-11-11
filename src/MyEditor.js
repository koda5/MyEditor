import React, { useState, useEffect } from "react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "./App.css";

const MyEditor = ({ record }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  //use efect kako se koristi

  useEffect(() => {
    if (record && record.vaText) {
      setTextInEditor(record.vaText);
    }
  }, [record]);

  const setTextInEditor = (htmlText) => {
    const contentState = convertFromHTML(htmlText);
    const state = ContentState.createFromBlockArray(contentState.contentBlocks);
    const newEditorState = EditorState.createWithContent(state);
    setEditorState(newEditorState);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          options: ["inline", "blockType"],
        }}
      />
    </div>
  );
};

export default MyEditor;
