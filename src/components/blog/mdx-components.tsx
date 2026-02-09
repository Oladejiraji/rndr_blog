import Code from "./code/code";
import SandpackExample from "./sandbox/SandpackExample";
import SandpackTodoExample from "./sandbox/SandpackTodoExample";
import SandpackAnimationExample from "./sandbox/SandpackAnimationExample";
import SandpackReactHooksExample from "./sandbox/SandpackReactHooksExample";
import SandpackGooeyDropdown from "./sandbox/SandpackGooeyDropdown";
import Image from "next/image";

function Video({
  src,
  caption,
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
  ...props
}: React.VideoHTMLAttributes<HTMLVideoElement> & { caption?: string }) {
  const video = (
    <video
      src={src}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      controls={controls}
      playsInline
      className="w-full rounded-lg"
      {...props}
    />
  );

  if (caption) {
    return (
      <figure className="mb-4">
        {video}
        <figcaption className="text-xs text-gray-500 mt-2 text-center">
          {caption}
        </figcaption>
      </figure>
    );
  }

  return <div className="mb-4">{video}</div>;
}

const customComponents = {
  SandpackExample,
  SandpackTodoExample,
  SandpackAnimationExample,
  SandpackReactHooksExample,
  SandpackGooeyDropdown,
  Image,
  Video,
};

export const MdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-xs md:text-sm font-semibold mb-6 mt-12 text-gray-900"
      {...props}
    />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-xs md:text-sm font-semibold mb-4 mt-10 text-gray-900"
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xs md:text-sm font-semibold mb-3 mt-8 text-gray-900"
      {...props}
    />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="text-xs md:text-sm font-semibold mb-3 mt-6 text-gray-900"
      {...props}
    />
  ),
  h5: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className="text-xs md:text-sm font-semibold mb-2 mt-4 text-gray-900"
      {...props}
    />
  ),
  h6: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className="text-xs md:text-sm font-semibold mb-2 mt-4 text-gray-900"
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-xs md:text-sm leading-5 md:leading-6 font-medium mb-4 text-gray-700"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-xs md:text-sm text-inherit underline font-medium"
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
      className="text-xs md:text-sm list-disc list-inside mb-4 space-y-2 font-medium"
      {...props}
    />
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      className="text-xs md:text-sm list-decimal list-inside mb-4 space-y-2 font-medium"
      {...props}
    />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="text-xs md:text-sm text-gray-700 font-medium" {...props} />
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
        className="text-xs md:text-sm min-w-full border-collapse border border-gray-300"
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
