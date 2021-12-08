import React from "react";

import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
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
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize";
import ImageResizeEditing from "@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting";
import ImageResizeHandles from "@ckeditor/ckeditor5-image/src/imageresize/imageresizehandles";
import List from "@ckeditor/ckeditor5-list/src/list";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import Table from "@ckeditor/ckeditor5-table/src/table";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar";
import TableProperties from "@ckeditor/ckeditor5-table/src/tableproperties";
import TableCellProperties from "@ckeditor/ckeditor5-table/src/tablecellproperties";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation";
import Indent from "@ckeditor/ckeditor5-indent/src/indent";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";
import LinkImage from "@ckeditor/ckeditor5-link/src/linkimage";
import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline";
import ImageUploadEditing  from "@ckeditor/ckeditor5-image/src/imageupload/imageuploadediting";

import styled from "styled-components";

import FormData from 'form-data';
import { documentPastedImageApi } from "../Utils/api";

class CustomFigureAttributes {
  /**
   * Plugin's constructor - receives an editor instance on creation.
   */
  constructor( editor ) {
      // Save reference to the editor.
      this.editor = editor;
  }

  /**
   * Sets the conversion up and extends the table & image features schema.
   *
   * Schema extending must be done in the "afterInit()" call because plugins define their schema in "init()".
   */
  afterInit() {
      const editor = this.editor;

      // Define on which elements the CSS classes should be preserved:
      setupCustomClassConversion( 'img', 'imageBlock', editor );
      setupCustomClassConversion( 'img', 'imageInline', editor );
      setupCustomClassConversion( 'table', 'table', editor );

      editor.conversion.for( 'upcast' ).add( upcastCustomClasses( 'figure' ), { priority: 'low' } );

      // Define custom attributes that should be preserved.
      setupCustomAttributeConversion( 'img', 'imageBlock', 'id', editor );
      setupCustomAttributeConversion( 'img', 'imageInline', 'id', editor );
      setupCustomAttributeConversion( 'table', 'table', 'id', editor );
  }
}
function setupCustomClassConversion( viewElementName, modelElementName, editor ) {
  // The 'customClass' attribute stores custom classes from the data in the model so that schema definitions allow this attribute.
  editor.model.schema.extend( modelElementName, { allowAttributes: [ 'customClass' ] } );

  // Defines upcast converters for the <img> and <table> elements with a "low" priority so they are run after the default converters.
  editor.conversion.for( 'upcast' ).add( upcastCustomClasses( viewElementName ), { priority: 'low' } );

  // Defines downcast converters for a model element with a "low" priority so they are run after the default converters.
  // Use `downcastCustomClassesToFigure` if you want to keep your classes on <figure> element or `downcastCustomClassesToChild`
  // if you would like to keep your classes on a <figure> child element, i.e. <img>.
  editor.conversion.for( 'downcast' ).add( downcastCustomClassesToFigure( modelElementName ), { priority: 'low' } );
  // editor.conversion.for( 'downcast' ).add( downcastCustomClassesToChild( viewElementName, modelElementName ), { priority: 'low' } );
}

/**
* Sets up a conversion for a custom attribute on the view elements contained inside a <figure>.
*
* This method:
* - Adds proper schema rules.
* - Adds an upcast converter.
* - Adds a downcast converter.
*/
function setupCustomAttributeConversion( viewElementName, modelElementName, viewAttribute, editor ) {
  // Extends the schema to store an attribute in the model.
  const modelAttribute = `custom${ viewAttribute }`;

  editor.model.schema.extend( modelElementName, { allowAttributes: [ modelAttribute ] } );

  editor.conversion.for( 'upcast' ).add( upcastAttribute( viewElementName, viewAttribute, modelAttribute ) );
  editor.conversion.for( 'downcast' ).add( downcastAttribute( modelElementName, viewElementName, viewAttribute, modelAttribute ) );
}

/**
* Creates an upcast converter that will pass all classes from the view element to the model element.
*/
function upcastCustomClasses( elementName ) {
  return dispatcher => dispatcher.on( `element:${ elementName }`, ( evt, data, conversionApi ) => {
      const viewItem = data.viewItem;
      const modelRange = data.modelRange;

      const modelElement = modelRange && modelRange.start.nodeAfter;

      if ( !modelElement ) {
          return;
      }

      // The upcast conversion picks up classes from the base element and from the <figure> element so it should be extensible.
      const currentAttributeValue = modelElement.getAttribute( 'customClass' ) || [];

      currentAttributeValue.push( ...viewItem.getClassNames() );

      conversionApi.writer.setAttribute( 'customClass', currentAttributeValue, modelElement );
  } );
}

/**
* Creates a downcast converter that adds classes defined in the `customClass` attribute to a <figure> element.
*
* This converter expects that the view element is nested in a <figure> element.
*/
function downcastCustomClassesToFigure( modelElementName ) {
  return dispatcher => dispatcher.on( `insert:${ modelElementName }`, ( evt, data, conversionApi ) => {
      const modelElement = data.item;

      const viewFigure = conversionApi.mapper.toViewElement( modelElement );

      if ( !viewFigure ) {
          return;
      }

      // The code below assumes that classes are set on the <figure> element.
      conversionApi.writer.addClass( modelElement.getAttribute( 'customClass' ), viewFigure );
  } );
}

