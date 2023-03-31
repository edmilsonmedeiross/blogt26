import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef } from 'react';
import { filePickerCallback } from '../helpers/filePicker';
// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import '../tinymce/js/tinymce/tinymce.min.js';
// DOM model
import '../tinymce/js/tinymce/models/dom/model.min.js';
// Theme
import '../tinymce/js/tinymce/themes/silver/theme.min.js';
// Toolbar icons
import '../tinymce/js/tinymce/icons/default/icons.min.js';

// importing the plugin js.
// if you use a plugin that is not listed here the editor will fail to load
import '../tinymce/js/tinymce/plugins/advlist/plugin.min.js';
import '../tinymce/js/tinymce/plugins/anchor/plugin.min.js';
import '../tinymce/js/tinymce/plugins/autolink/plugin.min.js';
import '../tinymce/js/tinymce/plugins/autoresize/plugin.min.js';
import '../tinymce/js/tinymce/plugins/autosave/plugin.min.js';
import '../tinymce/js/tinymce/plugins/charmap/plugin.min.js';
import '../tinymce/js/tinymce/plugins/code/plugin.min.js';
import '../tinymce/js/tinymce/plugins/codesample/plugin.min.js';
import '../tinymce/js/tinymce/plugins/directionality/plugin.min.js';
import '../tinymce/js/tinymce/plugins/emoticons/plugin.min.js';
import '../tinymce/js/tinymce/plugins/fullscreen/plugin.min.js';
import '../tinymce/js/tinymce/plugins/help/plugin.min.js';
import '../tinymce/js/tinymce/plugins/image/plugin.min.js';
import '../tinymce/js/tinymce/plugins/importcss/plugin.min.js';
import '../tinymce/js/tinymce/plugins/insertdatetime/plugin.min.js';
import '../tinymce/js/tinymce/plugins/link/plugin.min.js';
import '../tinymce/js/tinymce/plugins/lists/plugin.min.js';
import '../tinymce/js/tinymce/plugins/media/plugin.min.js';
import '../tinymce/js/tinymce/plugins/nonbreaking/plugin.min.js';
import '../tinymce/js/tinymce/plugins/pagebreak/plugin.min.js';
import '../tinymce/js/tinymce/plugins/preview/plugin.min.js';
import '../tinymce/js/tinymce/plugins/quickbars/plugin.min.js';
import '../tinymce/js/tinymce/plugins/save/plugin.min.js';
import '../tinymce/js/tinymce/plugins/searchreplace/plugin.min.js';
import '../tinymce/js/tinymce/plugins/table/plugin.min.js';
import '../tinymce/js/tinymce/plugins/template/plugin.min.js';
import '../tinymce/js/tinymce/plugins/visualblocks/plugin.min.js';
import '../tinymce/js/tinymce/plugins/visualchars/plugin.min.js';
import '../tinymce/js/tinymce/plugins/wordcount/plugin.min.js';

// importing plugin resources
import '../tinymce/js/tinymce/plugins/emoticons/js/emojis.js';

// Content styles, including inline UI like fake cursors
// /* eslint import/no-webpack-loader-syntax: off */
import contentCss from '!!raw-loader!../tinymce/js/tinymce/skins/content/default/content.min.css';
// import contentCssD from '!!raw-loader!../tinymce/js/tinymce/skins/content/dark/content.min.css';
import contentUiCss from '!!raw-loader!../tinymce/js/tinymce/skins/ui/oxide/content.min.css';
// import contentUiCssD from '!!raw-loader!../tinymce/js/tinymce/skins/ui/tinymce-5-dark/content.min.css';

export default function BundledEditor(props) {
  const editorRef = useRef(null);
  const [contentEditor, setContentEditor] = React.useState(null);
  const {init, ...rest} = props;

  let useDarkMode = true;
  let isSmallScreen = false;
  let saveTimeout;
  useEffect(() => {
    // useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;
    // editorRef.plugins.autoSave.restoreDraft();
    // console.log(editorRef.current);
    
  }, [editorRef.current]);

  return (
    <div>
      <Editor
        init={{
          selector: 'textarea#open-source-plugins',
          plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
          editimage_cors_hosts: ['picsum.photos'],
          menubar: 'file edit view insert format tools table help',
          toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen restoredraft preview save print | insertfile image media link anchor codesample | code | ltr rtl',
          toolbar_sticky: true,
          autosave_ask_before_unload: true,
          autosave_interval: '5s',
          autosave_prefix: 'textEditor',
          autosave_restore_when_empty: true,
          autosave_retention: '10080m',
          image_advtab: true,
          link_list: [
            { title: 'My page 1', value: 'https://www.tiny.cloud' },
            { title: 'My page 2', value: 'http://www.moxiecode.com' }
          ],
          image_list: [
            { title: 'My page 1', value: 'https://www.tiny.cloud' },
            { title: 'My page 2', value: 'http://www.moxiecode.com' }
          ],
          image_class_list: [
            { title: 'None', value: '' },
            { title: 'Some class', value: 'class-name' }
          ],
          importcss_append: true,
          file_picker_callback: filePickerCallback,
          height: '60vh',
          image_caption: true,
          quickbars_selection_toolbar: 'bold italic | alignleft aligncenter alignright alignjustify | quicklink h2 h3 blockquote quickimage quicktable',
          noneditable_class: 'mceNonEditable',
          toolbar_mode: 'sliding',
          contextmenu: 'link image table',
          file_picker_types: 'file image media',
          images_file_types: 'jpg,svg,webp',
          skin: false,
          content_css: false,
          content_style: [contentCss, contentUiCss, 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'].join('\n'),
        }}
        onInit={(evt, editor) => {
          editorRef.current = editor;
          editor.on('change', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
              console.log('saved');
              localStorage.setItem('savedContent', editor.getContent());
            }, 2000);
          });
          
          const data = localStorage.getItem('savedContent');
            console.log(editor);
    
          
          if (data) {
            setContentEditor(data);
            // editor.setContent(data, { format: 'html' });
            // console.log('if',data);
          }
          
        }}
        
        initialValue={contentEditor}
      />
    </div>
  );
}