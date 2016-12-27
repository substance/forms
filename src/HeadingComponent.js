import {TextPropertyComponent} from "substance"

class HeadingComponent extends TextPropertyComponent {
  constructor(parent, props) {
    props.path = [ props.node.id, "content"]
    super(parent, props)
  }

  render($$) {
    let el = super.render($$)
    el.addClass('sc-heading').attr('data-id', this.props.node.id)
    return el
  }

  _getTagName() {
    return 'h'+this.props.node.level
  }
}

export default HeadingComponent