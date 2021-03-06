/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import { Children } from "react";
import { isElementOfType, safeInvoke } from "../../common/utils";
import { Hotkey } from "./hotkey";
import { comboMatches, getKeyCombo, parseKeyCombo } from "./hotkeyParser";
import { hideHotkeysDialogAfterDelay, isHotkeysDialogShowing, showHotkeysDialog } from "./hotkeysDialog";
var SHOW_DIALOG_KEY = "?";
export var HotkeyScope;
(function (HotkeyScope) {
    HotkeyScope["LOCAL"] = "local";
    HotkeyScope["GLOBAL"] = "global";
})(HotkeyScope || (HotkeyScope = {}));
var HotkeysEvents = /** @class */ (function () {
    function HotkeysEvents(scope) {
        var _this = this;
        this.scope = scope;
        this.actions = [];
        this.handleKeyDown = function (e) {
            var combo = getKeyCombo(e);
            var isTextInput = _this.isTextInput(e);
            if (!isTextInput && comboMatches(parseKeyCombo(SHOW_DIALOG_KEY), combo)) {
                if (isHotkeysDialogShowing()) {
                    hideHotkeysDialogAfterDelay();
                }
                else {
                    showHotkeysDialog(_this.actions.map(function (action) { return action.props; }));
                }
                return;
            }
            else if (isHotkeysDialogShowing()) {
                return;
            }
            _this.invokeNamedCallbackIfComboRecognized(combo, "onKeyDown", e);
        };
        this.handleKeyUp = function (e) {
            if (isHotkeysDialogShowing()) {
                return;
            }
            _this.invokeNamedCallbackIfComboRecognized(getKeyCombo(e), "onKeyUp", e);
        };
    }
    HotkeysEvents.prototype.count = function () {
        return this.actions.length;
    };
    HotkeysEvents.prototype.clear = function () {
        this.actions = [];
    };
    HotkeysEvents.prototype.setHotkeys = function (props) {
        var _this = this;
        var actions = [];
        Children.forEach(props.children, function (child) {
            if (isElementOfType(child, Hotkey) && _this.isScope(child.props)) {
                actions.push({
                    combo: parseKeyCombo(child.props.combo),
                    props: child.props,
                });
            }
        });
        this.actions = actions;
    };
    HotkeysEvents.prototype.invokeNamedCallbackIfComboRecognized = function (combo, callbackName, e) {
        var isTextInput = this.isTextInput(e);
        for (var _i = 0, _a = this.actions; _i < _a.length; _i++) {
            var action = _a[_i];
            var shouldIgnore = (isTextInput && !action.props.allowInInput) || action.props.disabled;
            if (!shouldIgnore && comboMatches(action.combo, combo)) {
                if (action.props.preventDefault) {
                    e.preventDefault();
                }
                if (action.props.stopPropagation) {
                    // set a flag just for unit testing. not meant to be referenced in feature work.
                    e.isPropagationStopped = true;
                    e.stopPropagation();
                }
                safeInvoke(action.props[callbackName], e);
            }
        }
    };
    HotkeysEvents.prototype.isScope = function (props) {
        return (props.global ? HotkeyScope.GLOBAL : HotkeyScope.LOCAL) === this.scope;
    };
    HotkeysEvents.prototype.isTextInput = function (e) {
        var elem = e.target;
        // we check these cases for unit testing, but this should not happen
        // during normal operation
        if (elem == null || elem.closest == null) {
            return false;
        }
        var editable = elem.closest("input, textarea, [contenteditable=true]");
        if (editable == null) {
            return false;
        }
        // don't let checkboxes, switches, and radio buttons prevent hotkey behavior
        if (editable.tagName.toLowerCase() === "input") {
            var inputType = editable.type;
            if (inputType === "checkbox" || inputType === "radio") {
                return false;
            }
        }
        // don't let read-only fields prevent hotkey behavior
        if (editable.readOnly) {
            return false;
        }
        return true;
    };
    return HotkeysEvents;
}());
export { HotkeysEvents };
//# sourceMappingURL=hotkeysEvents.js.map