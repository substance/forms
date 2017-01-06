import { LinkCommand, AnnotationComponent, AnnotationTool, EditAnnotationCommand } from 'substance'
import Comment from './Comment'
import CommentHTMLConverter from './CommentHTMLConverter'
import EditCommentTool from './EditCommentTool'

export default {
  name: 'comment',
  configure: function(config, {
    toolGroup,
    disableCollapsedCursor
  }) {
    config.addNode(Comment)
    config.addComponent('comment', AnnotationComponent)
    config.addConverter('html', CommentHTMLConverter)
    // We just reuse the link command here
    config.addCommand('comment', LinkCommand, {
      nodeType: 'comment',
      disableCollapsedCursor
    })
    config.addCommand('edit-comment', EditAnnotationCommand, {
      nodeType: 'comment'
    })
    config.addTool('comment', AnnotationTool, {
      toolGroup: toolGroup || 'annotations'
    })
    config.addTool('edit-comment', EditCommentTool, {
      toolGroup: 'overlay'
    })
    config.addIcon('comment', { 'fontawesome': 'fa-comment'})
    config.addLabel('comment', 'Comment')
    config.addLabel('delete-comment', 'Remove comment')
  }
}
