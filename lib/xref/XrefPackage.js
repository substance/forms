import { AnnotationComponent, AnnotationCommand } from 'substance'
import Xref from './Xref'
import XrefHTMLConverter from './XrefHTMLConverter'

export default {
  name: 'xref',
  configure: function(config) {
    config.addNode(Xref)
    config.addComponent('xref', AnnotationComponent)
    config.addConverter('html', XrefHTMLConverter)
    config.addCommand('xref', AnnotationCommand, {
      nodeType: 'xref',
      commandGroup: 'annotations'
    })
    config.addIcon('xref', { 'fontawesome': 'fa-comment'})
    config.addLabel('xref', 'Comment')
  }
}
