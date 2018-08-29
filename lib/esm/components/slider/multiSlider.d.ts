/// <reference types="react" />
import * as React from "react";
import { Intent } from "../../common";
import { AbstractPureComponent } from "../../common/abstractPureComponent";
import { IProps } from "../../common/props";
import { IHandleProps } from "./handleProps";
/** A convenience type for React's optional children prop. */
export interface IChildrenProps {
    children?: React.ReactNode;
}
export interface ISliderBaseProps extends IProps {
    /**
     * Whether the slider is non-interactive.
     * @default false
     */
    disabled?: boolean;
    /**
     * Increment between successive labels. Must be greater than zero.
     * @default 1
     */
    labelStepSize?: number;
    /**
     * Number of decimal places to use when rendering label value. Default value is the number of
     * decimals used in the `stepSize` prop. This prop has _no effect_ if you supply a custom
     * `labelRenderer` callback.
     * @default inferred from stepSize
     */
    labelPrecision?: number;
    /**
     * Maximum value of the slider.
     * @default 10
     */
    max?: number;
    /**
     * Minimum value of the slider.
     * @default 0
     */
    min?: number;
    /**
     * Whether a solid bar should be rendered on the track between current and initial values,
     * or between handles for `RangeSlider`.
     * @default true
     */
    showTrackFill?: boolean;
    /**
     * Increment between successive values; amount by which the handle moves. Must be greater than zero.
     * @default 1
     */
    stepSize?: number;
    /**
     * Callback to render a single label. Useful for formatting numbers as currency or percentages.
     * If `true`, labels will use number value formatted to `labelPrecision` decimal places.
     * If `false`, labels will not be shown.
     * @default true
     */
    labelRenderer?: boolean | ((value: number) => string | JSX.Element);
    /**
     * Whether to show the slider in a vertical orientation.
     * @default false
     */
    vertical?: boolean;
}
export interface IMultiSliderProps extends ISliderBaseProps {
    /** Default intent of a track segment, used only if no handle specifies `intentBefore/After`. */
    defaultTrackIntent?: Intent;
    /** Callback invoked when a handle value changes. Receives handle values in sorted order. */
    onChange?(values: number[]): void;
    /** Callback invoked when a handle is released. Receives handle values in sorted order. */
    onRelease?(values: number[]): void;
}
export interface ISliderState {
    labelPrecision?: number;
    /** the client size, in pixels, of one tick */
    tickSize?: number;
    /** the size of one tick as a ratio of the component's client size */
    tickSizeRatio?: number;
}
export declare class MultiSlider extends AbstractPureComponent<IMultiSliderProps, ISliderState> {
    static defaultSliderProps: ISliderBaseProps;
    static defaultProps: IMultiSliderProps;
    static displayName: string;
    static Handle: React.SFC<IHandleProps>;
    state: ISliderState;
    private handleElements;
    private handleProps;
    private trackElement;
    render(): JSX.Element;
    componentWillMount(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillReceiveProps(nextProps: IMultiSliderProps & IChildrenProps): void;
    protected validateProps(props: IMultiSliderProps & IChildrenProps): void;
    private formatLabel(value);
    private renderLabels();
    private renderTracks();
    private renderTrackFill(index, start, end);
    private renderHandles();
    private addHandleRef;
    private maybeHandleTrackClick;
    private maybeHandleTrackTouch;
    private canHandleTrackEvent;
    private nearestHandleForValue(handles, getOffset);
    private getHandlerForIndex;
    private getNewHandleValues(newValue, oldIndex);
    private findFirstLockedHandleIndex(startIndex, endIndex);
    private handleChange;
    private handleRelease;
    private getLabelPrecision({labelPrecision, stepSize});
    private getOffsetRatio(value);
    private getTrackIntent(start, end?);
    private updateTickSize();
}
