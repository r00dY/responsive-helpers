import { RangeSet, RangeMap, R, rm } from "../src/Ranges";

function createRangeMap() {
    return new RangeMap({
        0: "xs-val",
        992: "md-val",
        800: "800-val",
        1920: "xl-val",
        1600: "1600-val",
        2500: "2500-val"
    });
};

describe("RangeSet", function() {
    it("works OK", () => {
        expect(R.first.from).toBe(0);
        expect(R.first.to).toBe(419);
        expect(R.first.isInfinite).toBe(false);

        expect(R.second.from).toBe(420);
        expect(R.second.to).toBe(991);
        expect(R.second.isInfinite).toBe(false);

        expect(R.md.from).toBe(992);
        expect(R.md.to).toBe(1399);
        expect(R.md.isInfinite).toBe(false);

        expect(R.last.from).toBe(1920);
        expect(R.last.to).toBe(undefined);
        expect(R.last.isInfinite).toBe(true);

        expect(R.xs).toBe(R.first);
        expect(R.sm).toBe(R.second);
        expect(R.xl).toBe(R.last);

        let array = R.array;
        expect(array.length).toBe(5);
        expect(array[0]).toBe(R.first);
        expect(array[1]).toBe(R.get("sm"));
        expect(array[4]).toBe(R.last);

        expect(array[0].name).toBe("xs");
        expect(array[1].name).toBe("sm");
        expect(array[2].name).toBe("md");
        expect(array[3].name).toBe("lg");
        expect(array[4].name).toBe("xl");


        global.window = { innerWidth: 320 };
        expect(R.current.name).toBe("xs");

        global.window = { innerWidth: 419 };
        expect(R.current.name).toBe("xs");

        global.window = { innerWidth: 420 };
        expect(R.current.name).toBe("sm");

        global.window = { innerWidth: 1000 };
        expect(R.current.name).toBe("md");

        global.window = { innerWidth: 1400 };
        expect(R.current.name).toBe("lg");

        global.window = { innerWidth: 1900 };
        expect(R.current.name).toBe("lg");

        global.window = { innerWidth: 1920 };
        expect(R.current.name).toBe("xl");

        global.window = { innerWidth: 2500 };
        expect(R.current.name).toBe("xl");

        let subrange = R.fromTo("md", "lg");
        expect(subrange.from).toBe(992);
        expect(subrange.to).toBe(1919);
        expect(subrange.isInfinite).toBe(false);

        subrange = R.fromTo("md", "xl");
        expect(subrange.from).toBe(992);
        expect(subrange.isInfinite).toBe(true);

        subrange = R.from("md");
        expect(subrange.from).toBe(992);
        expect(subrange.isInfinite).toBe(true);

        subrange = R.to("lg");
        expect(subrange.from).toBe(0);
        expect(subrange.to).toBe(1919);
        expect(subrange.isInfinite).toBe(false);


        // MediaQuery and CSS.

        const rangeFromTo = R.fromTo("md", "lg");
        const rangeTo = R.to("lg");
        const rangeFrom = R.from("lg");
        const rangeAll = R.from("xs");

        expect(rangeFromTo.mediaQuery).toBe("(min-width: 992px) and (max-width: 1919px)");
        expect(rangeTo.mediaQuery).toBe("(max-width: 1919px)");
        expect(rangeFrom.mediaQuery).toBe("(min-width: 1400px)");
        expect(rangeAll.mediaQuery).toBe(undefined);

        console.log(rangeFromTo.css('font-size: 10px'));
        console.log(rangeTo.css('font-size: 10px'));
        console.log(rangeFrom.css('font-size: 10px'));
        console.log(rangeAll.css('font-size: 10px'));


        // console.log(new Range("md", 720, 1280).mediaQuery);
    });
});

