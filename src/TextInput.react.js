import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

class TextInput extends React.Component {

  constructor(props) {
    super(props);

    this._handleChange = this._handleChange.bind(this);

    this.selectedText = null;
  }

  _handleChange(e) {
    const newText = this.props.parser ?
      this.props.parser(e.target.value) : e.target.value;

    if (newText !== this.selectedText) {
      e.persist();
      this.selectedText = newText;
      e.target.value = newText;
      this.props.onChange(e);
    } else if (e.target.value !== newText) {
      e.stopPropagation();
    }
  }

  render() {

    const {
      parser, onChange, // eslint-disable-line no-unused-vars
      bsSize, className, hasAux, ...otherProps
    } = this.props;

    return (
      <input
        {...otherProps}
        className={cx('form-control', {
          'has-aux': hasAux,
          'input-lg': bsSize === 'large' || bsSize === 'lg',
          'input-sm': bsSize === 'small' || bsSize === 'sm',
        }, className)}
        onChange={this._handleChange}
        ref={input => this._input = input}
        type="text"
      />
    );
  }

  getInstance() {
    return this._input;
  }
}

TextInput.propTypes = {
  /**
   * Specify the size of the input.
   */
  bsSize: PropTypes.oneOf(['large', 'lg', 'small', 'sm']),
};

export default TextInput;
