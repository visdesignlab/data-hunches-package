export declare const useStyles: (props?: any) => import("@material-ui/styles").ClassNameMap<"table" | "noBulletsList" | "inputSelect" | "rightToolbar" | "menuButton" | "foreignObjectContainer" | "specificControlContainer" | "radioStyle" | "catText" | "colorBox" | "overrideButton">;
interface FontProps {
    fontSize: 'larger' | 'small';
    isHighlighted: boolean;
    isSelected: boolean;
    needBold: boolean;
}
export declare const DHIndicatorText: import("styled-components").StyledComponent<"text", any, FontProps, never>;
interface RectProps {
    x: number;
    y: number;
    width: number;
}
export declare const NonRoughDHIndicatorRect: import("styled-components").StyledComponent<"rect", any, RectProps, never>;
export declare const NonCapButton: import("styled-components").StyledComponent<import("@material-ui/core").ExtendButtonBase<import("@material-ui/core").ButtonTypeMap<{}, "button">>, any, {}, never>;
export declare const ContainerDiv: import("styled-components").StyledComponent<import("@material-ui/core/OverridableComponent").OverridableComponent<import("@material-ui/core").ContainerTypeMap<{}, "div">>, any, {}, never>;
export {};
