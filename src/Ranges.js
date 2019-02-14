
class Range {
    constructor(name, from, to) {
        this.name = name;
        this.from = from;
        this.to = to;
    }

    get isInfinite() {
        return typeof this.to === "undefined" || this.to === null;
    }

    get isCurrent() {
        return this.from <= window.innerWidth && (typeof this.to === 'undefined' || window.innerWidth <= this.to);
    }

    css(css) {
        return `@media only screen and (min-width: ${this.from}px) ${
            !this.isInfinite ? `and (max-width: ${this.to}px)` : ""
            } {
                ${css}
            }`
    }
}

class RangeSet {
    constructor(ranges) {
        this._rangesArray = [];

        let rangeEntries = Object.entries(ranges);
        rangeEntries = rangeEntries.sort((x, y) => x[1] - y[1]);

        for (let i = 0; i < rangeEntries.length; i++) {
            let rangeEntry = rangeEntries[i];

            let name = rangeEntry[0];
            let from = rangeEntry[1];
            let to;

            // If not last breakpoint
            if (i < rangeEntries.length - 1) {
                to = rangeEntries[i + 1][1] - 1;
            }

            let range = new Range(name, from, to);
            this._rangesArray.push(range);
        }
    }

    get(name) {
        for (let i = 0; i < this._rangesArray.length; i++) {
            if (this._rangesArray[i].name === name) {
                return this._rangesArray[i];
            }
        }
    }

    fromTo(from, to) {
        let rangeFrom = this.get(from);
        let rangeTo = this.get(to);
        return new Range(undefined, rangeFrom.from, rangeTo.to);
    }

    from(from) {
        let rangeFrom = this.get(from);
        return new Range(undefined, rangeFrom.from, undefined);
    }

    to(to) {
        let rangeTo = this.get(to);
        return new Range(undefined, 0, rangeTo.to);
    }

    get map() {
        let map = {};
        this.array.forEach(range => {
            map[range.name] = range;
        });

        return map;
    }

    get array() {
        return this._rangesArray;
    }

    get first() {
        return this._rangesArray[0];
    }

    get second() {
        return this._rangesArray[1];
    }

    get last() {
        return this._rangesArray[this._rangesArray.length - 1];
    }

    get current() {
        for (let i = 0; i < this._rangesArray.length; i++) {
            if (this._rangesArray[i].isCurrent) { return this._rangesArray[i] }
        }
    }
}

// RangeSet.main = new RangeSet(ranges);

class RangeMap {
    constructor(rangeMapConfig) {
        let rangeNames = Object.keys(rangeMapConfig);

        // Convert breakpoint names to numbers
        rangeNames.forEach(name => {
            let val = rangeMapConfig[name];
            delete rangeMapConfig[name];

            rangeMapConfig[RangeMap._normalizeKey(name)] = val;
        });

        this._map = rangeMapConfig;
    }

    get rangeSet() {
        let rangeNames = Object.keys(this._map);

        let rangesConfig = {};

        rangeNames.forEach(name => {
            rangesConfig[name] = parseInt(name);
        });

        return new RangeSet(rangesConfig);
    }

    get(arg) {
        return this._map[arg];
    }

    set(arg, val) {
        this._map[arg] = val;
    }

    get current() {
        return this.value(window.innerWidth);
    }

    value(res) {
        let result;

        this.forEach((val, range) => {
            if (range.from <= res && (range.isInfinite || res <= range.to)) {
                result = val;
            }
        });

        return result;
    }

    forEach(callback) {
        this.rangeSet.array.forEach(range => {
            callback(this._map[range.name], range);
        });
    }

    crosssect(that) {
        let rangeSet1 = this.rangeSet;
        let rangeSet2 = that.rangeSet;

        let i = 0; // index of range1
        let j = 0; // index of range2
        let minBreakpoint = 0;
        let newBreakpoint;

        let range1, range2;
        let activeRange1 = null;
        let activeRange2 = null;

        let config = {};

        let run = () => {
            if (newBreakpoint !== minBreakpoint) {
                config[minBreakpoint] = {
                    val1: this.get(activeRange1.name),
                    val2: that.get(activeRange2.name)
                };
            }
        };

        while (1) {
            range1 = rangeSet1.array[i];
            range2 = rangeSet2.array[j];

            if (range1 === undefined && range2 === undefined) {
                newBreakpoint = null;
                run();
                break;
            } else if (range1 === undefined) {
                newBreakpoint = range2.from;
                run();
                activeRange2 = range2;
                j++;
            } else if (range2 === undefined) {
                newBreakpoint = range1.from;
                run();
                activeRange1 = range1;
                i++;
            } else if (range1.from >= range2.from) {
                newBreakpoint = range2.from;
                run();
                activeRange2 = range2;
                j++;
            } else {
                newBreakpoint = range1.from;
                run();
                activeRange1 = range1;
                i++;
            }

            minBreakpoint = newBreakpoint;
        }

        return new RangeMap(config);
    }

    css(callback) {
        let style = "";

        this.forEach((content, range) => {
            style += range.css(callback(content, range));
        });

        return style;
    }
}

RangeMap._normalizeKey = function(key) {
    if (typeof key === "string" && isNaN(parseInt(key))) {
        return RangeSet.main.get(key).from;
    }
    return key;
};

export {
    Range,
    RangeSet,
    RangeMap
};
