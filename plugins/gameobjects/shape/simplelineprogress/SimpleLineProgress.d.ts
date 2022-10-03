import BaseShapes from '../shapes/BaseShapes';

// import * as Phaser from 'phaser';
export default SimpleLineProgress;

declare namespace SimpleLineProgress {

    type ValueChangeCallbackType = (
        newValue: number,
        oldValue: number,
        circularProgress: SimpleLineProgress
    ) => void;

    interface IConfig {
        x?: number, y?: number,
        width?: number, height?: number,

        trackColor?: string | number,
        trackThickness?: number,
        trackStrokeColor?: string | number,
        barColor?: string | number,

        value?: number,

        easeValue?: {
            duration?: number,
            ease?: string
        },

        valuechangeCallback: ValueChangeCallbackType,
    }

    namespace Events {
        type ValueChangeCallbackType = (
            newValue: number,
            oldValue: number,
            circularProgress: SimpleLineProgress
        ) => void;
    }
}

declare class SimpleLineProgress extends BaseShapes {
    constructor(
        scene: Phaser.Scene,
        config?: SimpleLineProgress.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x?: number, y?: number,
        width?: number, height?: number,
        config?: SimpleLineProgress.IConfig
    );

    value: number;
    getValue(min?: number, max?: number): number;
    setValue(value?: number, min?: number, max?: number): this;
    addValue(inc?: number, min?: number, max?: number): this;

    easeValueTo(value?: number, min?: number, max?: number): this;
    stopEaseValue(): this;
    setEaseValueDuration(duration: number): this;
    setEaseValueFunction(ease: string): this;

    trackColor: string;
    setTrackColor(radius?: string | number): this;

    trackStrokeThickness: number;
    trackStrokeColor: string;
    setTrackStroke(
        lineWidth?: number,
        color?: string | number
    ): this;

    barColor: string;
    setBarColor(barColor?: string | number): this;

    rtl: boolean;
    setRTL(enable?: boolean): this;
}