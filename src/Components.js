import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";

import { RangeMap } from "./Ranges";
import { Layout } from "./Layout";

const Container = styled.div`
    ${props => (props.layout ? props.layout : Layout.main).container.css("width")}
    margin: auto;
`;

// GridRow
const GridRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    ${props => (props.layout ? props.layout : Layout.main).gutter.divide(-2).css("margin-left")}
    ${props => (props.layout ? props.layout : Layout.main).gutter.divide(-2).css("margin-right")}
    overflow: hidden;
`;

const GridItem = function(props) {
    let gridParams = new RangeMap(props.gridParams);

    let layout = props.layout ? props.layout : Layout.main;

    let style = `
        position: relative;
        width: 100%;
        min-height: 1px;
        ${layout.gutter.divide(2).css("padding-left")}
        ${layout.gutter.divide(2).css("padding-right")}
    `;

    style += gridParams.css(params => {
        params = Layout.normalizeGridItemParams(params);

        return `
        flex: 0 0 ${(params.cols / layout.colNumber) * 100}%;
        max-width: ${(params.cols / layout.colNumber) * 100}%;
        ${
            params.offset > 0
                ? `margin-left: ${(params.offset / layout.colNumber) *
                      100}%;`
                : ""
        }
        ${params.order !== 0 ? `order: ${params.order};` : ""}
        ${params.cols === 0 ? "display: none;" : ""}
        ${props.__extraStyles}
    `;
    });

    const GridItem = styled.div([style]);

    return <GridItem>{props.children}</GridItem>;
};

GridItem.propTypes = {
    gridParams: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.number,
        PropTypes.object
    ]),
    __extraStyles: PropTypes.string
};

GridItem.defaultProps = {
    __extraStyles: ""
};

const Grid = function(props) {
    return (
        <Container layout={props.layout}>
            <GridRow layout={props.layout}>
                {props.items.map((item, i) => (
                    <GridItem
                        layout={props.layout}
                        key={i}
                        gridParams={item.gridParams}
                        __extraStyles={item.__extraStyles}
                    >
                        {item.content}
                    </GridItem>
                ))}
            </GridRow>
        </Container>
    );
};

Grid.propTypes = {
    items: PropTypes.array
};

export { Container, Grid };
