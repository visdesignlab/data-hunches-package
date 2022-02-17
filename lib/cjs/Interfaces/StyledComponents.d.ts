export declare const useStyles: (props?: any) => import("@material-ui/styles").ClassNameMap<"rightToolbar" | "menuButton" | "foreignObjectContainer" | "radioStyle" | "catText" | "colorBox">;
interface FontProps {
    fontSize: 'large' | 'small';
    isHighlighted: boolean;
}
export declare const DHIndicatorText: import("styled-components").StyledComponent<"text", any, FontProps, never>;
interface RectProps {
    x: number;
    y: number;
    width: number;
}
export declare const DHIndicatorRect: import("styled-components").StyledComponent<"rect", any, RectProps, never>;
export {};
