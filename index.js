var mobx = require('mobx');
var Inferno = require('inferno');

Object.defineProperty(exports, "__esModule", {
    value: true
});

let TARGET__ = typeof __TARGET__ === 'undefined' ? 'browser' : __TARGET__
let TARGET_LIB_NAME;
if (TARGET__ === 'browser') TARGET_LIB_NAME = 'mobx-react';
if (TARGET__ === 'native') TARGET_LIB_NAME = 'mobx-react/native';
if (TARGET__ === 'custom') TARGET_LIB_NAME = 'mobx-react/custom';

if (!mobx)
    throw new Error(TARGET_LIB_NAME + ' requires the MobX package');
if (!Inferno)
    throw new Error(TARGET_LIB_NAME + ' requires Inferno to be available');

var observer = require('./observer');
var Provider = require('./Provider');
var inject = require('./inject');

/* DevTool support */
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobxReact(module.exports, mobx)
}

exports.default = {
    observer: observer.observer,
    renderReporter: observer.renderReporter,
    componentByNodeRegistery: observer.componentByNodeRegistery,
    trackComponents: observer.trackComponents,
    Provider: Provider,
    inject: inject
};
module.exports = exports['default'];