/**
* Creates a downcast converter that adds classes defined in the `customClass` attribute to a <figure> child element.
*
* This converter expects that the view element is nested in a <figure> element.
*/
function downcastCustomClassesToChild( viewElementName, modelElementName ) {
  return dispatcher => dispatcher.on( `insert:${ modelElementName }`, ( evt, data, conversionApi ) => {
      const modelElement = data.item;

      const viewFigure = conversionApi.mapper.toViewElement( modelElement );

      if ( !viewFigure ) {
          return;
      }

      // The code below assumes that classes are set on the element inside the <figure>.
      const viewElement = findViewChild( viewFigure, viewElementName, conversionApi );

      conversionApi.writer.addClass( modelElement.getAttribute( 'customClass' ), viewElement );
  } );
}

/**
* Helper method that searches for a given view element in all children of the model element.
*
* @param {module:engine/view/item~Item} viewElement
* @param {String} viewElementName
* @param {module:engine/conversion/downcastdispatcher~DowncastConversionApi} conversionApi
* @return {module:engine/view/item~Item}
*/
function findViewChild( viewElement, viewElementName, conversionApi ) {
  const viewChildren = Array.from( conversionApi.writer.createRangeIn( viewElement ).getItems() );

  return viewChildren.find( item => item.is( 'element', viewElementName ) );
}

/**
* Returns the custom attribute upcast converter.
*/
function upcastAttribute( viewElementName, viewAttribute, modelAttribute ) {
  return dispatcher => dispatcher.on( `element:${ viewElementName }`, ( evt, data, conversionApi ) => {
      const viewItem = data.viewItem;
      const modelRange = data.modelRange;

      const modelElement = modelRange && modelRange.start.nodeAfter;

      if ( !modelElement ) {
          return;
      }

      conversionApi.writer.setAttribute( modelAttribute, viewItem.getAttribute( viewAttribute ), modelElement );
  } );
}

/**
* Returns the custom attribute downcast converter.
*/
function downcastAttribute( modelElementName, viewElementName, viewAttribute, modelAttribute ) {
  return dispatcher => dispatcher.on( `insert:${ modelElementName }`, ( evt, data, conversionApi ) => {
      const modelElement = data.item;

      const viewFigure = conversionApi.mapper.toViewElement( modelElement );
      const viewElement = findViewChild( viewFigure, viewElementName, conversionApi );

      if ( !viewElement ) {
          return;
      }

      conversionApi.writer.setAttribute( viewAttribute, modelElement.getAttribute( modelAttribute ), viewElement );
  } );
}
const editorConfiguration = {
  plugins: [
    CustomFigureAttributes,
    ImageUploadEditing,
    PasteFromOffice,
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
    Font,
    Image,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImageCaption,
    ImageResize,
    ImageResizeEditing,
    ImageResizeHandles,
    LinkImage,
    List,
    Alignment,
    Table,
    TableToolbar,
    TextTransformation,
    TableProperties,
    TableCellProperties,
    Indent,
    IndentBlock,
    Base64UploadAdapter,
    InlineEditor,
    HorizontalLine,
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
    "fontColor",
    "fontBackgroundColor",
    "fontFamily",
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
    "HorizontalLine",
    "|",
    "insertTable",
    "imageUpload",
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
    toolbar: [
      "imageStyle:alignLeft",
      "imageStyle:full",
      "imageStyle:alignRight",
      "|",
      "imageStyle:align-block-left",
      "imageStyle:align-block-right",
      "imageStyle:block",
      "|",
      "imageTextAlternative",
      "|",
      "resizeImage",
      "toggleImageCaption",
      "linkImage",
    ],
    resizeUnit: "%",
    resizeOptions: [
      {
        name: "resizeImage:original",
        value: null,
        icon: "original",
      },
      {
        name: "resizeImage:25",
        value: "25",
        icon: "small",
      },
      {
        name: "resizeImage:50",
        value: "50",
        icon: "medium",
      },
      {
        name: "resizeImage:75",
        value: "75",
        icon: "large",
      },
    ],
  },

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
  fontFamily: {
    options: [
      "default",
      "Ubuntu, Arial, sans-serif",
      "Ubuntu Mono, Courier New, Courier, monospace",
    ],
  },
};
function Editor({ _dcContentHandler = null, data = null, readOnly = false }) {
  
  /*data props에 나중에 데이터 불러와서 넣으면 됨.
   */
  return (
    <CustomCKEditor>
      <CKEditor
        disabled={readOnly}
        editor={ClassicEditor}
        data={data}
        config={editorConfiguration}
        onChange={(event, editor) => {
          if (!readOnly) {
            const data = editor.getData();
            _dcContentHandler(data);
          }
        }}
        onReady={(editor) => {
          CKEditorInspector.attach( editor );
          const editingView = editor.editing.view;
          editingView.document.on( 'paste', ( evt, data) => {
            console.log(editor.model.document);
          console.log(editor.data);
              const temp = data.dataTransfer.files[0];
              console.log(temp);
              const images = new FormData();
              images.append('file',temp);
              
            documentPastedImageApi(images).then((result)=>{
              console.log(result);
            })
          });
          editor.conversion.for( 'downcast' ).elementToElement( {
            model: 'imageInline',
            view: ( modelElement, { writer } ) => {
              const src = 'https://lh3.googleusercontent.com/proxy/8eXCTAy_U8DhLnDliMEqWZ4f6CYs1tWZwCgbYWF8wNXo6lEMnXG-s-LrbBTbCphHHas45s-20c4hQCP27_Qcq8lJ5jIA';
              writer.setAttribute('src',src,modelElement);
            }
          } );
          const toolbarElement = editor.ui.view.toolbar.element;
          if (readOnly) {
            toolbarElement.style.display = "none";
          }
        }}
      />
    </CustomCKEditor>
  );
}

const CustomCKEditor = styled.div`
  width: 100%;
  .ck-editor__editable_inline {
    height: 1000px;
    padding: 2rem;
  }
`;
export default Editor;
