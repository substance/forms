import {
  Document, ListPackage, CodePackage, StrongPackage,
  EmphasisPackage, LinkPackage, ParagraphPackage, BasePackage
} from 'substance'

import CommentHTMLImporter from './CommentHTMLImporter'
import CommentHTMLExporter from './CommentHTMLExporter'

export default {
  name: 'comment',
  configure: function(config) {
    config.defineSchema({
      name: 'comment',
      ArticleClass: Document,
      defaultTextType: 'paragraph'
    })
    config.import(BasePackage)
    config.import(ParagraphPackage)
    config.import(EmphasisPackage)
    config.import(StrongPackage)
    config.import(CodePackage)
    config.import(LinkPackage)
    config.import(ListPackage)
    // HTML importers/exporters
    config.addImporter('html', CommentHTMLImporter)
    config.addExporter('html', CommentHTMLExporter)
  }
}
