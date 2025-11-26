import { PrismTheme } from "prism-react-renderer";

export const codeTheme: PrismTheme = {
  plain: {
    color: "#24292e",
    backgroundColor: "transparent",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#6a737d",
        fontStyle: "italic",
      },
    },
    {
      types: ["namespace"],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ["string", "attr-value"],
      style: {
        color: "#032f62",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "#24292e",
      },
    },
    {
      types: [
        "entity",
        "url",
        "symbol",
        "number",
        "boolean",
        "constant",
        "property",
        "regex",
        "inserted",
      ],
      style: {
        color: "#005cc5",
      },
    },
    {
      types: ["atrule", "keyword", "attr-name"],
      style: {
        color: "#70BB9C",
      },
    },
    {
      types: ["function", "deleted"],
      style: {
        color: "#6f42c1",
      },
    },
    {
      types: ["function-variable"],
      style: {
        color: "#6f42c1",
      },
    },
    {
      types: ["tag", "selector"],
      style: {
        color: "#22863a",
      },
    },
    {
      types: ["keyword"],
      style: {
        color: "#70BB9C",
        fontWeight: "bold",
      },
    },
    {
      types: ["class-name"],
      style: {
        color: "#6f42c1",
      },
    },
    {
      types: ["variable"],
      style: {
        color: "#e36209",
      },
    },
  ],
};
