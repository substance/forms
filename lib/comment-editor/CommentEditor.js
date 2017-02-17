import { ProseEditor, ContainerEditor } from 'substance'

/**
  Configurable ProseEditor component

  @example

  ```js
  const cfg = new Configurator()
  cfg.import(ProseEditorPackage)
  cfg.import(SuperscriptPackage)

  window.onload = function() {
    let doc = configurator.createArticle(fixture)
    let editorSession = new EditorSession(doc, {
      configurator: configurator
    })
    ProseEditor.mount({
      editorSession: editorSession
    }, document.body)
  }
  ```
*/

// TODO: Check if we can inherit from AbstractEditor
class CommentEditor extends ProseEditor {

  render($$) {
    let el = $$('div').addClass('sc-comment-editor')
    let configurator = this.getConfigurator()
    el.append(
      $$(ContainerEditor, {
        disabled: this.props.disabled,
        editorSession: this.editorSession,
        node: this.doc.get('body'),
        commands: configurator.getSurfaceCommandNames(),
        textTypes: configurator.getTextTypes()
      }).ref('body')
    )
    return el
  }
}

export default CommentEditor
