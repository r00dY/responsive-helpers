import {
    ResponsiveSize,
    ResponsiveSizeSegmentValue,
    rslin
} from "../src/ResponsiveStyles";

import { RangeSet, RangeMap } from "../src/Ranges";

RangeSet.main = new RangeSet({
    xs: 0,
    sm: 420,
    md: 992,
    lg: 1400,
    xl: 1920
});

// TODO: in-browser testing!

/**
 * 1. New instance should be created after add/subtract/multiply/divide
 * 2. Segment splitting.
 */

describe("ResponsiveSizeSegmentValue", () => {
    it("gets properly constructed", () => {
        let rss = new ResponsiveSizeSegmentValue(
            [10, 0.01],
            [20, 0.02],
            20,
            "20px",
            "20vw",
            "40vw"
        );

        expect(rss.vals["lin"].from).toBe(70);
        expect(rss.vals["lin"].slope).toBe(0.03);
        expect(rss.vals["vw"]).toBe(60);
    });

    it("properly gets cloned", () => {
        let rss = new ResponsiveSizeSegmentValue(
            [10, 0.01],
            [20, 0.02],
            20,
            "20px",
            "20vw",
            "40vw"
        );
        let newrss = rss.clone();

        expect(rss.vals["lin"].from).toBe(newrss.vals["lin"].from);
        expect(rss.vals["lin"].slope).toBe(newrss.vals["lin"].slope);
        expect(rss.vals["vw"]).toBe(newrss.vals["vw"]);
        expect(rss).not.toBe(newrss);
    });

    it("properly gets px value", () => {
        let rss = new ResponsiveSizeSegmentValue([100, 0.02], "50vw");

        expect(rss.val("px", 0)).toBe(100);
        expect(rss.val("px", 100)).toBe(102);
        expect(rss.val("px", 200)).toBe(104);
    });

    it("properly gets value from offset", () => {
        let rss = new ResponsiveSizeSegmentValue([100, 0.02], "50vw");
        let newrss = rss.getValueFromOffset(100);

        expect(rss.vals["lin"].from).toBe(100);
        expect(rss.vals["lin"].slope).toBe(0.02);
        expect(rss.vals["vw"]).toBe(50);

        expect(newrss.vals["lin"].from).toBe(102);
        expect(newrss.vals["lin"].slope).toBe(0.02);
        expect(newrss.vals["vw"]).toBe(50);
    });

    it("properly adds", () => {
        let rss = new ResponsiveSizeSegmentValue([10, 0.01]);

        let newrss = rss
            .add([20, 0.03])
            .add(20)
            .add("20vw")
            .add("40vw")
            .add("20px")
            .add("20em");

        expect(rss.vals["lin"].from).toBe(10);
        expect(rss.vals["lin"].slope).toBe(0.01);

        expect(newrss.vals["lin"].from).toBe(70);
        expect(newrss.vals["lin"].slope).toBe(0.04);
        expect(newrss.vals["vw"]).toBe(60);
    });

    it("properly subtracts", () => {
        let rss = new ResponsiveSizeSegmentValue([100, 0.02], "50vw");

        let newrss = rss
            .subtract([50, 0.01])
            .subtract("20px")
            .subtract("20vw")
            .subtract("20em");

        expect(rss.vals["lin"].from).toBe(100);
        expect(rss.vals["lin"].slope).toBe(0.02);
        expect(rss.vals["vw"]).toBe(50);

        expect(newrss.vals["lin"].from).toBe(30);
        expect(newrss.vals["lin"].slope).toBe(0.01);
        expect(newrss.vals["vw"]).toBe(30);
        expect(newrss.vals["em"]).toBe(-20);
    });

    it("properly multiplies and divides", () => {
        let rss = new ResponsiveSizeSegmentValue([10, 1], "30vw", "20em");

        let newrss = rss
            .multiply(3)
            .multiply(4)
            .divide(6);

        expect(rss.vals["lin"].from).toBe(10);
        expect(rss.vals["lin"].slope).toBe(1);
        expect(rss.vals["vw"]).toBe(30);
        expect(rss.vals["em"]).toBe(20);

        expect(newrss.vals["lin"].from).toBe(20);
        expect(newrss.vals["lin"].slope).toBe(2);
        expect(newrss.vals["vw"]).toBe(60);
        expect(newrss.vals["em"]).toBe(40);
    });
});

const rs1 = new ResponsiveSize({
    xs: 10,
    sm: "20px",
    md: [20, 0.02],
    lg: "10vw",
    xl: 100
});

