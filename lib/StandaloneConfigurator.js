import {
  Configurator, BasePackage, HeadingPackage, ParagraphPackage, StrongPackage,
  EmphasisPackage, LinkPackage, Document
} from 'substance'

import StandaloneHTMLImporter from './StandaloneHTMLImporter'
import StandaloneHTMLExporter from './StandaloneHTMLExporter'
import MinimalSwitchTextTypePackage from './minimal-switch-text-type/MinimalSwitchTextTypePackage'
import CommentPackage from './comment/CommentPackage'

class StandaloneConfigurator extends Configurator {
  constructor() {
    // Tools are not shown for a collapsed cursor
    let defaultOptions = {
      disableCollapsedCursor: true
    }
    super()
    this.defineSchema({
      name: 'html',
      ArticleClass: Document,
      defaultTextType: 'paragraph'
    })

    this.import(BasePackage)
    // Default packages
    this.import(ParagraphPackage, defaultOptions)
    this.import(HeadingPackage, defaultOptions)
    this.import(StrongPackage, defaultOptions)
    this.import(EmphasisPackage, defaultOptions)
    this.import(LinkPackage, defaultOptions)
    // Custom SwitchTextType package optimized for overlay-only use
    this.import(MinimalSwitchTextTypePackage)
    this.import(CommentPackage, defaultOptions)
    // HTML importers/exporters
    this.addImporter('html', StandaloneHTMLImporter)
    this.addExporter('html', StandaloneHTMLExporter)

    // Over-write certain labels
    this.addLabel('paragraph', 'P')
    this.addLabel('heading1', 'H1')
    this.addLabel('heading2', 'H2')
    this.addLabel('heading3', 'H3')
  }
}

export default StandaloneConfigurator
