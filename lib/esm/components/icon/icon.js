/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import classNames from "classnames";
import * as React from "react";
import { IconSvgPaths16, IconSvgPaths20 } from "@blueprintjs/icons";
import { Classes, DISPLAYNAME_PREFIX } from "../../common";
var Icon = /** @class */ (function (_super) {
    tslib_1.__extends(Icon, _super);
    function Icon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Icon.prototype.render = function () {
        var _a = this.props, className = _a.className, color = _a.color, icon = _a.icon, _b = _a.iconSize, iconSize = _b === void 0 ? Icon.SIZE_STANDARD : _b, intent = _a.intent, _c = _a.title, title = _c === void 0 ? icon : _c, svgProps = tslib_1.__rest(_a, ["className", "color", "icon", "iconSize", "intent", "title"]);
        if (icon == null) {
            return null;
        }
        else if (typeof icon !== "string") {
            return icon;
        }
        // choose which pixel grid is most appropriate for given icon size
        var pixelGridSize = iconSize >= Icon.SIZE_LARGE ? Icon.SIZE_LARGE : Icon.SIZE_STANDARD;
        var paths = this.renderSvgPaths(pixelGridSize, icon);
        if (paths == null) {
            return null;
        }
        var classes = classNames(Classes.ICON, Classes.intentClass(intent), className);
        var viewBox = "0 0 " + pixelGridSize + " " + pixelGridSize;
        // ICON class will apply a "fill" CSS style, so we need to inject an inline style to override it
        var _d = this.props.style, style = _d === void 0 ? {} : _d;
        if (color != null) {
            style = tslib_1.__assign({}, style, { fill: color });
        }
        return (React.createElement("svg", tslib_1.__assign({}, svgProps, { className: classes, style: style, "data-icon": icon, width: iconSize, height: iconSize, viewBox: viewBox }),
            title && React.createElement("desc", null, title),
            paths));
    };
    Icon.prototype.renderSvgPaths = function (pathsSize, iconName) {
        var svgPathsRecord = pathsSize === Icon.SIZE_STANDARD ? IconSvgPaths16 : IconSvgPaths20;
        var pathStrings = svgPathsRecord[iconName];
        if (pathStrings == null) {
            return null;
        }
        return pathStrings.map(function (d, i) { return React.createElement("path", { key: i, d: d, fillRule: "evenodd" }); });
    };
    Icon.displayName = DISPLAYNAME_PREFIX + ".Icon";
    Icon.SIZE_STANDARD = 16;
    Icon.SIZE_LARGE = 20;
    return Icon;
}(React.PureComponent));
export { Icon };
//# sourceMappingURL=icon.js.map