describe("ResponsiveSize", () => {
    it("gets properly constructed from object of values", () => {
        expect(rs1.val(200, "px")).toBe(10);
        expect(rs1.val(420, "px")).toBe(20);
        expect(rs1.val(992, "px")).toBe(20);
        expect(rs1.val(1092, "px")).toBe(22);
        expect(rs1.val(1392, "px")).toBe(28);
        expect(rs1.val(1400, "px")).toBe(0);
        expect(rs1.val(2000, "px")).toBe(100);

        expect(rs1.val(200, "vw")).toBe(0);
        expect(rs1.val(420, "vw")).toBe(0);
        expect(rs1.val(992, "vw")).toBe(0);
        expect(rs1.val(1092, "vw")).toBe(0);
        expect(rs1.val(1392, "vw")).toBe(0);
        expect(rs1.val(1400, "vw")).toBe(10);
        expect(rs1.val(2000, "vw")).toBe(0);

        expect(rs1.val(200).val("vw")).toBe(0);
        expect(rs1.val(200).val("px")).toBe(10);
    });

    it("gets properly constructed from object of responsive sizes", () => {
        let rs2 = new ResponsiveSize({
            0: rs1,
            1000: rslin(10, 25),
            2000: 20
        });

        expect(rs2.val(200, "px")).toBe(10);
        expect(rs2.val(420, "px")).toBe(20);
        expect(rs2.val(992, "px")).toBe(20);
        expect(rs2.val(1420, "px")).toBe(20);
        expect(rs2.val(1920, "px")).toBe(25);
        expect(rs2.val(2000, "px")).toBe(20);
        expect(rs2.val(2500, "px")).toBe(20);

        expect(rs2.val(200, "vw")).toBe(0);
        expect(rs2.val(420, "vw")).toBe(0);
        expect(rs2.val(992, "vw")).toBe(0);
        expect(rs2.val(1420, "vw")).toBe(0);
        expect(rs2.val(1920, "vw")).toBe(0);
        expect(rs2.val(2000, "vw")).toBe(0);
        expect(rs2.val(2000, "vw")).toBe(0);

        console.log(rs2.css('margin-top'));
    });

    it("gets properly constructed from value", () => {
        let rs2 = new ResponsiveSize("10px");
        expect(rs2.val(200).val("px")).toBe(10);
        expect(rs2.val(400).val("px")).toBe(10);
        expect(rs2.val(1500).val("px")).toBe(10);

        let rs3 = new ResponsiveSize(20);
        expect(rs3.val(200).val("px")).toBe(20);
        expect(rs3.val(400).val("px")).toBe(20);
        expect(rs3.val(1500).val("px")).toBe(20);
    });

    it("gets properly multiplied and divided by scalar", () => {
        let newrs = rs1
            .multiply(3)
            .multiply(4)
            .divide(6);

        expect(rs1.val(200, "px")).toBe(10);
        expect(rs1.val(420, "px")).toBe(20);
        expect(rs1.val(1392, "px")).toBe(28);
        expect(rs1.val(1400, "px")).toBe(0);
        expect(rs1.val(200, "vw")).toBe(0);
        expect(rs1.val(1400, "vw")).toBe(10);

        expect(newrs.val(200, "px")).toBe(20);
        expect(newrs.val(420, "px")).toBe(40);
        expect(newrs.val(1392, "px")).toBe(56);
        expect(newrs.val(1400, "px")).toBe(0);
        expect(newrs.val(200, "vw")).toBe(0);
        expect(newrs.val(1400, "vw")).toBe(20);
    });

    it("gets properly multiplied and divided by scalar rangeMap", () => {
        let newrs = rs1
            .multiply({ xs: 3, md: 6, lg: 8 })
            .multiply(new RangeMap({ xs: 4, md: 8, lg: 10 }))
            .divide({ xs: 6, md: 12, lg: 4 });

        expect(newrs.val(200, "px")).toBe(20);
        expect(newrs.val(200, "vw")).toBe(0);

        expect(newrs.val(420, "px")).toBe(40);

        expect(newrs.val(1392, "px")).toBe(112);

        expect(newrs.val(1400, "px")).toBe(0);
        expect(newrs.val(1400, "vw")).toBe(200);
    });

    it("adds correctly", () => {
        const rs1 = new ResponsiveSize({
            0: "10vw",
            400: "10em",
            800: [20, 0.02],
            1200: [40, 0.04]
        });

        const rs2 = new ResponsiveSize({
            0: "20vw",
            200: "20em",
            600: [30, 0.03],
            1000: [50, 0.05]
        });

        let newrs = rs1.add(rs2);

        expect(rs1.val(800, "px")).toBe(20);

        expect(newrs.val(0, "px")).toBe(0);
        expect(newrs.val(100, "px")).toBe(0);
        expect(newrs.val(200, "px")).toBe(0);
        expect(newrs.val(300, "px")).toBe(0);
        expect(newrs.val(400, "px")).toBe(0);
        expect(newrs.val(500, "px")).toBe(0);
        expect(newrs.val(600, "px")).toBe(0 + 30);
        expect(newrs.val(700, "px")).toBe(0 + 33);
        expect(newrs.val(800, "px")).toBe(20 + 36);
        expect(newrs.val(900, "px")).toBe(22 + 39);
        expect(newrs.val(1000, "px")).toBe(24 + 50);
        expect(newrs.val(1100, "px")).toBe(26 + 55);
        expect(newrs.val(1200, "px")).toBe(40 + 60);
        expect(newrs.val(1300, "px")).toBe(44 + 65);

        expect(newrs.val(0, "vw")).toBe(30);
        expect(newrs.val(100, "vw")).toBe(30);
        expect(newrs.val(200, "vw")).toBe(10);
        expect(newrs.val(300, "vw")).toBe(10);
        expect(newrs.val(400, "vw")).toBe(0);
        expect(newrs.val(500, "vw")).toBe(0);
        expect(newrs.val(600, "vw")).toBe(0);
        expect(newrs.val(700, "vw")).toBe(0);
        expect(newrs.val(800, "vw")).toBe(0);
        expect(newrs.val(900, "vw")).toBe(0);
        expect(newrs.val(1000, "vw")).toBe(0);
        expect(newrs.val(1100, "vw")).toBe(0);
        expect(newrs.val(1200, "vw")).toBe(0);
        expect(newrs.val(1300, "vw")).toBe(0);

        expect(newrs.val(0, "em")).toBe(0);
        expect(newrs.val(100, "em")).toBe(0);
        expect(newrs.val(200, "em")).toBe(20);
        expect(newrs.val(300, "em")).toBe(20);
        expect(newrs.val(400, "em")).toBe(30);
        expect(newrs.val(500, "em")).toBe(30);
        expect(newrs.val(600, "em")).toBe(10);
        expect(newrs.val(700, "em")).toBe(10);
        expect(newrs.val(800, "em")).toBe(0);
        expect(newrs.val(900, "em")).toBe(0);
        expect(newrs.val(1000, "em")).toBe(0);
        expect(newrs.val(1100, "em")).toBe(0);
        expect(newrs.val(1200, "em")).toBe(0);
        expect(newrs.val(1300, "em")).toBe(0);

        // console.log(newrs.css('font-size'));
    });
});

