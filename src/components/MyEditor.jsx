// import dynamic from 'next/dynamic';
import ClassicEditor from './ckeditor'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useState } from 'react';

const editorConfiguration = {
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'heading',
      '|',
      'bold',
      'italic',
      'underline',
      '|',
      'fontSize',
      'fontColor',
      'fontFamily',
      'fontBackgroundColor',
      '|',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'horizontalLine',
      'outdent',
      'alignment',
      'indent',
      '|',
      'imageInsert',
      'highlight',
      'blockQuote',
      'htmlEmbed',
      'codeBlock',
      'insertTable',
      'mediaEmbed',
      'removeFormat'
    ],
    shouldNotGroupWhenFull: true
  },
  image: {
    toolbar: [
      'imageTextAlternative',
      'toggleImageCaption',
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side',
      'linkImage'
    ]
  },
  image2_alignClasses: [ 
    'image-align-left',
    'image-align-center',
    'image-align-right',
  ],

}


function MyEditor({ getEditor }) {
  const [Editor, setEditor] = useState({})
  const [content, setContent] = useState('');
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Digite algo!</p>"
        config={editorConfiguration}
        onReady={editor => {
          // You can store the "editor" and use when it is needed.
          // console.log('Editor is ready to use!', editor);
          setEditor(editor);
          if (getEditor) getEditor(editor);
        }}
        onChange={(event, editor) => {setContent(editor.getData())}}
      />
      <button onClick={() => {
        setContent(Editor.getData())
        console.log(content)
      }} >Preview</button>
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
    </>
  )
}

export default MyEditor