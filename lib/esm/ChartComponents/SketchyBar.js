import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { observer } from "mobx-react-lite";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import * as rough from 'roughjs/bin/rough';
import { BrightOrange } from "../Interfaces/Constants";
var SketchyBar = function (_a) {
    var xPos = _a.xPos, yPos = _a.yPos, width = _a.width, height = _a.height;
    var svgRef = useRef(null);
    useLayoutEffect(function () {
        console.log('run');
        if (svgRef.current) {
            var drawingG = svgRef.current;
            var rc = rough.default.svg(drawingG);
            var sketchyDH = rc.rectangle(xPos, yPos, width, height, {
                fill: BrightOrange,
                stroke: BrightOrange,
                fillStyle: 'zigzag',
                roughness: 2.8,
                hachureAngle: 60,
                hachureGap: 10,
                fillWeight: 2,
                strokeWidth: 2,
            });
            drawingG.appendChild(sketchyDH);
        }
    }, [xPos, yPos, width, height]);
    return (_jsx(_Fragment, {}, void 0));
};
export default observer(SketchyBar);
