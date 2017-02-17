import { Component, Configurator, EditorSession } from 'substance'
import CommentEditor from './CommentEditor'
import CommentEditorPackage from './CommentEditorPackage'

class EditComment extends Component {
  constructor(...args) {
    super(...args)
    this.cfg = new Configurator().import(CommentEditorPackage)
    this._initDoc(this.props)
  }

  getChildContext() {
    return {
      editorId: this.props.editorId
    }
  }

  // New props arrived
  willReceiveProps(props) {
    this.el.empty()
    this._initDoc(props)
  }

  _initDoc(props) {
    this.importer = this.cfg.createImporter('html')
    this.doc = this.importer.importDocument(props.html)
    this.editorSession = new EditorSession(this.doc, {
      configurator: this.cfg
    })
  }

  render($$) {
    let el = $$('div').addClass('sc-edit-comment')
    el.append(
      $$(CommentEditor, {
        editorSession: this.editorSession
      }).ref('commentEditor')
    )
    return el
  }

  getHTML() {
    let htmlExporter = this.cfg.createExporter('html')
    // Given that exportDocument returns an HTML string
    return htmlExporter.exportDocument(this.doc)
  }
}

export default EditComment
