import React, { useEffect } from 'react'
// import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { resetQuillRefAction } from 'redux/addMedia/addMediaActions'

// const DynamicComponent = dynamic(() => import('react-quill'), {
//   ssr: false,
// })

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

const QuillEditor = ({
  onChange,
  theme,
  placeholder,
  value,
  style,
  className,
  name,
}) => {
  const { quillRefSource } = useSelector(
    (state) => state.addMedia,
    shallowEqual,
  )

  const dispatch = useDispatch()
  let quillRef

  const insertImage = (url, type = 'video') => {
    const range = quillRef.getEditor().getSelection(true)
    quillRef.getEditor().insertEmbed(range.index, type, url, 'user')
    quillRef.getEditor().setSelection(range.index + 1)

    quillRef.focus()
  }

  useEffect(() => {
    if (quillRefSource) {
      insertImage(quillRefSource)
      dispatch(resetQuillRefAction())
    }
  }, [quillRefSource])
  return (
    <div>
      <ReactQuill
        name={name}
        value={value}
        onChange={onChange}
        theme={theme}
        placeholder={placeholder}
        modules={QuillEditor.modules}
        formats={QuillEditor.formats}
        style={style}
        className={className}
        ref={(el) => {
          if (el) quillRef = el
        }}
      />
    </div>
  )
}

QuillEditor.defaultProps = {
  placeholder: '',
  theme: 'snow',
}

QuillEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  theme: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
}

QuillEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    ['color', 'background'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

QuillEditor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'color',
  'background',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

export default QuillEditor
