import {AnnotationComponent} from 'substance'

class StrongComponent extends AnnotationComponent {
  _getTagName() {
    return 'b'
  }
}

export default StrongComponent