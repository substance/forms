import { EditorSession, DefaultDOMElement, BodyScrollPane } from 'substance'
import Configurator from './StandaloneConfigurator'
import RichTextArea from './RichTextArea'

/*
  A quasi component, which is actually not used to render an element, just to
  maintain an EditorSession.

  The idea is that we immitate a setup where the page is rendered by an
  Application component, having one EditorSession and multiple Surfaces.

  As this top-level component does not really exist, there is no classical
  render cycle on this level. Instead child components (RichTextArea or
  RichTextField) are just provided with an adequate context, and necessary
  props.
*/
class Forms extends BodyScrollPane {

  constructor(root) {
    super(null, {})
    this.el = DefaultDOMElement.wrapNativeElement(root || window.document.body)
    this.__isMounted__ = true
    this._initialize()
    // NOTE: we need to call didMount manually to consider handlers set
    // in BodyScrollPane
    this.didMount()
  }

  _initialize() {
    let editableEls = this.el.findAll('*[editable]')
    let editables = {}
    editableEls.forEach(function(el) {
      let type = el.attr('data-type')
      let id = el.id
      if (!id) {
        console.warn('An editable should have an id.')
        return
      }
      if (!type) {
        console.warn('An editable should have data-type set.')
        return
      }
      if (editables[id]) {
        console.error('An editable with the same id already exists.')
        return
      }
      editables[id] = {
        id: id, type: type, el: el
      }
    })
    let configurator = new Configurator()

    this.configurator = configurator
    this.doc = this._importDocument(editables)
    this.editorSession = new EditorSession(this.doc, {
      configurator: this.configurator
    })
    this.componentRegistry = configurator.getComponentRegistry()
    this.toolGroups = configurator.getToolGroups()
    this.labelProvider = configurator.getLabelProvider()
    this.iconProvider = configurator.getIconProvider()
    // legacy
    this.surfaceManager = this.editorSession.surfaceManager
    this.commandManager = this.editorSession.commandManager
    this.dragManager = this.editorSession.dragManager
    this.macroManager = this.editorSession.macroManager
    this.converterRegistry = this.editorSession.converterRegistry
    this.globalEventHandler = this.editorSession.globalEventHandler
    this.editingBehavior = this.editorSession.editingBehavior
    this.markersManager = this.editorSession.markersManager
    this.editables = this._mountEditables(editables)
  }

  getChildContext() {
    return {
      scrollPane: this,
      configurator: this.configurator,
      editorSession: this.editorSession,
      doc: this.editorSession.getDocument(),
      componentRegistry: this.componentRegistry,
      surfaceManager: this.editorSession.surfaceManager,
      commandManager: this.editorSession.commandManager,
      dragManager: this.editorSession.dragManager,
      macroManager: this.editorSession.macroManager,
      converterRegistry: this.editorSession.converterRegistry,
      globalEventHandler: this.editorSession.globalEventHandler,
      editingBehavior: this.editorSession.editingBehavior,
      markersManager: this.editorSession.markersManager,
      toolGroups: this.toolGroups,
      labelProvider: this.labelProvider,
      iconProvider: this.iconProvider
    }
  }

  _importDocument(items) {
    let importer = this.configurator.createImporter('html')
    Object.keys(items).forEach((key) => {
      let item = items[key]
      let el = item.el
      let id = item.id
      // TODO: we may want to consider multiple editable types
      // (e.g. multi-line vs single line inputs)
      importer.convertContainer(el.children, id)
    })
    return importer.generateDocument()
  }

  _mountEditables(items) {
    let editables = {}
    let doc = this.doc

    // Setup overlay component
    let Overlay = this.componentRegistry.get('overlay')
    let overlay = new Overlay(this, {
      toolGroups: ['annotations', 'text', 'overlay']
    })
    // initial render
    overlay.rerender()
    // NOTE: as this component is not really in the DOM, we need to trigger
    // didMount on our own
    overlay.triggerDidMount()
    this.el.append(overlay.el)

    Object.keys(items).forEach((key) => {
      let item = items[key]
      let el = item.el
      let id = item.id
      let editable

      // TODO: we may want to consider multiple editable types
      // (e.g. multi-line vs single line inputs)
      let container = doc.get(id)
      editable = new RichTextArea(this, { node: container }, { el })
      editables[id] = editable
      // take over ownership
      editable.rerender()

      // NOTE: as this component is not really in the DOM, we need to trigger
      // didMount on our own
      editable.triggerDidMount()
    })
    return editables
  }

  getHTML(name) {
    return this.editables[name].getHTML()
  }

}

export default Forms
