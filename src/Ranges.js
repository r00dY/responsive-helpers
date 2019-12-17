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

    get mediaQuery() {

        let fromMedia = (this.from === "undefined" || this.from === null || this.from === 0) ? undefined : `(min-width: ${this.from}px)`;
        let toMedia = this.isInfinite ? undefined : `(max-width: ${this.to}px)`;

        if (fromMedia && toMedia) {
            return `${fromMedia} and ${toMedia}`;
        }
        else if (!fromMedia && toMedia) {
            return toMedia;
        }
        else if (fromMedia && !toMedia) {
            return fromMedia;
        }
        return;
    }

    css(css) {
        if (this.mediaQuery) {
            return `@media ${this.mediaQuery} {
                ${css}
            }`
        }
        return css
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
            this[name] = range;
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

const RangeSetDefault = new RangeSet({
    xs: 0, // all phones in vertical mode are below this. Minimal 320px for iPhone SE, maximal 414px for iPhone 6+. All Galaxy Note etc, have lower ones.
    xs_plus: 420, // horizontal phones + untypical small tablets (like Galaxy Nexus), least important resolution.
    sm: 720, // all vertical tablets start with 720px (Surface). iPads and Galaxy Tab, etc, all are above. Nexus 7 is an exception, should behave as SM.
    md: 960, // standard horizontal tablets are > 960px (even with Nexus 7), like iPad or Galaxy
    lg: 1200, // smaller laptops (1280) and big tablets in horizontal mode (iPad Pro, Galaxy 10)
    lg_plus: 1366, // most laptops 13 inch and 15 inch (1366, 1440px)
    xl: 1600, // bigger resolution laptops (1600)
    xl_plus: 2000 // desktops bigger than full HD
});

const RangeSetMain = typeof __RANGES__ !== "undefined" ? new RangeSet(__RANGES__) : RangeSetDefault;

class RangeMap {
    constructor(input, rangeSetMain) {

        /**
         * Automatic detection if rangeMapConfig is object config for RangeMap or a value
         */

        let config;

        if (typeof input === 'object') {
            let isResponsive = true;

            Object.keys(input).forEach((key) => {
               if (!(RangeSetMain.get(key) || !isNaN(parseInt(key)))) {
                   isResponsive = false;
               }
            });

            if (!isResponsive) {
                config = {
                    0: input
                }
            }
            else {
                config = input;
            }
        }
        // If value
        else {
            config = {
                0: input
            }
        }
        let rangeNames = Object.keys(config);

        // Convert breakpoint names to numbers
        rangeNames.forEach(name => {
            let val = config[name];
            delete config[name];

            config[RangeMap._normalizeKey(name)] = val;
        });

        this._map = config;
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

            minBreakpoint = newBreakpoint;/**/
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

    cssObject(callback) {
        let style = {};

        this.forEach((content, range) => {
            style[`@media ${range.mediaQuery}`] = callback(content, range);
        });

        return style;
    }
}

RangeMap._normalizeKey = function(key) {
    if (typeof key === "string" && isNaN(parseInt(key))) {
        return RangeSetMain.get(key).from;
    }
    return key;
};

function rm(val) {
    if (val instanceof RangeMap) {
        return val;
    }

    return new RangeMap(val);
}

const R = RangeSetMain;

export {
    Range,
    RangeSet,
    RangeMap,
    rm,
    RangeSetMain,
    R
};

