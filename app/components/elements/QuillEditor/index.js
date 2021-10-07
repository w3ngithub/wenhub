import React from 'react'
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'
import 'react-quill/dist/quill.snow.css'

const DynamicComponent = dynamic(() => import('react-quill'), {
  ssr: false,
})

const QuillEditor = ({
  onChange,
  theme,
  placeholder,
  value,
  style,
  className,
  name,
}) => (
  <DynamicComponent
    name={name}
    value={value}
    onChange={onChange}
    theme={theme}
    placeholder={placeholder}
    modules={QuillEditor.modules}
    formats={QuillEditor.formats}
    style={style}
    className={className}
  />
)

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
