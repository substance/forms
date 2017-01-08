# Substance Forms

Substance Forms is a JavaScript library you can include your page to create
better web forms. You can mark areas of the page as editable and access
the contents with a simple JavaScript API. You have full control over markup
and styling, and you can mix the rich text inputs with classic form elements.

See [the demo](http://substance.io/forms).

Project Status: Experimental

## Usage

Download the latest [release](https://github.com/substance/forms/releases).

```html
<html>
<head>
  <script type="text/javascript" src="substance/substance.js"></script>
  <script type="text/javascript" src="substance-forms.js"></script>

  <style>
    /* FontAwesome is used to display the icons shown in the overlay */
    @import 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
    /* Substance Forms looks best with a CSS reset */
    @import 'substance/substance-reset.css';
    /* Substance Forms UI styles */
    @import 'substance-forms.css';
  </style>
</head>
<script>
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
  <div id="about" editable>
    <p>Tell us <strong>something</strong> about <em>you</em></p>
  </div>
  <button onclick="_onSubmit()">Submit</button>
</body>
</html>
```

## Development

If you want to contribute, you can set up a development environment like so:

```
$ git clone https://github.com/substance/examples.git
$ npm install
$ npm start
```

## Credits

This project is developed by [Substance](http://substance.io) in collaboration with the University of California.
