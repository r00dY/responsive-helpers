import React from "react";
import { storiesOf } from "@storybook/react";
import { rslin } from "./ResponsiveStyles";
import styled from "styled-components";

const FontSample = styled.div`
    ${rslin(50, 300).css("font-size")}
`;

const FontSample2 = styled.div`
    ${rslin(50, 300, true).css("font-size")}
`;

storiesOf("Responsive Styles", module).add("linear size", () => (
    <div style={{ margin: "24px 0" }}>
        <FontSample>Lorem ipsum</FontSample>
        <FontSample2>Lorem ipsum</FontSample2>
    </div>
));
