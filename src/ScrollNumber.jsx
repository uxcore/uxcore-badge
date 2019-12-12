/**
 * Badge Component for uxcore
 * Fork from ant-design
 * @author eternalsky
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */

import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isCssAnimationSupported } from 'css-animation';
import { polyfill } from 'react-lifecycles-compat';

const isWin = navigator.platform === "Win32" || navigator.platform === "Windows"

const renderNumberList = position => {
  const childrenToReturn = [];
  for (let i = 0; i < 30; i++) {
    if (isWin) {
      if (position === i) {
        childrenToReturn.push(
          <p key={i}>
            {i % 10}
          </p>
        )
        break
      }
    } else {
      const currentClassName = position === i ? 'current' : null;
      childrenToReturn.push(
        <p key={i} className={currentClassName}>
          {i % 10}
        </p>
      );
    }
  }
  return childrenToReturn;
};

function getNumberArray(num) {
  return num
    ? num
        .toString()
        .split('')
        .reverse()
        .map(i => Number(i))
    : [];
}

class ScrollNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animateStarted: true,
      count: props.count,
      animationEnabled: true,
      lastCount: 1,
    };
  }

  componentDidMount() {
    if (!isCssAnimationSupported) {
      this.setState({
        animationEnabled: false,
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if ('count' in props) {
      if (state.count === props.count) {
        return null;
      }
      // 复原数字初始位置
      return {
        animateStarted: state.count === props.count,
        count: props.count,
        lastCount: state.count,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    // 等待数字位置复原完毕,
    // 开始设置完整的数字
    if (this.props.count !== prevProps.count) {
      prevProps.onAnimated();
    }
  }

  getPositionByNum(num, i) {
    if (this.state.animateStarted) {
      return 10 + num;
    }
    const currentDigit = getNumberArray(this.state.count)[i];
    const lastDigit = getNumberArray(this.state.lastCount)[i];
    // 同方向则在同一侧切换数字

    if (this.state.count > this.state.lastCount) {
      if (currentDigit >= lastDigit) {
        return 10 + num;
      }
      return 20 + num;
    }
    if (currentDigit <= lastDigit) {
      return 10 + num;
    }
    return num;
  }

  renderCurrentNumber(num, i) {
    const position = this.getPositionByNum(num, i);
    const height = this.props.height;
    const removeTransition =
      this.state.animateStarted ||
      getNumberArray(this.state.lastCount)[i] === undefined;
    const transformStyle = {};
    if (!isWin) {
      transformStyle.WebkitTransform = `translate3d(0, ${-position * height}px, 0)`
      transformStyle.transform = `translate3d(0, ${-position * height}px, 0)`
    }
    return createElement(
      'span',
      {
        className: `${this.props.prefixCls}-only`,
        style: {
          transition: removeTransition && 'none',
          ...transformStyle,
          height,
        },
        key: i,
      },
      renderNumberList(position)
    );
  }

  renderNumberElement() {
    const state = this.state;
    if (!state.count || isNaN(state.count)) {
      return state.count;
    }
    return getNumberArray(state.count)
      .map((num, i) => this.renderCurrentNumber(num, i))
      .reverse();
  }

  render() {
    const props = {
      height: this.props.height,
      className: classnames({
        [`${this.props.prefixCls}`]: true,
        [`${this.props.className}`]: !!this.props.className,
        'not-support-css-animation': !this.state.animationEnabled,
      }),
    };
    return createElement(
      this.props.component,
      props,
      this.renderNumberElement()
    );
  }
}

ScrollNumber.defaultProps = {
  prefixCls: 'kuma-scroll-number',
  count: null,
  component: 'sup',
  onAnimated() {},
  height: 14,
};

ScrollNumber.propTypes = {
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  component: PropTypes.string,
  onAnimated: PropTypes.func,
  height: PropTypes.number,
  prefixCls: PropTypes.string,
  className: PropTypes.string,
};

polyfill(ScrollNumber);

export default ScrollNumber;
