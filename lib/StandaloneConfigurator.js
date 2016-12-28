import {
  Configurator,
  BasePackage,
  HeadingPackage, ParagraphPackage,
  StrongPackage, EmphasisPackage,
  LinkPackage,
  Document
} from 'substance'

import StandaloneHTMLImporter from './StandaloneHTMLImporter'
import StandaloneHTMLExporter from './StandaloneHTMLExporter'


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

    // Core packages (e.g. SwitchTextTypePackage)
    this.import(BasePackage, defaultOptions)
    // Default packages
    this.import(ParagraphPackage, defaultOptions)
    this.import(HeadingPackage, defaultOptions)
    this.import(StrongPackage, defaultOptions)
    this.import(EmphasisPackage, defaultOptions)
    this.import(LinkPackage, defaultOptions)

    this.addImporter('html', StandaloneHTMLImporter)
    this.addExporter('html', StandaloneHTMLExporter)
  }
}

export default StandaloneConfigurator
