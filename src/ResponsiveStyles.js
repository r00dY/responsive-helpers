import { RangeMap, RangeSet } from "./Ranges";

function JSToCSS(propName) {
    return propName.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);
}

class ResponsiveSizeSegmentValue {
    constructor(...vals) {
        this._vals = {};

        vals.forEach(val => {
            this.add$(val);
        });
    }

    clone() {
        let valsCloned = [];

        Object.entries(this._vals).forEach(entry => {
            let unit = entry[0];
            let val = entry[1];

            valsCloned.push({
                unit: unit,
                val: typeof val === "object" ? { ...val } : val
            });
        });

        return new ResponsiveSizeSegmentValue(...valsCloned);
    }

    add(val) {
        return this.clone().add$(val);
    }

    add$(val) {
        ResponsiveSizeSegmentValue._normalizeVal(val).forEach(val => {
            if (val.unit === "lin") {
                if (!this._vals["lin"]) {
                    this._vals["lin"] = {
                        from: 0,
                        slope: 0
                    };
                }

                this._vals["lin"].from += val.val.from;
                this._vals["lin"].slope += val.val.slope;
            } else {
                if (!this._vals[val.unit]) {
                    this._vals[val.unit] = 0;
                }

                this._vals[val.unit] += val.val;
            }
        });

        return this;
    }

    subtract(val) {
        return this.clone().add$(
            new ResponsiveSizeSegmentValue(val).multiply$(-1)
        );
    }

    multiply$(scalar) {
        Object.entries(this._vals).forEach(entry => {
            let unit = entry[0];
            let val = entry[1];

            if (unit === "lin") {
                val.from *= scalar;
                val.slope *= scalar;
            } else {
                this._vals[unit] *= scalar;
            }
        });

        return this;
    }

    multiply(scalar) {
        return this.clone().multiply$(scalar);
    }

    divide(scalar) {
        return this.clone().multiply$(1 / scalar);
    }

    get vals() {
        return this._vals;
    }

    getValueFromOffset(offset) {
        let rssv = this.clone();

        if (rssv.vals.lin) {
            rssv.vals.lin.from += rssv.vals.lin.slope * offset;
        }

        return rssv;
    }

    val(unit, offset) {
        offset = offset || 0;

        if (unit === "px") {
            if (this._vals.lin) {
                return this._vals.lin.from + this._vals.lin.slope * offset;
            }

            return 0;
        }

        if (this._vals[unit]) {
            return this._vals[unit];
        }

        return 0;
    }

    css(from) {
        let css = "";

        Object.entries(this._vals).forEach(entry => {
            let unit = entry[0];
            let val = entry[1];

            if (css !== "") {
                css += " + ";
            }

            if (entry[0] === "lin") {
                css += `${val.slope}*100vw + ${-val.slope * from + val.from}px`;
            } else {
                css += `${val}${unit}`;
            }
        });

        return `calc(${css})`;
    }
}

ResponsiveSizeSegmentValue._normalizeVal = val => {
    if (val instanceof ResponsiveSizeSegmentValue) {
        let result = [];

        Object.entries(val.vals).forEach(entry => {
            result.push({
                unit: entry[0],
                val: entry[1]
            });
        });

        return result;
    } else if (Array.isArray(val)) {
        return [
            {
                unit: "lin",
                val: {
                    from: val[0],
                    slope: val[1]
                }
            }
        ];
    } else if (typeof val === "object") {
        return [val];
    } else if (typeof val === "number") {
        return [
            {
                unit: "lin",
                val: {
                    from: val,
                    slope: 0
                }
            }
        ];
    } else if (typeof val === "string") {
        let tmp = val.match(/([\d\.]+)([a-z%]*)/);
        let num = parseFloat(tmp[1]);
        let unit = tmp[2];

        if (unit === "" || unit === "px") {
            return [
                {
                    unit: "lin",
                    val: {
                        from: num,
                        slope: 0
                    }
                }
            ];
        } else {
            return [
                {
                    unit: unit,
                    val: num
                }
            ];
        }
    } else {
        throw "Bad input argument for _normalizeVal in ResponsiveSizeSegmentValue";
    }
};

class ResponsiveSize {
    constructor(input) {
        if (typeof input === "undefined" || typeof input === "null") {
            throw new Error(
                `ResponsiveSize must not be constructed with undefined or null`
            );
        } else if (Array.isArray(input)) {
            throw new Error(
                `ResponsiveSize must not be constructed with array: ${input}. Maybe you meant rslin instead of rs?`
            );
        } else if (typeof input !== "object") {
            input = {
                0: input
            };
        } else {
            if (Object.keys(input).length === 0) {
                throw new Error(`ResponsiveSize input object can't be empty!`);
            }
        }

        let rangeMap;

        if (input instanceof RangeMap) {
            rangeMap = input;
        } else {
            rangeMap = new RangeMap(input);
        }

        rangeMap.forEach((val, range) => {
            if (val instanceof ResponsiveSizeSegmentValue) {
                rangeMap.set(range.from, {
                    rssv: val,
                    from: range.from
                });
            } else {
                rangeMap.set(range.from, {
                    rssv: new ResponsiveSizeSegmentValue(val),
                    from: range.from
                });
            }
        });

        this._rangeMap = rangeMap;
    }

    css(propName) {
        return this._rangeMap.css((val, range) => {
            return `${JSToCSS(propName)}: ${val.rssv.css(range.from)};`;
        });
    }

    multiply(scalar) {
        let newRangeMapConfig = {};

        this._rangeMap.forEach((val, range) => {
            newRangeMapConfig[range.from] = val.rssv.multiply(scalar);
        });

        return new ResponsiveSize(newRangeMapConfig);
    }

    divide(scalar) {
        return this.multiply(1 / scalar);
    }

    add(rs2) {
        let rangeMap = this.map.crosssect(rs2.map);
        let newRangeConfig = {};

        rangeMap.forEach((val, range) => {
            let from1 = val.val1.from;
            let rssv1 = val.val1.rssv.getValueFromOffset(range.from - from1);

            let from2 = val.val2.from;
            let rssv2 = val.val2.rssv.getValueFromOffset(range.from - from2);

            let newVal = rssv1.add(rssv2);

            newRangeConfig[range.from] = newVal;
        });

        return new ResponsiveSize(newRangeConfig);
    }

    subtract(rs2) {
        return this.add(rs2.multiply(-1));
    }

    val(res, unit) {
        let from = this._rangeMap.value(res).from;
        let rssv = this._rangeMap.value(res).rssv;

        if (typeof unit === "undefined") {
            return rssv;
        }

        return rssv.val(unit, res - from);
    }

    get map() {
        return this._rangeMap;
    }
}

function rssv(val) {
    return new ResponsiveSizeSegmentValue(val);
}

function rs(val) {
    if (val instanceof ResponsiveSize) {
        return val;
    }
    return new ResponsiveSize(val);
}

function rslin(from, to, infinite) {
    infinite = infinite || false;

    let config = {
        0: from
    };

    let slope =
        (to - from) / (RangeSet.main.last.from - RangeSet.main.second.from);

    config[RangeSet.main.second.from] = [from, slope];

    if (!infinite) {
        config[RangeSet.main.last.from] = to;
    }

    return new ResponsiveSize(config);
}

export {
    ResponsiveSize,
    ResponsiveSizeSegmentValue,
    rs,
    rssv,
    rslin
};
