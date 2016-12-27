import {
  Configurator,
  BasePackage,
  HeadingPackage, ParagraphPackage,
  StrongPackage, EmphasisPackage,
  LinkPackage,
  Document,
  SwitchTextTypeTool
} from 'substance'

import StandaloneHTMLImporter from './StandaloneHTMLImporter'
import StandaloneHTMLExporter from './StandaloneHTMLExporter'

import HeadingComponent from './HeadingComponent'
import ParagraphComponent from './ParagraphComponent'
import BoldComponent from './BoldComponent'
import ItalicComponent from './ItalicComponent'

let optionalPackages = {
  'paragraph': ParagraphPackage,
  'heading': HeadingPackage,
  'strong': StrongPackage,
  'emphasis': EmphasisPackage,
  'link': LinkPackage
}

class StandaloneConfigurator extends Configurator {
  constructor() {
    super()

    this.defineSchema({
      name: 'html',
      ArticleClass: Document,
      defaultTextType: 'paragraph'
    })

    // Core packages
    this.import(BasePackage)
    this.import(ParagraphPackage)

    let contentTypes = ['heading', 'strong', 'emphasis', 'link']
    contentTypes.forEach((contentType) => {
      this.import(optionalPackages[contentType])
    })

    // TODO: discuss API for overriding already registered components
    // For the time-being we use an extra flag, but maybe it should be addComponent(name, Class, options)
    // and 'force' just one flag
    this.addComponent('heading', HeadingComponent, 'force')
    this.addComponent('paragraph', ParagraphComponent, 'force')
    this.addComponent('strong', BoldComponent, 'force')
    this.addComponent('emphasis', ItalicComponent, 'force')

    this.addTool('switch-text-type', SwitchTextTypeTool, { toolGroup: 'overlay' })

    this.addImporter('html', StandaloneHTMLImporter)
    this.addExporter('html', StandaloneHTMLExporter)
  }
}

export default StandaloneConfigurator
