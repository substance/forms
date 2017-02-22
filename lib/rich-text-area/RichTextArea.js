import {
  Component, Configurator, EditorSession, EmphasisPackage, StrongPackage,
  LinkPackage, ListPackage, TablePackage
} from 'substance'
import RichTextAreaEditor from './RichTextAreaEditor'
import RichTextAreaPackage from './RichTextAreaPackage'
import XrefPackage from '../xref/XrefPackage'

// Packages configuration
const PACKAGES = {
  'strong': StrongPackage,
  'emphasis': EmphasisPackage,
  'link': LinkPackage,
  'list': ListPackage,
  'table': TablePackage,
  'xref': XrefPackage
}

const DEFAULT_PACKAGES = ['strong', 'emphasis', 'link', 'list', 'table']

class RichTextArea extends Component {
  constructor(...args) {
    super(...args)
    this.cfg = new Configurator().import(RichTextAreaPackage)
    let enabledPackages = this.props.config.enabledPackages || DEFAULT_PACKAGES
    let defaultOptions = {
      disableCollapsedCursor: true,
      toolGroup: 'overlay'
    }
    enabledPackages.forEach((pkg) => {
      this.cfg.import(PACKAGES[pkg], defaultOptions)
    })
    this._initDoc(this.props)
  }

  didMount() {
    this.refs.editor.refs.scrollPane.on('selection:positioned', this._onSelectionPositioned, this)
  }

  dispose() {
    // this.refs.editor.refs.scrollPane.off(this)
    // this.editorSession.off(this)
  }

  _onSelectionPositioned(hints) {
    hints.editorId = this.props.editorId
    this.emit('selection:positioned', hints)
  }

  getChildContext() {
    return {
      editorId: this.props.editorId
    }
  }

  willReceiveProps(props) {
    this.dispose()
    this.el.empty()
    this._initDoc(props)
  }

  _initDoc(props) {
    this.importer = this.cfg.createImporter('html')
    this.doc = this.importer.importDocument(props.html)

    // Deregister handlers
    this.editorSession = new EditorSession(this.doc, {
      configurator: this.cfg
    })

    this.editorSession.onRender('selection', this._onSelectionChanged, this)
  }

  _onSelectionChanged() {
    let selectionState = this.editorSession.getSelectionState()
    let activeAnnotation = selectionState.getAnnotationsForType('xref')[0]
    this.emit('selection:changed', {
      activeAnnotation,
      editorId: this.props.editorId
    })
  }

  render($$) {
    let el = $$('div').addClass('sc-rich-text-area')
    el.append(
      $$(RichTextAreaEditor, {
        editorSession: this.editorSession,
        editorId: this.props.editorId
      }).ref('editor')
    )

    return el
  }

  getHTML() {
    let htmlExporter = this.cfg.createExporter('html')
    // Given that exportDocument returns an HTML string
    return htmlExporter.exportDocument(this.doc)
  }
}

export default RichTextArea
