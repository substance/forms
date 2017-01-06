export default {

  type: 'comment',
  tagName: 'span',

  import: function(el, node) {
    node.content = el.attr('data-comment')
  },

  export: function(node, el) {
    el.attr({
      'data-comment': node.content
    })
  }
}
