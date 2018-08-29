"use strict";
/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var __1 = require("..");
var common_1 = require("../../common");
var Classes = tslib_1.__importStar(require("../../common/classes"));
var Keys = tslib_1.__importStar(require("../../common/keys"));
var props_1 = require("../../common/props");
var Utils = tslib_1.__importStar(require("../../common/utils"));
var tab_1 = require("./tab");
var tabTitle_1 = require("./tabTitle");
exports.Expander = function () { return React.createElement("div", { className: Classes.FLEX_EXPANDER }); };
var TAB_SELECTOR = "." + Classes.TAB;
var OVERFLOW_SELECTOR = "." + Classes.OVERFLOW_LIST;
var lastOverflowArray = [];
var Tabs = /** @class */ (function (_super) {
    tslib_1.__extends(Tabs, _super);
    function Tabs(props) {
        var _this = _super.call(this, props) || this;
        _this.refHandlers = {
            overflowList: function (tabElement) { return (_this.overflowElement = tabElement); },
            tablist: function (tabElement) { return (_this.tablistElement = tabElement); },
        };
        _this.overflowRenderer = function (items) {
            var firstId = null;
            var overflowMenu = (React.createElement(__1.Menu, null, items.map(function (item) {
                if (item.props.id) {
                    firstId = item.props.id;
                    var onClick = function (e) {
                        item.props.onClick(item.props.id, e);
                    };
                    return (React.createElement(__1.MenuItem, { key: item.props.id, text: item.props.title, onClick: onClick, disabled: item.props.disabled, active: item.props.selected }));
                }
                else {
                    return item;
                }
            })));
            return (React.createElement(__1.Popover, { content: overflowMenu },
                React.createElement(tabTitle_1.TabTitle, { id: firstId + "-overflow", title: "Overflow" })));
        };
        _this.visibleItemRenderer = function (item) {
            return item;
        };
        _this.handleKeyDown = function (e) {
            var focusedElement = document.activeElement.closest(TAB_SELECTOR);
            // rest of this is potentially expensive and futile, so bail if no tab is focused
            if (focusedElement == null) {
                return;
            }
            // must rely on DOM state because we have no way of mapping `focusedElement` to a JSX.Element
            var enabledTabElements = _this.getTabElements().filter(function (el) { return el.getAttribute("aria-disabled") === "false"; });
            var focusedIndex = enabledTabElements.indexOf(focusedElement);
            var direction = _this.getKeyCodeDirection(e);
            if (focusedIndex >= 0 && direction !== undefined) {
                e.preventDefault();
                var length_1 = enabledTabElements.length;
                // auto-wrapping at 0 and `length`
                var nextFocusedIndex = (focusedIndex + direction + length_1) % length_1;
                enabledTabElements[nextFocusedIndex].focus();
            }
        };
        _this.handleKeyPress = function (e) {
            var targetTabElement = e.target.closest(TAB_SELECTOR);
            if (targetTabElement != null && isEventKeyCode(e, Keys.SPACE, Keys.ENTER)) {
                e.preventDefault();
                targetTabElement.click();
            }
        };
        _this.handleTabClick = function (newTabId, event) {
            Utils.safeInvoke(_this.props.onChange, newTabId, _this.state.selectedTabId, event);
            if (_this.props.selectedTabId === undefined) {
                _this.setState({ selectedTabId: newTabId });
            }
        };
        // Whenever overflowList detects a grow and shrink, call the moveSelectionIndicator
        _this.onOverflow = function (overflowItems) {
            var OVERFLOW_KEYWORD = "Overflow";
            var onZeroEdgeCase = overflowItems.length === 0 && lastOverflowArray[0] !== OVERFLOW_KEYWORD;
            if (lastOverflowArray.length >= overflowItems.length) {
                if (onZeroEdgeCase) {
                    _this.moveSelectionIndicator(true);
                    lastOverflowArray = [OVERFLOW_KEYWORD];
                    return;
                }
                lastOverflowArray = [];
            }
            else {
                lastOverflowArray = overflowItems;
                _this.moveSelectionIndicator(true);
            }
        };
        _this.renderTabPanel = function (tab) {
            var _a = tab.props, className = _a.className, panel = _a.panel, id = _a.id;
            if (panel === undefined) {
                return undefined;
            }
            return (React.createElement("div", { "aria-labelledby": tabTitle_1.generateTabTitleId(_this.props.id, id), "aria-hidden": id !== _this.state.selectedTabId, className: classnames_1.default(Classes.TAB_PANEL, className), id: tabTitle_1.generateTabPanelId(_this.props.id, id), key: id, role: "tabpanel" }, panel));
        };
        _this.renderTabTitle = function (tab) {
            var id = tab.props.id;
            return (React.createElement(tabTitle_1.TabTitle, tslib_1.__assign({}, tab.props, { parentId: _this.props.id, onClick: _this.handleTabClick, selected: id === _this.state.selectedTabId })));
        };
        var selectedTabId = _this.getInitialSelectedTabId();
        _this.state = { selectedTabId: selectedTabId };
        return _this;
    }
    Tabs.prototype.render = function () {
        var _this = this;
        var _a = this.state, indicatorWrapperStyle = _a.indicatorWrapperStyle, selectedTabId = _a.selectedTabId;
        var tabTitles = React.Children.map(this.props.children, function (child) { return (Utils.isElementOfType(child, tab_1.Tab) ? _this.renderTabTitle(child) : child); });
        var tabPanels = this.getTabChildren()
            .filter(this.props.renderActiveTabPanelOnly ? function (tab) { return tab.props.id === selectedTabId; } : function () { return true; })
            .map(this.renderTabPanel);
        var tabIndicator = this.props.animate ? (React.createElement("div", { className: Classes.TAB_INDICATOR_WRAPPER, style: indicatorWrapperStyle },
            React.createElement("div", { className: Classes.TAB_INDICATOR }))) : null;
        var classes = classnames_1.default(Classes.TABS, (_b = {}, _b[Classes.VERTICAL] = this.props.vertical, _b), this.props.className);
        var tabListClasses = classnames_1.default(Classes.TAB_LIST, (_c = {},
            _c[Classes.LARGE] = this.props.large,
            _c));
        return (React.createElement("div", { className: classes },
            React.createElement("div", { className: tabListClasses, onKeyDown: this.handleKeyDown, onKeyPress: this.handleKeyPress, ref: this.refHandlers.tablist, role: "tablist" },
                tabIndicator,
                this.props.overflow ? (React.createElement(__1.OverflowList, tslib_1.__assign({ items: tabTitles, visibleItemRenderer: this.visibleItemRenderer, overflowRenderer: this.overflowRenderer, ref: this.refHandlers.overflowList }, this.props.overflowListProps, { onOverflow: this.onOverflow }))) : (tabTitles)),
            tabPanels));
        var _b, _c;
    };
    Tabs.prototype.componentDidMount = function () {
        this.moveSelectionIndicator();
    };
    Tabs.prototype.componentWillReceiveProps = function (_a) {
        var selectedTabId = _a.selectedTabId, overflow = _a.overflow;
        if (selectedTabId !== undefined) {
            // keep state in sync with controlled prop, so state is canonical source of truth
            this.setState({ selectedTabId: selectedTabId });
            // Move selection indicator if the status of the overflow prop is changed
            overflow !== this.props.overflow ? this.moveSelectionIndicator() : null;
        }
    };
    Tabs.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.state.selectedTabId !== prevState.selectedTabId) {
            this.moveSelectionIndicator();
        }
        else if (prevState.selectedTabId !== null) {
            // comparing React nodes is difficult to do with simple logic, so
            // shallowly compare just their props as a workaround.
            var didChildrenChange = !Utils.arraysEqual(this.getTabChildrenProps(prevProps), this.getTabChildrenProps(), Utils.shallowCompareKeys);
            if (didChildrenChange) {
                this.moveSelectionIndicator();
            }
        }
    };
    Tabs.prototype.getInitialSelectedTabId = function () {
        // NOTE: providing an unknown ID will hide the selection
        var _a = this.props, defaultSelectedTabId = _a.defaultSelectedTabId, selectedTabId = _a.selectedTabId;
        if (selectedTabId !== undefined) {
            return selectedTabId;
        }
        else if (defaultSelectedTabId !== undefined) {
            return defaultSelectedTabId;
        }
        else {
            // select first tab in absence of user input
            var tabs = this.getTabChildren();
            return tabs.length === 0 ? undefined : tabs[0].props.id;
        }
    };
    Tabs.prototype.getKeyCodeDirection = function (e) {
        if (isEventKeyCode(e, Keys.ARROW_LEFT, Keys.ARROW_UP)) {
            return -1;
        }
        else if (isEventKeyCode(e, Keys.ARROW_RIGHT, Keys.ARROW_DOWN)) {
            return 1;
        }
        return undefined;
    };
    Tabs.prototype.getTabChildrenProps = function (props) {
        if (props === void 0) { props = this.props; }
        return this.getTabChildren(props).map(function (child) { return child.props; });
    };
    /** Filters children to only `<Tab>`s */
    Tabs.prototype.getTabChildren = function (props) {
        if (props === void 0) { props = this.props; }
        return React.Children.toArray(props.children).filter(function (child) {
            return Utils.isElementOfType(child, tab_1.Tab);
        });
    };
    /** Queries root HTML element for all tabs with optional filter selector */
    Tabs.prototype.getTabElements = function (subselector) {
        if (subselector === void 0) { subselector = ""; }
        if (this.tablistElement == null) {
            return [];
        }
        return Array.from(this.tablistElement.querySelectorAll(TAB_SELECTOR + subselector));
    };
    /**
     * Calculate the new height, width, and position of the tab indicator.
     * Store the CSS values so the transition animation can start.
     */
    Tabs.prototype.moveSelectionIndicator = function (onOverflow) {
        var _this = this;
        if (onOverflow === void 0) { onOverflow = false; }
        if (this.tablistElement == null || !this.props.animate) {
            return;
        }
        window.requestAnimationFrame(function () {
            var tabIdSelector = TAB_SELECTOR + "[data-tab-id=\"" + _this.state.selectedTabId + "\"]";
            var selectedTabElement = _this.tablistElement.querySelector(tabIdSelector);
            var overflowElement = _this.tablistElement.querySelector(OVERFLOW_SELECTOR);
            var overflowChildren = overflowElement && overflowElement.children;
            var indicatorWrapperStyle = { display: "none" };
            var indicatorWrapperCreator = function (clientHeight, clientWidth, offsetLeft, offsetTop) {
                return {
                    height: clientHeight,
                    transform: "translateX(" + Math.floor(offsetLeft) + "px) translateY(" + Math.floor(offsetTop) + "px)",
                    width: clientWidth,
                };
            };
            // Set indicator below tab or below overflowList element
            if (selectedTabElement !== null) {
                var clientHeight = selectedTabElement.clientHeight, clientWidth = selectedTabElement.clientWidth, offsetLeft = selectedTabElement.offsetLeft, offsetTop = selectedTabElement.offsetTop;
                indicatorWrapperStyle = indicatorWrapperCreator(clientHeight, clientWidth, offsetLeft, offsetTop);
            }
            else if (onOverflow && selectedTabElement === null) {
                // Find the overflow drop down span in order to select it
                var numTabChildren = overflowChildren.length;
                // Get status of overflowProp, need to know if its default or set by overflowListProps
                var collapseFrom = _this.overflowElement.props.collapseFrom;
                var overflowListElement = collapseFrom === common_1.Boundary.END ? overflowChildren[numTabChildren - 2] : overflowChildren[0];
                var clientHeight = overflowListElement.clientHeight, clientWidth = overflowListElement.clientWidth;
                // No need for left and top offsets but leaving them in for now
                indicatorWrapperStyle = indicatorWrapperCreator(clientHeight, clientWidth, 0, 0);
            }
            _this.setState({ indicatorWrapperStyle: indicatorWrapperStyle });
        });
    };
    /** Insert a `Tabs.Expander` between any two children to right-align all subsequent children. */
    Tabs.Expander = exports.Expander;
    Tabs.Tab = tab_1.Tab;
    Tabs.defaultProps = {
        animate: true,
        large: false,
        renderActiveTabPanelOnly: false,
        vertical: false,
    };
    Tabs.displayName = props_1.DISPLAYNAME_PREFIX + ".Tabs";
    return Tabs;
}(common_1.AbstractPureComponent));
exports.Tabs = Tabs;
function isEventKeyCode(e) {
    var codes = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        codes[_i - 1] = arguments[_i];
    }
    return codes.indexOf(e.which) >= 0;
}
//# sourceMappingURL=tabs.js.map