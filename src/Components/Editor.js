import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styled from "styled-components";

import Font from "@ckeditor/ckeditor5-font/src/font";

function Editor() {
  const config = {
    language: "ko",
    plugins: [Font ],
    toolbar:["fontSize"]
  };
  return (
    <>
      <CustomCKEditor
        editor={ClassicEditor}
        config={config}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </>
  );
}

const CustomCKEditor = styled(CKEditor)`
  .ck-editor {
    width: 100%;
  }
  .ck-editor__editable {
    height: 50rem;
  }
`;

export default Editor;
