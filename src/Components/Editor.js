import React from "react";

import { CKEditor } from "@ckeditor/ckeditor5-react";

// NOTE: Use the editor from source (not a build)!
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";

import InlineEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Strikethrough from "@ckeditor/ckeditor5-basic-styles/src/strikethrough";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote";
import Link from "@ckeditor/ckeditor5-link/src/link";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Heading from "@ckeditor/ckeditor5-heading/src/heading";
import Font from "@ckeditor/ckeditor5-font/src/font";
import Image from "@ckeditor/ckeditor5-image/src/image";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption";
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize'
import ImageResizeEditing from "@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting";
import ImageResizeHandles from "@ckeditor/ckeditor5-image/src/imageresize/imageresizehandles";
import List from "@ckeditor/ckeditor5-list/src/list";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";

import styled from "styled-components";

const editorConfiguration = {
  plugins: [
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Heading,
    Underline,
    Strikethrough,
    BlockQuote,
    Link,
    MediaEmbed,
    PasteFromOffice,
    Font,
    Image,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImageCaption,
    ImageResize,
    ImageResizeEditing,
    ImageResizeHandles,
    List,
    Alignment,
    Table,
    TableToolbar,
    TextTransformation,
    Indent,
    IndentBlock,
    Base64UploadAdapter,
    InlineEditor,
  ],
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "|",
    "fontSize",
    "|",
    "bulletedList",
    "numberedList",
    "|",
    "alignment:left",
    "alignment:right",
    "alignment:center",
    "alignment:justify",
    "|",
    "blockQuote",
    "|",
    "insertTable",
    "|",
    'resizeImage',
    "imageUpload",
    "toggleImageCaption",
    "|",
    "link",
    "mediaEmbed",
  ],
  heading: {
    options: [
      {
        model: "paragraph",
        view: "p",
        title: "본문",
        class: "ck-heading_paragraph",
      },
      {
        model: "heading1",
        view: "h1",
        title: "헤더1",
        class: "ck-heading_heading1",
      },
      {
        model: "heading2",
        view: "h2",
        title: "헤더2",
        class: "ck-heading_heading2",
      },
      {
        model: "heading3",
        view: "h3",
        title: "헤더3",
        class: "ck-heading_heading3",
      },
    ],
  },
  fontSize: {
    options: [9, 10, 11, 12, 13, 14, 15, 16, 20, 24, 28],
  },
  alignment: {
    options: ["justify", "left", "center", "right"],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  image: {
    resizeUnit: "px",
    toolbar: [
      "imageStyle:alignLeft",
      "imageStyle:full",
      "imageStyle:alignRight",
      "|",
      "imageTextAlternative",
    ],
    styles: [
      "full",
      "alignLeft",
      "alignRight",
      "align-block-left",
      "align-block-right",
      "block",
    ],
  },
  resizeOptions: [
    {
      name: "resizeImage:original",
      value: null,
      label: "Original",
    },
    {
      name: "resizeImage:40",
      value: "40",
      label: "40%",
    },
    {
      name: "resizeImage:60",
      value: "60",
      label: "60%",
    },
  ],
  typing: {
    transformations: {
      remove: [
        "enDash",
        "emDash",
        "oneHalf",
        "oneThird",
        "twoThirds",
        "oneForth",
        "threeQuarters",
      ],
    },
  },
  placeholder: "본문을 입력하세요.",
};
function Editor() {
  /*data props에 나중에 데이터 불러와서 넣으면 됨.
   */
  return (
    <CustomCKEditor>
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
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
    </CustomCKEditor>
  );
}

const CustomCKEditor = styled.div`
  width: 100%;
`;
export default Editor;
