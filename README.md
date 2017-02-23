# Substance Forms

Substance Forms is a JavaScript library for creating better web forms.
You can mark areas of the page as editable and access the contents with a
simple JavaScript API. You have full control over markup and styling, and you
can mix the rich text inputs with classic form elements.

See [the](http://substance.io/forms) [demos](http://substance.io/forms/comments.html).

Project Status: Beta

## Usage

Download the latest [release](https://github.com/substance/forms/releases) and use like shown below.

```html
<html>
<head>
  <script type="text/javascript" src="substance-forms.js"></script>
  <style>
    /* FontAwesome is used to display the icons shown in the overlay */
    @import 'lib/font-awesome/css/font-awesome.min.css';
    /* Substance Forms looks best with a CSS reset */
    @import 'substance/substance-reset.css';
    /* Substance Forms UI styles */
    @import 'substance-forms.css';
  </style>
</head>
<script>
  var form
  window.addEventListener('load', function() {
    forms = new SubstanceForms()
    /* Activate rich text editing */
    forms.addRichTextArea('about', document.getElementById('about'), {
      enabledPackages: ['heading', 'strong', 'emphasis', 'link', 'list', 'table']
    })
  })
  function _onSubmit() {
    let forms = window.substanceForms
    let formData = {
      about: forms.getHTML('about')
    }
    console.log('Form data', formData)
  }
</script>
<body>
  <!-- The editable attribute marks editable areas -->
  <div id="about">
    <p>Tell us <strong>something</strong> about <em>you</em>.</p>
  </div>
  <button onclick="_onSubmit()">Submit</button>
</body>
</html>
```

For a complete usage example see [here](examples/index.html). Learn advanced usage by inspecting the [comments example](examples/comments.html).

## Development

If you want to contribute, you can set up a development environment like so:

```
$ git clone https://github.com/substance/forms.git
$ npm install
$ npm start
```

For faster builds you can run:

```
$ npm run dev
```

But then you need a browser that can run ES6 code natively.

## Credits

This project is developed by [Substance](http://substance.io) in collaboration with the [University of California Curation Center](http://www.cdlib.org/services/uc3/index.html).
