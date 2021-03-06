/// <reference types="react" />
import * as React from "react";
import { IElementRefProps } from "../html/html";
export interface IHTMLTableProps extends React.HTMLAttributes<HTMLTableElement>, IElementRefProps<HTMLTableElement> {
    /** Enables borders between rows and cells. */
    bordered?: boolean;
    /** Enables hover styles on row. */
    interactive?: boolean;
    /** Use small, condensed appearance. */
    small?: boolean;
    /** Use an alternate background color on odd rows. */
    striped?: boolean;
}
export declare class HTMLTable extends React.PureComponent<IHTMLTableProps> {
    render(): JSX.Element;
}
