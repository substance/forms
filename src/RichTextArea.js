import { Component, ContainerEditor } from 'substance'

class RichTextArea extends Component {

  render($$) {
    let node = this.props.node
    let el = $$('div').addClass('sc-rich-text-area')
    let Overlay = this.getComponent('overlay')
    let ContextMenu = this.getComponent('context-menu')
    let BodyScrollPane = this.getComponent('body-scroll-pane')
    let editor = $$(ContainerEditor, {
      node: node,
      name: node.id,
      containerId: node.id,
      textTypes: this.getConfigurator().getTextTypes()
    })
    let scrollPane = $$(BodyScrollPane).append(
      editor,
      $$(Overlay),
      $$(ContextMenu)
    ).ref('bodyScrollPane')
    el.append(scrollPane)
    return el
  }

  getConfigurator() {
    return this.context.configurator
  }

  getHTML() {
    let exporter = this.getConfigurator().createExporter('html')
    let els = exporter.convertContainer(this.props.node)
    if (els.length > 0) {
      return els.map(function(el) {
        return el.outerHTML
      })
    } else {
      return ''
    }
  }
}

export default RichTextArea
