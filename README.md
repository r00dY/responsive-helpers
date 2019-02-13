# Responsive helpers

## Ranges

Instead of "breakpoints", we'll use different name: "ranges". "Breakpoint" represents a single point and we think it's easier to reason about responsiveness using "range".

### `Range`

`Range` represents single range of resolutions.

```javascript
let range = new Range("md", 768, 991); // a range named "md" spanning from 768 to 991.
console.log(range.from); // 768
console.log(range.to); // 991
console.log(range.name); // "md"
console.log(range.isCurrent); // true if window.innerWidth is between 768 and 991, otherwise false

// Ranges can be infinite
let range = new Range("xl", 1920, undefined); // a range named "md" spanning from 768 to 991.
console.log(range.from); // 768
console.log(range.to); // undefined
console.log(range.isInfinite); // true
```


### `RangeSet`

`RangeSet` represents a resolution spectrum divided into ranges. You can create `RangeSet` like this:

```javascript
let rangeSet = new RangeSet({
    xs: 0,
    sm: 420,
    md: 992,
    lg: 1400,
    xl: 1920
});
```

You can create as many ranges as you want in your project, but we strongly suggest using one and assigning it to `RangeSet.main` property.

`RangeSet.main` has special meaning and is used by other helpers functions (this will be explain later).

To sum up, in some init place of your project you should run sth like this:

```javascript
RangeSet.main = new RangeSet({
    xs: 0,
    sm: 420,
    md: 992,
    lg: 1400,
    xl: 1920
});
```

###Usage

```javascript
let rangeSet = new RangeSet({
    xs: 0,
    sm: 420,
    md: 992,
    lg: 1400,
    xl: 1920
});

// .get method returns `Range` object for specific range name
rangeSet.get("xs"); // returns `Range` object
rangeSet.get("xs").from; // 0
rangeSet.get("xs").to; // 419
rangeSet.get("xl").from; // 1920
rangeSet.get("xl").isInfinite; // true

rangeSet.current; // return currently active `Range`

rangeSet.first // returns lowest `Range`
rangeSet.second // return second lowest `Range`

rangeSet.last // returns highest `Range`

```

### `RangeMap`
