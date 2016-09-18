'use strict';

//--------------------------------------------
var Random = React.createClass({
  displayName: 'Random',

  getInitialState: function getInitialState() {
    return {
      color: [50, 100, 150]
    };
  },

  componentDidMount: function componentDidMount() {
    this.applyColor();
  },

  componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
    this.applyColor();
  },

  formatColor: function formatColor(ary) {
    return 'rgb(' + ary.join(', ') + ')';
  },

  isBackDark: function isBackDark() {
    var rgb = this.state.color;
    return rgb.reduce(function (a, b) {
      return a + b;
    }) < 127 * 3;
  },

  applyColor: function applyColor() {
    var color = this.formatColor(this.state.color);
    document.body.style.background = color;
  },

  chooseColor: function chooseColor() {
    for (var i = 0, random = []; i < 3; i++) {
      random.push(Math.floor(Math.random() * 256));
    }
    return random;
  },

  handleClick: function handleClick() {
    this.setState({
      color: this.chooseColor()
    });
  },

  render: function render() {
    return React.createElement(
      'div',
      null,
      React.createElement(
        'h1',
        { className: this.isBackDark() ? 'white' : 'black' },
        this.formatColor(this.state.color)
      ),
      React.createElement(Button, { light: this.isBackDark(), onClick: this.handleClick })
    );
  }
});

//--------------------------------------------
var Button = React.createClass({
  displayName: 'Button',

  render: function render() {
    return React.createElement(
      'button',
      {
        className: this.props.light ? 'light-button' : 'dark-button',
        onClick: this.props.onClick },
      'Refresh'
    );
  }
});

//--------------------------------------------
ReactDOM.render(React.createElement(Random, null), document.getElementById('app'));