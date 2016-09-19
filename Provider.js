var Inferno = require('inferno');
var Component = require('inferno-component');
var createClass = require('inferno-create-class');

var specialReactKeys = {
    children: true,
    key: true,
    ref: true
};
var PropTypesAny = function() {
};

function ChildrenOnly(children) {
    children = toArray(children);
    if (children.length !== 1) throw new Error('ChildrenOnly() expects only one child.');
    return children[0];
}

var Provider = createClass({
    displayName: "Provider",

    render: function() {
        return ChildrenOnly(this.props.children);
    },

    getChildContext: function() {
        var stores = {};
        // inherit stores
        var baseStores = this.context.mobxStores;

        if (baseStores) for (var key in baseStores) {
            stores[key] = baseStores[key];
        }
        // add own stores
        for (var key in this.props) {
            if (!specialReactKeys[key]) {
                stores[key] = this.props[key];
            }
        }
        return {
            mobxStores: stores
        };
    },

    componentWillReceiveProps: function(nextProps) {
        // Maybe this warning is to aggressive?
        if (Object.keys(nextProps).length !== Object.keys(this.props).length) {
            console.warn("MobX Provider: The set of provided stores has changed. Please avoid changing stores as the change might not propagate to all children");

        }
        for (var key in nextProps) {
            if (!specialReactKeys[key] && this.props[key] !== nextProps[key]) {
                console.warn("MobX Provider: Provided store '" + key + "' has changed. Please avoid replacing stores as the change might not propagate to all children");
            }
        }
    }
});

Provider.contextTypes = { mobxStores: PropTypesAny };
Provider.childContextTypes = { mobxStores: PropTypesAny };

exports.default = Provider;
