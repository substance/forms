import { DefaultDOMElement, EventEmitter } from 'substance'
import RichTextArea from './rich-text-area/RichTextArea'

export default class Forms extends EventEmitter {
  constructor(...args) {
    super(...args)
    this._editables = {}
  }
  addRichTextArea(editorId, el, config) {
    config = config || {}
    el = DefaultDOMElement.wrapNativeElement(el)
    let html = el.innerHTML
    // We remove the old content, and replace it with an editor
    el.innerHTML = ''
    let richTextArea = RichTextArea.mount({
      editorId,
      html,
      config
    }, el)
    richTextArea.on('selection:positioned', this._onSelectionPositioned, this)
    richTextArea.on('selection:changed', this._onSelectionChanged, this)
    this._editables[editorId] = richTextArea
    return richTextArea
  }

  _onSelectionPositioned(hints) {
    this.emit('selection:positioned', hints)
  }

  _onSelectionChanged(params) {
    this.emit('selection:changed', params)
  }

  removeRichTextArea(editorId) {
    this._editables[editorId].off(this)
  }

  getHTML(editorId) {
    return this._editables[editorId].getHTML()
  }

  setHTML(editorId, html) {
    let editor = this._editables[editorId]
    editor.setProps({
      html: html
    })
  }
}
