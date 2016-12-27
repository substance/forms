import {TextPropertyComponent} from "substance"

class ParagraphComponent extends TextPropertyComponent {
  constructor(parent, props) {
    props.path = [ props.node.id, 'content']
    super(parent, props)
  }

  render($$) {
    let el = super.render($$)
    el.addClass('sc-paragraph').attr('data-id', this.props.node.id)
    return el
  }

  _getTagName() {
    return 'p'
  }
}

export default ParagraphComponent
