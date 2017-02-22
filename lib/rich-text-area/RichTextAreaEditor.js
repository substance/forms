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
    RichTextAreaEditor.mount({
      editorSession: editorSession
    }, document.body)
  }
  ```
*/

// TODO: Check if we can inherit from AbstractEditor
class RichTextAreaEditor extends ProseEditor {

  render($$) {
    let el = $$('div').addClass('sc-rich-text-area-editor')
    let configurator = this.getConfigurator()
    let BodyScrollPane = this.componentRegistry.get('body-scroll-pane')
    let Overlay = this.componentRegistry.get('overlay')
    let Dropzones = this.componentRegistry.get('dropzones')

    el.append(
      $$(BodyScrollPane).append(
        $$(ContainerEditor, {
          disabled: this.props.disabled,
          editorSession: this.editorSession,
          node: this.doc.get('body'),
          commands: configurator.getSurfaceCommandNames(),
          textTypes: configurator.getTextTypes()
        }).ref('body'),
        $$(Overlay, {
          toolGroups: ['annotations', 'text', 'overlay']
        }),
        $$(Dropzones)
      )
      .ref('scrollPane')
    )
    return el
  }

}

export default RichTextAreaEditor
