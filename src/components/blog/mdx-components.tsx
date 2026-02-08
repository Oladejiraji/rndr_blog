import Code from "./code/code";
import SandpackExample from "./sandbox/SandpackExample";
import SandpackTodoExample from "./sandbox/SandpackTodoExample";
import SandpackAnimationExample from "./sandbox/SandpackAnimationExample";
import SandpackReactHooksExample from "./sandbox/SandpackReactHooksExample";
import SandpackGooeyDropdown from "./sandbox/SandpackGooeyDropdown";
import Image from "next/image";

const customComponents = {
  SandpackExample,
  SandpackTodoExample,
  SandpackAnimationExample,
  SandpackReactHooksExample,
  SandpackGooeyDropdown,
  Image,
};

export const MdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-base md:text-lg font-semibold mb-6 mt-12 text-gray-900"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-sm md:text-base font-semibold mb-4 mt-10 text-gray-900"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-sm md:text-base font-semibold mb-3 mt-8 text-gray-900"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-sm md:text-base font-semibold mb-3 mt-6 text-gray-900"
      {...props}
    />
  ),
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className="text-sm md:text-base font-semibold mb-2 mt-4 text-gray-900"
      {...props}
    />
  ),
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className="text-sm md:text-base font-semibold mb-2 mt-4 text-gray-900"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-xs md:text-sm md:leading-6 mb-4 text-gray-700"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-xs md:text-sm text-inherit underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-gray-900" {...props} />
  ),
  em: (props: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="text-xs md:text-sm list-disc list-inside mb-4 space-y-2"
      {...props}
    />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      className="text-xs md:text-sm list-decimal list-inside mb-4 space-y-2"
      {...props}
    />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="text-xs md:text-sm text-gray-700" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="text-xs md:text-sm border-l-4 border-gray-300 pl-4 py-2 mb-4 italic text-gray-700"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="text-xs md:text-sm bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono"
      {...props}
    />
  ),
  pre: Code,
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-gray-300" {...props} />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-4">
      <table
        className="text-sm md:text-base min-w-full border-collapse border border-gray-300"
        {...props}
      />
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-gray-100" {...props} />
  ),
  tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody {...props} />
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-gray-300" {...props} />
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="text-xs md:text-base px-4 py-2 text-left font-semibold text-gray-900"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="text-xs md:text-base px-4 py-2 text-gray-700" {...props} />
  ),

  ...customComponents,
};
