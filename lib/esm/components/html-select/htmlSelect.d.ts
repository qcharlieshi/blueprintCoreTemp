/// <reference types="react" />
import * as React from "react";
import { IOptionProps } from "../../common/props";
import { IElementRefProps } from "../html/html";
export interface IHTMLSelectProps extends IElementRefProps<HTMLSelectElement>, React.SelectHTMLAttributes<HTMLSelectElement> {
    /** Whether this element is non-interactive. */
    disabled?: boolean;
    /** Whether this element should fill its container. */
    fill?: boolean;
    /** Whether to use large styles. */
    large?: boolean;
    /** Whether to use minimal styles. */
    minimal?: boolean;
    /** Multiple select is not supported. */
    multiple?: never;
    /** Change event handler. Use `event.currentTarget.value` to access the new value. */
    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
    /**
     * Shorthand for supplying options: an array of basic types or
     * `{ label?, value }` objects. If no `label` is supplied, `value`
     * will be used as the label.
     */
    options?: Array<string | number | IOptionProps>;
    /** Controlled value of this component. */
    value?: string | number;
}
export declare class HTMLSelect extends React.PureComponent<IHTMLSelectProps> {
    render(): JSX.Element;
}
