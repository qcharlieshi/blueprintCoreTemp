/// <reference types="react" />
import * as React from "react";
import { Boundary } from "../../common/boundary";
import { IProps } from "../../common/props";
export interface IOverflowListProps<T> extends IProps {
    /**
     * Which direction the items should collapse from: start or end of the
     * children. This also determines whether `overflowRenderer` appears before
     * (`START`) or after (`END`) the visible items.
     * @default Boundary.START
     */
    collapseFrom?: Boundary;
    /**
     * All items to display in the list. Items that do not fit in the container
     * will be rendered in the overflow instead.
     */
    items: T[];
    /**
     * The number of visible items will never be lower than the number passed to
     * this prop.
     * @default 0
     */
    minVisibleItems?: number;
    /**
     * If `true`, all parent DOM elements of the container will also be
     * observed. If changes to a parent's size is detected, the overflow will be
     * recalculated.
     *
     * Only enable this prop if the overflow should be recalculated when a
     * parent element resizes in a way that does not also cause the
     * `OverflowList` to resize.
     * @default false
     */
    observeParents?: boolean;
    /**
     * Callback invoked to render the overflowed items. Unlike
     * `visibleItemRenderer`, this prop is invoked once with all items that do
     * not fit in the container.
     *
     * Typical use cases for this prop will put overflowed items in a dropdown
     * menu or display a "+X items" label.
     */
    overflowRenderer: (overflowItems: T[]) => React.ReactNode;
    /** CSS properties to apply to the root element. */
    style?: React.CSSProperties;
    /**
     * Callback invoked to render each visible item.
     * Remember to set a `key` on the rendered element!
     */
    visibleItemRenderer: (item: T, index: number) => React.ReactChild;
    /**
     * Callback invoked when the overflowList is growing or shrinking.
     * Passes on the overflowItems from the overflowList state
     */
    onOverflow?: (overflowItems: T[]) => void;
}
export interface IOverflowListState<T> {
    overflow: T[];
    visible: T[];
}
export declare class OverflowList<T> extends React.PureComponent<IOverflowListProps<T>, IOverflowListState<T>> {
    static displayName: string;
    static defaultProps: Partial<IOverflowListProps<any>>;
    static ofType<T>(): new (props: IOverflowListProps<T>) => OverflowList<T>;
    state: IOverflowListState<T>;
    /** A cache containing the widths of all elements being observed to detect growing/shrinking */
    private previousWidths;
    private spacer;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: IOverflowListProps<T>): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
    private maybeRenderOverflow();
    private resize;
    private callOnOverflow;
    private repartition(growing);
}