describe("rslin", function() {
    it("works with infinite=false", () => {
        let rs = rslin(10, 25);
        expect(rs.val(320, "px")).toBe(10);
        expect(rs.val(420, "px")).toBe(10);
        expect(rs.val(520, "px")).toBe(11);
        expect(rs.val(1420, "px")).toBe(20);
        expect(rs.val(1920, "px")).toBe(25);
        expect(rs.val(2500, "px")).toBe(25);
    });

    it("works with infinite=true", () => {
        let rs = rslin(10, 25, true);
        expect(rs.val(320, "px")).toBe(10);
        expect(rs.val(420, "px")).toBe(10);
        expect(rs.val(520, "px")).toBe(11);
        expect(rs.val(1420, "px")).toBe(20);
        expect(rs.val(1920, "px")).toBe(25);
        expect(rs.val(2420, "px")).toBe(30);
    });

    let containerWidth = new ResponsiveSize({
        0: "80vw",
        1280: "90vw",
        1600: "1280px"
    });

    console.log(containerWidth.css('width'));
    console.log(rslin(10, 50).css('font-size'));
});


/**
 * old
 */
// describe("responsiveSizeToCSS", function() {
//     it("behaves OK with number value", () => {
//         // console.log(responsiveSizeToCSS(10, "font-size"))
//     });
//
//     it("behaves OK with string value", () => {
//         // console.log(responsiveSizeToCSS("16px", "font-size"));
//     });
//
//     it("behaves OK with array value", () => {
//         // console.log(responsiveSizeToCSS([16, 24], "font-size"));
//     });
// });
//
// // describe("rs", function() {
// //     it("behaves OK with array value", () => {
// //         let size = rs([16, 24]);
// //
// //         expect(size.css("font-size")).toBe("font-size: 24px;");
// //     });
// // });
//
// describe("stylesToCSS", function() {
//     it("behaves OK", () => {
//         let styles = {
//             fontSize: rs([16, 24]),
//             marginTop: "10px",
//             textTransform: "uppercase",
//             webkitPrefixedProperty: "test"
//         };
//
//         // console.log(stylesToCSS(styles));
//     });
// });
