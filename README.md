---

## uxcore-badge

[![Test Coverage](https://img.shields.io/coveralls/uxcore/uxcore-badge.svg?style=flat-square)](https://coveralls.io/r/uxcore/uxcore-badge?branch=master)
[![Dependency Status](http://img.shields.io/david/uxcore/uxcore-badge.svg?style=flat-square)](https://david-dm.org/uxcore/uxcore-badge)
[![devDependency Status](http://img.shields.io/david/dev/uxcore/uxcore-badge.svg?style=flat-square)](https://david-dm.org/uxcore/uxcore-badge#info=devDependencies)

## TL;DR

uxcore-badge ui component for react

#### setup develop environment

```sh
$ git clone https://github.com/uxcore/uxcore-badge
$ cd uxcore-badge
$ npm install
$ gulp server
```

## Usage

## demo
http://uxcore.github.io/

## API

## Props

| 配置项 |  类型   | 必填     | 默认值 | 功能/备注 |
|-------|--------|----------|-------|---|
| prefixCls | string | optional | kuma-badge | 类名前缀，不想使用 kuma 主题时使用 |
| className | string | optional | - | 额外类名 |
| count | number | optional | -     | 展示的数字，大于 overflowCount 时显示为 overflowCount+，为 0 时隐藏 |
| overflowCount | number | optional | 99 | 展示封顶的数字值|
| dot | boolean | optional | false | 不展示数字，只有一个小红点|
| text | string | optional | "" | 展示的文字 |