describe("RangeMap", function() {

    it ("instantiates correctly from value (not object)", () => {

        let rangeMapWithNumber = new RangeMap(100);
        expect(rangeMapWithNumber.value(200)).toBe(100);
        expect(rangeMapWithNumber.value(2200)).toBe(100);

        let rangeMapWithString = new RangeMap("test");
        expect(rangeMapWithString.value(200)).toBe("test");
        expect(rangeMapWithString.value(2200)).toBe("test");
    });

    it ("instantiates correctly from value (object which is not rangemap)", () => {

        let rmSingleVal = rm({
            dog: 1,
            cat: 3
        });

        expect(rmSingleVal.value(200).dog).toBe(1);
        expect(rmSingleVal.value(200).cat).toBe(3);

        let rmResponsive = rm({
            xs: {
                dog: 1,
                cat: 3
            },
            1000: {
                dog: 2,
                cat: 10
            }
        });

        expect(rmResponsive.value(200).dog).toBe(1);
        expect(rmResponsive.value(200).cat).toBe(3);
        expect(rmResponsive.value(1200).dog).toBe(2);
        expect(rmResponsive.value(1200).cat).toBe(10);
    });


    it ("return css correctly", () => {

        let rangeMap = createRangeMap();
        const css = rangeMap.cssObject((val, range) => ({
            margin: val
        }));

        console.log(css);
    });



    it("returns rangeSet correctly", () => {
        let rangeSet = createRangeMap().rangeSet;

        expect(rangeSet.array.length).toBe(6);

        expect(rangeSet.array[0].from).toBe(0);
        expect(rangeSet.array[0].isInfinite).toBe(false);

        expect(rangeSet.array[1].from).toBe(800);
        expect(rangeSet.array[1].isInfinite).toBe(false);

        expect(rangeSet.array[2].from).toBe(992);
        expect(rangeSet.array[2].isInfinite).toBe(false);

        expect(rangeSet.array[3].from).toBe(1600);
        expect(rangeSet.array[3].isInfinite).toBe(false);

        expect(rangeSet.array[4].from).toBe(1920);
        expect(rangeSet.array[4].isInfinite).toBe(false);

        expect(rangeSet.array[5].from).toBe(2500);
        expect(rangeSet.array[5].isInfinite).toBe(true);
    });

    it("correctly returns currently active value", () => {
        let rangeMap = createRangeMap();

        global.window = { innerWidth: 320 };
        expect(rangeMap.current).toBe("xs-val");

        global.window = { innerWidth: 419 };
        expect(rangeMap.current).toBe("xs-val");

        global.window = { innerWidth: 800 };
        expect(rangeMap.current).toBe("800-val");

        global.window = { innerWidth: 1000 };
        expect(rangeMap.current).toBe("md-val");

        global.window = { innerWidth: 1400 };
        expect(rangeMap.current).toBe("md-val");

        global.window = { innerWidth: 1900 };
        expect(rangeMap.current).toBe("1600-val");

        global.window = { innerWidth: 1920 };
        expect(rangeMap.current).toBe("xl-val");

        global.window = { innerWidth: 2500 };
        expect(rangeMap.current).toBe("2500-val");
    });

    it("iterates correctly", () => {
        let ranges = [];

        createRangeMap().forEach((value, range) => {
            ranges.push({
                value: value,
                range: range
            });
        });

        expect(ranges[0].range.from).toBe(0);
        expect(ranges[0].range.to).toBe(799);
        expect(ranges[0].range.isInfinite).toBe(false);
        expect(ranges[0].value).toBe("xs-val");

        expect(ranges[1].range.from).toBe(800);
        expect(ranges[1].range.to).toBe(991);
        expect(ranges[1].range.isInfinite).toBe(false);
        expect(ranges[1].value).toBe("800-val");

        expect(ranges[2].range.from).toBe(992);
        expect(ranges[2].range.to).toBe(1599);
        expect(ranges[2].range.isInfinite).toBe(false);
        expect(ranges[2].value).toBe("md-val");

        expect(ranges[3].range.from).toBe(1600);
        expect(ranges[3].range.to).toBe(1919);
        expect(ranges[3].range.isInfinite).toBe(false);
        expect(ranges[3].value).toBe("1600-val");

        expect(ranges[4].range.from).toBe(1920);
        expect(ranges[4].range.to).toBe(2499);
        expect(ranges[4].range.isInfinite).toBe(false);
        expect(ranges[4].value).toBe("xl-val");

        expect(ranges[5].range.from).toBe(2500);
        expect(ranges[5].range.isInfinite).toBe(true);
        expect(ranges[5].value).toBe("2500-val");

        expect(ranges.length).toBe(6);

        // TODO: in-browser testing!!!
        // console.log(createRangeMap().css(
        //     (value, range) => {
        //         return `content: ${value}`;
        //     }
        // ));


    });

    it("returns value correctly for resolution", () => {
        let rangeMap = createRangeMap();

        expect(rangeMap.value(200)).toBe("xs-val");
        expect(rangeMap.value(600)).toBe("xs-val");
        expect(rangeMap.value(800)).toBe("800-val");
        expect(rangeMap.value(991)).toBe("800-val");
        expect(rangeMap.value(992)).toBe("md-val");
        expect(rangeMap.value(1599)).toBe("md-val");
        expect(rangeMap.value(1600)).toBe("1600-val");
        expect(rangeMap.value(1919)).toBe("1600-val");
        expect(rangeMap.value(1920)).toBe("xl-val");
        expect(rangeMap.value(2499)).toBe("xl-val");
        expect(rangeMap.value(2500)).toBe("2500-val");
        expect(rangeMap.value(3000)).toBe("2500-val");
    });

    it("cross-sects with other RangeMap properly", () => {
        let rangeMap = createRangeMap();
        let rangeMap2 = new RangeMap({
            xs: 10,
            sm: 20,
            md: 30,
            lg: 40,
            xl: 50
        });

        let ranges = [];

        rangeMap.crosssect(rangeMap2).forEach((value, range) => {
            ranges.push({
                val1: value.val1,
                val2: value.val2,
                range: range
            });
        });

        expect(ranges[0].range.to).toBe(419);
        expect(ranges[0].range.isInfinite).toBe(false);
        expect(ranges[0].val1).toBe("xs-val");
        expect(ranges[0].val2).toBe(10);

        expect(ranges[1].range.from).toBe(420);
        expect(ranges[1].range.to).toBe(799);
        expect(ranges[1].range.isInfinite).toBe(false);
        expect(ranges[1].val1).toBe("xs-val");
        expect(ranges[1].val2).toBe(20);

        expect(ranges[2].range.from).toBe(800);
        expect(ranges[2].range.to).toBe(991);
        expect(ranges[2].range.isInfinite).toBe(false);
        expect(ranges[2].val1).toBe("800-val");
        expect(ranges[2].val2).toBe(20);

        expect(ranges[3].range.from).toBe(992);
        expect(ranges[3].range.to).toBe(1399);
        expect(ranges[3].range.isInfinite).toBe(false);
        expect(ranges[3].val1).toBe("md-val");
        expect(ranges[3].val2).toBe(30);

        expect(ranges[4].range.from).toBe(1400);
        expect(ranges[4].range.to).toBe(1599);
        expect(ranges[4].range.isInfinite).toBe(false);
        expect(ranges[4].val1).toBe("md-val");
        expect(ranges[4].val2).toBe(40);

        expect(ranges[5].range.from).toBe(1600);
        expect(ranges[5].range.to).toBe(1919);
        expect(ranges[5].range.isInfinite).toBe(false);
        expect(ranges[5].val1).toBe("1600-val");
        expect(ranges[5].val2).toBe(40);

        expect(ranges[6].range.from).toBe(1920);
        expect(ranges[6].range.to).toBe(2499);
        expect(ranges[6].range.isInfinite).toBe(false);
        expect(ranges[6].val1).toBe("xl-val");
        expect(ranges[6].val2).toBe(50);

        expect(ranges[7].range.from).toBe(2500);
        expect(ranges[7].range.isInfinite).toBe(true);
        expect(ranges[7].val1).toBe("2500-val");
        expect(ranges[7].val2).toBe(50);

        expect(ranges.length).toBe(8);

        // TODO: in-browser testing!!!
        // console.log(rangeMapToCSSWithLayout(
        //     rangeMap,
        //     (value, { range, layoutParams }) => {
        //         return `content: ${value}; gutter: ${val2};`;
        //     }
        // ));

        // console.log(rangeSetToCSS(({ range, layoutParams}) => {
        //     return `gutter: ${val2}`;
        // }));
    });
});
