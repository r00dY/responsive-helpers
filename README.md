# Responsive helpers

## Ranges

Instead of "breakpoints", we'll use different name: "ranges". "Breakpoint" represents a single point and we think it's easier to reason about responsiveness using "range".

### `Range`

`Range` represents single range of resolutions.

Examples of ranges:
- `xs` - a range representing vertical mobile phones (from 0 to 419px)
- `md` - a range representing standard vertical tablets (from 960px to 1200px)
- `xl` - a range representing desktops (from 1600px to infinity)

```javascript
let xs = new Range("xs", 0, 419); // a range named "xs" spanning from 0 to 419.
xs.from // 0
xs.to // 419
xs.name // "xs"
xs.isInfinite // false, this range is finite
xs.isCurrent // true if window.innerWidth is between 0 and 419, otherwise false

// Ranges can be infinite
let xl = new Range("xl", 1600, undefined); // a range named "xl" spanning from 1600 to infinity.
xl.from // 1600
xl.to // undefined
xl.isInfinite // true
```

`Range` object has helper methods for CSS-in-JS:

```javascript
// `mediaQuery` method generates media query string from `Range`
xs.mediaQuery // "(max-width: 419px)"
xl.mediaQuery // "(min-width: 1600px)"

let md = new Range("md", 720, 1280);
md.mediaQuery // "(min-width: 720px) and (max-width: 1280px)"

// `css` method generates CSS for specific range
xs.css('font-size: 10px;') // "@media (max-width: 419px) { font-size: 10px; }"

md.css(`
    font-size: 10px;
    max-width: 200px;
`)
// @media (min-width: 720px) and (max-width: 1280px) { 
//     font-size: 10px; 
//     max-width: 200px;
// }
```

### `RangeSet`

Usually (in 99% of cases), you don't create `Range` instances directly (via `new Range`) in your project.

What you should do is to define entire range set that covers all resolutions from 0 to infinity. This is what `RangeSet` class is for.

`RangeSet` represents a resolution spectrum divided into ranges. You can create `RangeSet` like this:

```javascript
let rangeSet = new RangeSet({
    xs: 0,
    sm: 420,
    md: 992,
    lg: 1400,
    xl: 1920
}
```
Here we created `RangeSet` with 5 ranges: `xs`, `sm`, `md`, `lg`, `xl`.

You can access specific `Range` from `RangeSet` in 2 ways:

```javascript
// Via get` method
rangeSet.get('xs').from // 0
rangeSet.get('xs').to // 419

// Directly as a property
rangeSet.md.from // 992
rangeSet.md.to // 1399
```

`RangeSet` has couple of helpers allowing creating new ranges based on your set:

```javascript
// `to` method
rangeSet.to('md') // returns new `Range` spanning from 0 to 1399
rangeSet.to('lg') // returns new `Range` spanning from 0 to 1919

// `from` method
rangeSet.from('md') // return new `Range` spanning from 992 to infinity
rangeSet.from('lg') // return new `Range` spanning from 1400 to infinity

// `fromTo` method
rangeSet.from('md', 'lg') // return new `Range` spanning from 992 to 1919
rangeSet.from('xs', 'sm') // return new `Range` spanning from 0 to 991
```

There are other helper methods for `RangeSet`:
```javascript
rangeSet.current; // return currently active `Range` (based on current window.innerWidth value)

rangeSet.first // returns lowest `Range` (xs)
rangeSet.second // return second lowest `Range` (sm)
 
rangeSet.last // returns highest `Range` (xl)
```

### `RangeSet.main`

You should always have one major `RangeSet` in your project and assign it to `RangeSet.main` property.

`RangeSet.main` has special meaning and is used by other helpers functions (like `rslin`).

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

## ResponsiveSize

Very often it's easier to think about values as a function of resolution, not just a single value.

### `ResponsiveSize`

`ResponsiveSize` is a class that represents a CSS value as a function (for all resolutions).

Imagine we have a container which width is `90vw` for resolutions below 1280px, `80vw` between 1280 and 1600px and has fixed width (1280px) from 1600px up.

Normally we use media queries to code this in CSS. However, we might think that container width is actually a function of resolution.

```javascript
let containerWidth = new ResponsiveSize({
    0: "80vw",
    1280: "90vw",
    1600: "1280px"
});
```

Now in your CSS-in-JS you can do sth like this.

```
// we use styled-components format
let Container = styled.div`
    margin: 0 auto;
    ${containerWidth.css('width')}
`;
```

Voila. This will automatically translate to:

```css
margin: 0 auto;
@media (max-width: 1279px) {
    width: 80vw;
} @media (min-width: 1280px) and (max-width: 1599px) {
    width: 90vw;
} @media (min-width: 1600px) {
    width: 1280px;
}
```
If `RangeSet.main` is set, you can also use range names instead of resolutions:

```javascript
let responsiveSize = new ResponsiveSize({
    xs: "80vw",
    lg: "90vw",
    xl: "1280px"
});
```


#### `rs` shorthand

There's a useful shorthand for creating responsive sizes:
```javascript
let responsiveSize = rs({
    xs: "80vw",
    lg: "90vw",
    xl: "1280px"
});

let responsiveSize2 = rs(100); // constant value 100
let responsiveSize3 = rs("80vw"); // constant value "80vw"
let responsiveSize4 = rs(responsiveSize); // might also clone `ResponsiveSize`
```

It's useful when you create a React Component which takes some size as a prop. Let's say we create `Container` with configurable width:
```
// styled-components format again
let Container = styled.div`
    margin: 0 auto;
    ${props => rs(props.width).css('width')}
`;

// You can now pass width as a standard single value
let container1 = <Container width={100} />;

// But also you can use responsive size
let container2 = <Container width={{
    xs: 100,
    md: 200,
    xl: 300
}} />;
```
Such API is very nice to write and read.

### rslin

`rslin` is a helper function that creates linear `ResponsiveSize`.

Examples:
```javascript
let linearSize = rslin(10, 50);

// Now `linearSize` has following value:
// - from 0 to RangeSet.main.second.from: 10px
// - from RangeSet.main.second.from to RangeSet.main.last.to: linear function from 10px to 50px
// - from RangeSert.main.last.to to infinity: 50px;
`;
```

Linear sizing is great for handling responsiveness of font sizes and vertical spacings. Calling `linearSize.css('font-size')` returns:
```css
@media (max-width: 419px) {
    font-size: 10px;
}@media (min-width: 420px) and (max-width: 1919px) {
    font-size: calc(0.02666666666666667*100vw + -1.200000000000001px);
}@media (min-width: 1920px) {
    font-size: 50px;
}
```

This CSS is complicated but works and you don't have to worry about it. `rslin` takes care of this.

*IMPORTANT*

*In order to make it work, `RangeSet.main` must be defined.*

This should be pretty clear because `rslin` takes 2 parameters and should know which resolutions are mapped to these values. First value is always mapped to `RangeSet.main.first.to` (mobile phone resolution usually) and second one to `RangeSet.main.last.from` (big desktop). 
