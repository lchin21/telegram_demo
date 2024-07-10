import React from "react";

type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
};

export default function Button(props: ButtonProps) {
    return <button>{props.children}</button>;
}