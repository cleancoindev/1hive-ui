import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FocusVisible } from '..'
import { theme } from '../../theme'
import { unselectable, font } from '../../utils/styles'

class ButtonBase extends React.PureComponent {
  static propTypes = {
    focusVisible: PropTypes.bool,
    showFocusRing: PropTypes.bool,
  }
  static defaultProps = {
    showFocusRing: true,
  }
  render() {
    const { focusVisible, showFocusRing, ...props } = this.props
    return <Main focusRing={focusVisible && showFocusRing} {...props} />
  }
}

const Main = styled.button.attrs({ type: 'button' })`
  display: inline-block;
  padding: 0;
  white-space: nowrap;
  ${font({ size: 'small', weight: 'normal' })};
  ${unselectable};
  color: ${theme.textSecondary};

  background: none;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  outline: 0;

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  &::-moz-focus-inner {
    border: 0;
  }

  &:focus {
    outline: ${p => (p.focusRing ? `2px solid ${theme.accent}` : '0')};
  }
`

export default props => (
  <FocusVisible>
    {({ focusVisible, onFocus }) => (
      <ButtonBase onFocus={onFocus} focusVisible={focusVisible} {...props} />
    )}
  </FocusVisible>
)