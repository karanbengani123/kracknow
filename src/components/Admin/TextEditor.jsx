// import React, {Component} from 'react';
// import {EditorState} from "draft-js";
// import {Editor} from "react-draft-wysiwyg";



//   class EditorContainer extends Component{
//     constructor(props){
//       super(props);
//       this.state = {
//         editorState: EditorState.createEmpty(),
//         uploadedImages: []
//       };
//       this._uploadImageCallBack = this._uploadImageCallBack.bind(this);
//     }

//     onEditorStateChange = (editorState) => {

//       this.setState({
//         editorState,
//       });
//       console.log(editorState)
//     };
//     _uploadImageCallBack(file) {
//       let uploadedImages = this.state.uploadedImages;
//       const imageObject = {
//         file: file,
//         localSrc: URL.createObjectURL(file),
//       }
//       uploadedImages.push(imageObject);
//       this.setState({ uploadedImages: uploadedImages })
//       return new Promise(
//         (resolve, reject) => {
//           resolve({ data: { link: imageObject.localSrc } });
//         }
//       );
//     }

//     render(){
//       const { editorState } = this.state;


//       return <div className='editor'>
//         <Editor
//           editorState={editorState}
//           toolbarClassName="toolbarClassName"
//           wrapperClassName="demo-wrapper"
//           editorClassName="demo-editor"
//           onEditorStateChange={this.onEditorStateChange}
//           toolbar={{
//             inline: { inDropdown: true },
//             list: { inDropdown: true },
//             textAlign: { inDropdown: true },
//             link: { inDropdown: true },
//             history: { inDropdown: true },
//             image: { uploadCallback: this._uploadImageCallBack },
//             inputAccept: 'application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel'
//           }}
//         />
//       </div>
//     }
//   }


//   export default EditorContainer

import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function EditorContainer() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <Editor
      apiKey=''
        onInit={(evt, editor) => editorRef.current = editor}
        // initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: 'file edit insert format table tools help',
          plugins: [
            // 'advlist autolink lists link image charmap print preview anchor',
            // 'searchreplace visualblocks code fullscreen',
            'paste image help wordcount',
            // 'image code'
          ],
          toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help | image',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          // image_list: [
          //   { title: 'My image 1', value: 'https://www.example.com/my1.gif' },
          //   { title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif' }
          // ],
          file_picker_types: 'image',
          image_title: true,
          automatic_uploads: false,
          selector: 'textarea#file-picker',
          // change this value according to your HTML
          images_upload_url: '',
      

          // selector: 'textarea#file-picker',
          // file_picker_callback: function (callback, value, meta) {
          //   // Provide file and text for the link dialog
          //   // if (meta.filetype == 'file') {
          //   //   callback('mypage.html', { text: 'My text' });
          //   // }

          //   // Provide image and alt text for the image dialog
          //   if (meta.filetype == 'image') {
          //     callback('myimage.jpg', { alt: 'My alt text' });
          //   }

          //   // Provide alternative source and posted for the media dialog
          //   // if (meta.filetype == 'media') {
          //   //   callback('movie.mp4', { source2: 'alt.ogg', poster: 'image.jpg' });
          //   // }
          // }


        }}
      />
      {/* <button onClick={log}>Log editor content</button> */}
    </>
  );
}