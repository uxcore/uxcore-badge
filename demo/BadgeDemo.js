/**
 * Badge Component Demo for uxcore
 * @author eternalsky
 *
 * Copyright 2015-2016, Uxcore Team, Alinw.
 * All rights reserved.
 */

let classnames = require('classnames');

let Badge = require('../src');
let Button = require('uxcore-button');

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: true,
            count: 5,
            count2: 1
        }
    }

    handleShow() {
        this.setState({
            show: !this.state.show
        });
        this.setState({
            count: this.state.count == 5 ? 0 : 5
        });
    }

    handlePlus() {
        this.setState({
            count2: this.state.count2 + 1
        });
    }

    handleMinus() {
        this.setState({
            count2: this.state.count2 - 1
        });
    }

    render() {
        return (
            <div style={{
                padding: 20
            }}>
                <h1>基本模式</h1>
                <Badge count={5}>
                    <a href="#" className="head-example"></a>
                </Badge>
                <h1>小点</h1>
                <Badge dot={true}>
                    <a href="#" className="head-example"></a>
                </Badge>
                <h1>文字型</h1>
                <Badge text={"NEW"}>
                    <a href="#" className="head-example"></a>
                </Badge>
                <h1>显示/隐藏</h1>
                <Badge count={this.state.count}>
                    <a href="#" className="head-example"></a>
                </Badge>
                <div style={{
                    display: 'inline-block',
                    width: 20,
                    height: 20
                }}></div>
                <Badge dot={this.state.show}>
                    <a href="#" className="head-example"></a>
                </Badge>
                <div>
                    <Button type="outline" onClick={this.handleShow.bind(this)}>显示/隐藏</Button>
                </div>
                <h1>数字增减</h1>
                <Badge count={this.state.count2}>
                    <a href="#" className="head-example"></a>
                </Badge>
                <div>
                    <Button size="small" type="outline" onClick={this.handlePlus.bind(this)} style={{
                        marginRight: 10
                    }}>+</Button>
                    <Button size="small" type="outline" onClick={this.handleMinus.bind(this)}>-</Button>
                </div>
            </div>
        );
    }
};

module.exports = Demo;
