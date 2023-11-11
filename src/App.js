import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./App.css";
import MyEditor from "./MyEditor";

const RecordDefault = {
  vaText:
    "<p>Ova e bold <strong>boldirano</strong>, a ova e <i>italizirano</i>.</p></br> <p>A ova e nov red<p/>",
};

function App() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  return (
    <div className="App">
      <header className="App-header">Rich Text Editor Example</header>

      <MyEditor record={RecordDefault} />
      <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}
      ></div>
    </div>
  );
}

export default App;
