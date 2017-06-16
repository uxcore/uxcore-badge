/**
 * Badge Component for uxcore
 * Fork from ant.design
 * @author eternalsky
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */

import React from 'react';
import Animate from 'rc-animate';
import classNames from 'classnames';
import ScrollNumber from './ScrollNumber';

class Badge extends React.Component {
  render() {
    const { prefixCls, overflowCount, className, style, children, dot, text } = this.props;
    let { count } = this.props;
    count = count > overflowCount ? `${overflowCount}+` : count;
    if (dot) {
      count = '';
    }
    if (text) {
      count = text;
    }
    // null undefined "" "0" 0 <0
    const hidden = (!count || count === '0' || count < 0) && !dot;
    const scrollNumberCls = prefixCls + (dot ? '-dot' : '-count');
    const badgeCls = classNames({
      [className]: !!className,
      [prefixCls]: true,
      [`${prefixCls}-not-a-wrapper`]: !children,
    });

    return (
      <span className={badgeCls} title={count} {...this.props}>
        {children}
        <Animate
          component=""
          showProp="data-show"
          transitionName={`${prefixCls}-zoom`}
          transitionAppear
        >
          {
            hidden ? null :
              <ScrollNumber
                data-show={!hidden}
                className={scrollNumberCls}
                count={count} style={style}
              />
          }
        </Animate>
      </span>
    );
  }
}

Badge.defaultProps = {
  prefixCls: 'kuma-badge',
  count: null,
  dot: false,
  overflowCount: 99,
  text: null,
};

Badge.propTypes = {
  prefixCls: React.PropTypes.string,
  count: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
  dot: React.PropTypes.bool,
  overflowCount: React.PropTypes.number,
  text: React.PropTypes.string,
  className: React.PropTypes.string,
  style: React.PropTypes.object,
  children: React.PropTypes.any,
};

Badge.displayName = 'Badge';

export default Badge;
