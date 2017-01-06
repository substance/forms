import { Tool } from 'substance'

/**
  Tool to edit an existing link.

  Designed so that it can be used either in a toolbar, or within
  an overlay on the Surface.

  @component
*/
class EditCommentTool extends Tool {

  render($$) {
    let Input = this.getComponent('input')
    let Button = this.getComponent('button')
    let el = $$('div').addClass('sc-edit-comment-tool')

    // GUARD: Return if tool is disabled
    if (this.props.disabled) {
      console.warn('Tried to render EditLinkTool while disabled.')
      return el
    }

    el.append(
      $$(Input, {
        type: 'text',
        path: [this.props.node.id, 'content'],
        placeholder: 'Add comment'
      }),
      $$(Button, {
        icon: 'delete',
        style: this.props.style
      }).attr('title', this.getLabel('delete-comment'))
        .on('click', this.onDelete)
    )
    return el
  }

  onDelete(e) {
    e.preventDefault();
    let node = this.props.node
    let sm = this.context.surfaceManager
    let surface = sm.getFocusedSurface()
    if (!surface) {
      console.warn('No focused surface. Stopping command execution.')
      return
    }
    let editorSession = this.context.editorSession
    editorSession.transaction(function(tx, args) {
      tx.delete(node.id)
      return args
    })
  }
}


export default EditCommentTool
