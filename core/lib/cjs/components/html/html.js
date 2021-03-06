"use strict";
/*
 * Copyright 2018 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classnames_1 = tslib_1.__importDefault(require("classnames"));
var React = tslib_1.__importStar(require("react"));
var classes_1 = require("../../common/classes");
function htmlElement(tagName, tagClassName) {
    return function (props) {
        var className = props.className, elementRef = props.elementRef, htmlProps = tslib_1.__rest(props, ["className", "elementRef"]);
        return React.createElement(tagName, tslib_1.__assign({}, htmlProps, { className: classnames_1.default(tagClassName, className), ref: elementRef }));
    };
}
// the following components are linted by blueprint-html-components because
// they should rarely be used without the Blueprint classes/styles:
exports.H1 = htmlElement("h1", classes_1.HEADING);
exports.H2 = htmlElement("h2", classes_1.HEADING);
exports.H3 = htmlElement("h3", classes_1.HEADING);
exports.H4 = htmlElement("h4", classes_1.HEADING);
exports.H5 = htmlElement("h5", classes_1.HEADING);
exports.H6 = htmlElement("h6", classes_1.HEADING);
exports.Blockquote = htmlElement("blockquote", classes_1.BLOCKQUOTE);
exports.Code = htmlElement("code", classes_1.CODE);
exports.Pre = htmlElement("pre", classes_1.CODE_BLOCK);
exports.Label = htmlElement("label", classes_1.LABEL);
// these two are not linted by blueprint-html-components because there are valid
// uses of these elements without Blueprint styles:
exports.OL = htmlElement("ol", classes_1.LIST);
exports.UL = htmlElement("ul", classes_1.LIST);
//# sourceMappingURL=html.js.map