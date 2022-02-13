import { jsx as _jsx } from "react/jsx-runtime";
import { max } from "d3-array";
import { observer } from "mobx-react-lite";
import { useLayoutEffect, useRef } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { DataContext } from "..";
import { makeVerticalScale, makeBandScale } from "../HelperFunctions/ScaleGenerator";
import { BrightOrange, DarkGray, margin } from "../Interfaces/Constants";
import { stateUpdateWrapperUseJSON } from "../Interfaces/StateChecker";
import Store from "../Interfaces/Store";
import 'roughjs';
import * as rough from 'roughjs/bin/rough';
import { select } from "d3-selection";
var DataHunchIndicator = function (_a) {
    var dataHunchArray = _a.dataHunchArray;
    var store = useContext(Store);
    var dataSet = useContext(DataContext);
    var verticalValueScale = makeVerticalScale(dataSet, store.svgHeight);
    var honrizontalBandScale = makeBandScale(dataSet, store.svgWidth);
    // const categoricalColorScale = makeCategoricalScale(dataSet);
    var _b = useState([]), inVisDH = _b[0], setInVisDH = _b[1];
    var _c = useState([]), offVisDH = _c[0], setOffVisDH = _c[1];
    var dhRef = useRef(null);
    useEffect(function () {
        var tempInVis = [];
        var tempOffVis = [];
        dataHunchArray.forEach(function (d) {
            if (['annotation', 'exclusion'].includes(d.type)) {
                tempOffVis.push(d);
            }
            else {
                tempInVis.push(d);
            }
        });
        stateUpdateWrapperUseJSON(inVisDH, tempInVis, setInVisDH);
        stateUpdateWrapperUseJSON(offVisDH, tempOffVis, setOffVisDH);
    }, [dataHunchArray]);
    var calculateY = function (dataHunch, rangeCenter) {
        if (dataHunch.type === 'range') {
            var parsedRange = JSON.parse('[' + dataHunch.content + ']');
            if (rangeCenter) {
                var center = 0.5 * (parsedRange[0] + parsedRange[1]);
                return verticalValueScale(center) - 2;
            }
            else {
                return verticalValueScale(max(parsedRange));
            }
        }
        return verticalValueScale(parseFloat(dataHunch.content));
    };
    var calculateHeight = function (dataHunch) {
        if (dataHunch.type === 'range') {
            var parsedRange = JSON.parse('[' + dataHunch.content + ']');
            console.log(parsedRange, dataHunch);
            return Math.abs(verticalValueScale(parsedRange[0]) - verticalValueScale(parsedRange[1]));
        }
        else {
            return store.svgHeight - margin.bottom - verticalValueScale(parseFloat(dataHunch.content));
        }
    };
    useLayoutEffect(function () {
        if (inVisDH.length <= 3) {
            if (dhRef.current !== null) {
                select(dhRef.current).selectAll('*').remove();
                var drawingG_1 = dhRef.current;
                var rc_1 = rough.default.svg(drawingG_1);
                inVisDH.forEach(function (d, i) {
                    var xPos = (honrizontalBandScale(d.label) || 0) + (honrizontalBandScale.bandwidth() / inVisDH.length * i);
                    var sketchyDH = rc_1.rectangle(xPos, calculateY(d, false), honrizontalBandScale.bandwidth() / inVisDH.length, calculateHeight(d), {
                        fill: BrightOrange,
                        stroke: BrightOrange,
                        fillStyle: 'zigzag',
                        roughness: 2.8,
                        hachureAngle: 60,
                        hachureGap: 10,
                        fillWeight: 2,
                        strokeWidth: 2,
                    });
                    drawingG_1.appendChild(sketchyDH);
                    // const sketchyDH = rc.rectangle(100, 100, 100, 100, {
                    //     fill: BrightOrange,
                    //     stroke: BrightOrange,
                    //     fillStyle: 'zigzag',
                    //     roughness: 2.8,
                    //     hachureAngle: 60,
                    //     hachureGap: 10,
                    //     fillWeight: 2,
                    //     strokeWidth: 2,
                });
            }
            ;
        }
    }, [inVisDH]);
    return (_jsx("g", { children: inVisDH.length > 3 ?
            inVisDH.map(function (d) {
                return (_jsx("rect", { x: honrizontalBandScale(d.label), width: honrizontalBandScale.bandwidth(), y: calculateY(d, true), height: 2, fill: DarkGray, opacity: 0.7 }, d.id));
            }) : _jsx("g", { ref: dhRef }, void 0) }, void 0));
};
export default observer(DataHunchIndicator);
