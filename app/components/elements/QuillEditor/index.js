import React, { useEffect, useRef, Component } from 'react'
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'
import { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const DynamicComponent = dynamic(() => import('react-quill'), {
  ssr: false,
})

const Video = Quill.import('formats/video')
const Link = Quill.import('formats/link')
class CoustomVideo extends Video {
  static create(value) {
    const node = super.create(value)

    const video = document.createElement('video')
    video.setAttribute('controls', true)
    video.setAttribute('type', 'video/mp4')
    video.setAttribute('style', 'height: 200px; width: 100%')
    video.setAttribute('src', this.sanitize(value))
    node.appendChild(video)

    return node
  }

  static sanitize(url) {
    return Link.sanitize(url)
  }
}
CoustomVideo.blotName = 'video'
CoustomVideo.className = 'ql-video'
CoustomVideo.tagName = 'DIV'

Quill.register('formats/video', CoustomVideo)

// const QuillEditor = ({
//   onChange,
//   theme,
//   placeholder,
//   value,
//   style,
//   className,
//   name,
// }) => {
//   const quillRef = useRef(null)

//   useEffect(() => {
//     const insertImage = (url, type) => {
//       console.log('quillRef', quillRef)
//       const range = quillRef.getSelection(true)

//       quillRef.insertEmbed(range.index, type, url, 'user')
//       quillRef.setSelection(range.index + 1)

//       // this.quillRef.focus()
//     }
//     insertImage('https://www.youtube.com/watch?v=va5lskaahCQ', 'video')
//   }, [])
//   return (
//     <DynamicComponent
//       name={name}
//       value={value}
//       onChange={onChange}
//       theme={theme}
//       placeholder={placeholder}
//       modules={QuillEditor.modules}
//       formats={QuillEditor.formats}
//       style={style}
//       className={className}
//       ref={quillRef}
//     />
//   )
// }

// QuillEditor.defaultProps = {
//   placeholder: '',
//   theme: 'snow',
// }

// QuillEditor.propTypes = {
//   onChange: PropTypes.func.isRequired,
//   placeholder: PropTypes.string,
//   theme: PropTypes.string,
//   style: PropTypes.object,
//   className: PropTypes.string,
//   value: PropTypes.string,
//   name: PropTypes.string,
// }

// QuillEditor.modules = {
//   toolbar: [
//     [{ header: '1' }, { header: '2' }, { font: [] }],
//     [{ size: [] }],
//     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//     ['color', 'background'],
//     [
//       { list: 'ordered' },
//       { list: 'bullet' },
//       { indent: '-1' },
//       { indent: '+1' },
//     ],
//     ['link', 'image', 'video'],
//     ['clean'],
//   ],
//   clipboard: {
//     // toggle to add extra line breaks when pasting HTML:
//     matchVisual: false,
//   },
// }

// QuillEditor.formats = [
//   'header',
//   'font',
//   'size',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'blockquote',
//   'color',
//   'background',
//   'list',
//   'bullet',
//   'indent',
//   'link',
//   'image',
//   'video',
// ]

// export default QuillEditor

class QuillEditor extends Component {
  /** some code **/
  modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, false] }],

        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      handlers: {
        image: () => {
          this.showImageUploadModal()
        },
        video: () => {
          this.showVideoUploadModal()
        },
        // insertImage: this.insertImage,
      },
    },
  }

  formats = [
    'background',
    'bold',
    'color',
    'font',
    'code',
    'italic',
    'link',
    'size',
    'strike',
    'script',
    'underline',
    'blockquote',
    'header',
    'indent',
    'list',
    'align',
    'direction',
    'code-block',
    'image',
    'video',
  ]

  /** some code **/
  handleOk = () => {
    const { mediaURL, imageUploadBox, videoUploadBox } = this.state
    if (!mediaURL) return

    if (imageUploadBox) {
      this.insertImage(mediaURL, 'image')
    }
    if (videoUploadBox) {
      this.insertImage(mediaURL, 'video')
    }

    this.handleUploadBoxCancel()
  }

  insertImage = (url, type) => {
    const range = this.quill.getSelection(true)

    this.quill.insertEmbed(range.index, type, url, 'user')
    this.quill.setSelection(range.index + 1)

    this.quillRef.focus()
  }

  handleUploadBoxCancel = () => {
    this.setState({
      videoUploadBox: false,
      imageUploadBox: false,
      mediaURL: null,
    })
  }

  handleChange = () => {
    const insertImage = (url, type) => {
      const range = this.quill.getSelection(true)

      this.quill.insertEmbed(range.index, type, url, 'user')
      this.quill.setSelection(range.index + 1)

      this.quillRef.focus()
    }
    insertImage('https://www.youtube.com/watch?v=_43LX85ZYmg', 'video')
  }

  render() {
    /**  some code **/
    return (
      <div>
        {/* <UploadBox
          visiable={videoUploadBox || imageUploadBox}
          onConfirm={this.handleOk}
        />  */}
        <DynamicComponent
          modules={this.modules}
          theme="snow"
          // value={text}
          onChange={this.handleChange}
          placeholder="请输入..."
          // className={styles.editor}
          formats={this.formats}
          ref={(el) => {
            if (el) this.quillRef = el
          }}
        />
      </div>
    )
  }
}

export default QuillEditor
