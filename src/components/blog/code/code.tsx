import React, { ReactNode } from "react";
import {
  calculateLinesToHighlight,
  getCodeTitle,
  preToCodeBlock,
} from "./utils";
import * as motion from "motion/react-client";
import { Highlight, Prism } from "prism-react-renderer";
import { cn } from "@/lib/utils";
import { codeTheme } from "./theme";
import { CopyButton } from "./copy-button";

interface IProps {
  children: ReactNode;
}

const Code = (preProps: IProps) => {
  const props = preToCodeBlock(preProps);
  const title = getCodeTitle(props.metastring);

  const highlightLine = calculateLinesToHighlight(props.metastring);

  return (
    <div className="rounded-[20px] bg-gray-050 font-sans mb-4">
      <div className="flex items-center justify-between border-b border-gray-1150 px-3 py-3">
        <p className="text-sm text-gray-800">{title}</p>
        <CopyButton codeString={props.codeString} />
      </div>
      <div className="py-5.5">
        <Highlight
          theme={codeTheme}
          code={props.codeString}
          language={props.language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={cn("overflow-auto", className)} style={style}>
              {tokens.map((token, i) => {
                const isHighlight = highlightLine && highlightLine(i);
                const { className: lineClassName } = getLineProps({
                  className: isHighlight ? "highlight-line" : "",
                  key: i,
                  line: token,
                });
                return (
                  <motion.div
                    key={i}
                    className={cn("table", lineClassName)}
                    initial={{ backgroundColor: "#F6F6F6" }}
                    whileHover={{ backgroundColor: "#E6E6E6" }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="leading-5.25 pl-3 pr-6 text-grey-600 text-mid">
                      {i + 1}
                    </div>
                    <div className="leading-5.25 table-cell w-full">
                      {token.map((item, j) => {
                        const tokenProps = getTokenProps({
                          key: j,
                          token: item,
                        });
                        return (
                          <span
                            {...tokenProps}
                            key={j}
                            className={cn(
                              tokenProps.className,
                              "py-0.5 text-mid",
                              {
                                "bg-gray-1200": isHighlight,
                              },
                            )}
                          />
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

export default Code;
