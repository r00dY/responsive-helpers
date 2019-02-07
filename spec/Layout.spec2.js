import { Layout, LayoutParams } from "../src/Layout";

import { RangeSet } from "../src/Ranges";
import Defaults from "../src/core/Layout/Defaults";

global.document = {
    body: {
        clientWidth: 1000
    }
};

Defaults.rangeSet = new RangeSet({
    xs: 0,
    sm: 420,
    md: 992,
    lg: 1400,
    xl: 1920
});

function verifyLayoutParams(layoutParams) {
    expect(layoutParams.colNumber).toBe(8);
    expect(layoutParams.container).toBe(800);
    expect(layoutParams.margin).toBe(100);
    expect(layoutParams.gutter).toBe(10);
    expect(layoutParams.col).toBe(91.25);
    expect(layoutParams.cols(3)).toBe(91.25 + 10 + 91.25 + 10 + 91.25);

    // TODO: some in-browser testing of CSS computed values!!!
    // console.log(layoutParams.css);
}

let layoutParams = new LayoutParams(
    {
        width: 800
    },
    10,
    8
);

describe("LayoutParams", function() {
    it("work properly with container with width ", () => {
        let layoutParams = new LayoutParams(
            {
                width: 800
            },
            10,
            8
        );

        global.document = {
            body: {
                clientWidth: 1000
            }
        };

        verifyLayoutParams(layoutParams);
    });

    it("work properly with container with margin ", () => {
        let layoutParams = new LayoutParams(
            {
                margin: 100
            },
            10,
            8
        );

        verifyLayoutParams(layoutParams);
    });

    it("work properly with container with margin in percent value ", () => {
        let layoutParams = new LayoutParams(
            {
                margin: "10%"
            },
            10,
            8
        );

        verifyLayoutParams(layoutParams);
    });

    it("properly return calcs", () => {
        // console.log(layoutParams.css.container);
        // console.log(layoutParams.css.margin);
        // console.log(layoutParams.css.col);
        // console.log(layoutParams.css.gutter);
        // console.log(layoutParams.css.calc("1*margin + 2*gutter + 3*col"));
    });
});

describe("Layout", function() {
    let layout = new Layout({
        container: {
            xs: {
                margin: 100
            },
            sm: {
                margin: 40
            },
            md: {
                margin: "8%"
            },
            lg: {
                margin: "9%"
            },
            xl: {
                width: 2000
            }
        },
        colNumber: 8,
        gutter: {
            xs: 10,
            sm: 20,
            md: 30,
            lg: 40,
            xl: 50
        }
    });

    it("properly returns columns number", () => {
        expect(layout.colNumber).toBe(8);
    });

    it("properly returns correct LayoutParams", () => {
        verifyLayoutParams(layout.params("xs"));
        expect(layout.params("md").gutter, 30);
        expect(layout.params("xl").container, 2000);
    });

    it("properly returns propery responsive sizes", () => {
        // console.log(layout.container.css('width'));
        // console.log(layout.margin.css('width'));
        // console.log(layout.gutter.css('width'));
        // console.log(layout.col.css('width'));
    });
});

describe("Layout Layout.normalizeGridItemParams method", function() {
    it("works for number", () => {
        let params = Layout.normalizeGridItemParams(10);

        expect(params.cols).toBe(10);
        expect(params.offset).toBe(0);
        expect(params.order).toBe(0);
    });

    it("works for array (empty)", () => {
        let params = Layout.normalizeGridItemParams([]);

        expect(params.cols).toBe(0);
        expect(params.offset).toBe(0);
        expect(params.order).toBe(0);
    });

    it("works for array (1 param)", () => {
        let params = Layout.normalizeGridItemParams([10]);

        expect(params.cols).toBe(10);
        expect(params.offset).toBe(0);
        expect(params.order).toBe(0);
    });

    it("works for array (2 params)", () => {
        let params = Layout.normalizeGridItemParams([10, 2]);

        expect(params.cols).toBe(10);
        expect(params.offset).toBe(2);
        expect(params.order).toBe(0);
    });

    it("works for array (3 params)", () => {
        let params = Layout.normalizeGridItemParams([10, 2, 5]);

        expect(params.cols).toBe(10);
        expect(params.offset).toBe(2);
        expect(params.order).toBe(5);
    });

    it("works for object (empty)", () => {
        let params = Layout.normalizeGridItemParams({});

        expect(params.cols).toBe(0);
        expect(params.offset).toBe(0);
        expect(params.order).toBe(0);
    });

    it("works for object (cols defined)", () => {
        let params = Layout.normalizeGridItemParams({ cols: 10 });

        expect(params.cols).toBe(10);
        expect(params.offset).toBe(0);
        expect(params.order).toBe(0);
    });

    it("works for object (cols,offset defined)", () => {
        let params = Layout.normalizeGridItemParams({ cols: 10, offset: 2 });

        expect(params.cols).toBe(10);
        expect(params.offset).toBe(2);
        expect(params.order).toBe(0);
    });

    it("works for object (cols, offset, order defined)", () => {
        let params = Layout.normalizeGridItemParams({
            cols: 10,
            offset: 2,
            order: 5
        });

        expect(params.cols).toBe(10);
        expect(params.offset).toBe(2);
        expect(params.order).toBe(5);
    });
});
