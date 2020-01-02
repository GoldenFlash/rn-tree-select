import React, { Component } from "react";

export interface TreeProps {
    style?: object;
    itemStyle?: object;
    textStyle?: object;
    data?: Array<object>;
    onChange?: ([propName]: string) => void;
}

export default class Tree extends Component<TreeProps> {
    render(): JSX.Element;
}