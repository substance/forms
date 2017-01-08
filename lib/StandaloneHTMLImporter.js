import { HTMLImporter } from 'substance'

class StandaloneHTMLImporter extends HTMLImporter {
  constructor(config) {
    super(config)
    this.reset()
  }
}

export default StandaloneHTMLImporter
