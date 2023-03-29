import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useState } from 'react';
import ClassicEditor from './ckeditor';

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
      'removeFormat',
    ],
    shouldNotGroupWhenFull: true,
  },
  image: {
    toolbar: [
      'imageTextAlternative',
      'toggleImageCaption',
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:alignRight',
      'imageStyle:alignLeft',
      'linkImage',
    ],
  },
};

function MyEditor({ getEditor }) {
  const [Editor, setEditor] = useState(false);
  const local = localStorage.getItem('savedContent');
  // console.log(typeof local);
  let localSavedContent;
  if (local !== 'undefined') localSavedContent = JSON.parse(local);
  const [savedContent] = useState(localSavedContent
    || '<p>Digite algo!</p>');
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);

  let autoSave;
  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={savedContent}
        config={editorConfiguration}
        onReady={editor => {
          setEditor(editor);
          if (getEditor) getEditor(editor);
        }}
        onChange={ (_event, editor) => {
          setContent(editor.getData());
          if (autoSave) clearTimeout(autoSave);
          autoSave = setTimeout(() => {
            const data = editor.getData();
            localStorage.setItem('savedContent', JSON.stringify(data) );
            setSaved(true);
            setTimeout(() => setSaved(false), 1000);
          }, 5000);
        } }
      />
      { saved && <h4>SAVED</h4> }
      <button onClick={() => {
        setContent(Editor.getData());
        console.log(Editor);
      }} >Preview</button>
      {content && <div className="ck-content" dangerouslySetInnerHTML={{ __html: content }} />}
    </>
  );
}

export default MyEditor;