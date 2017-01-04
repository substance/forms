import { Component, ContainerEditor } from 'substance'

class RichTextArea extends Component {

  render($$) {
    let node = this.props.node
    let el = $$('div').addClass('sc-rich-text-area')
    let editor = $$(ContainerEditor, {
      node: node,
      name: node.id,
      containerId: node.id,
      textTypes: this.getConfigurator().getTextTypes()
    })
    el.append(
      editor
    )
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
      }).join('')
    } else {
      return ''
    }
  }
}

export default RichTextArea
