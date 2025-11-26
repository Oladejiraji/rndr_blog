"use client";
import {
  SandpackProvider,
  SandpackPreview,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPredefinedTemplate,
  SandpackConsole,
} from "@codesandbox/sandpack-react";
import { useState } from "react";

type Tab = "preview" | "console";

// Default Theme - Light mode optimized
const theme = {
  colors: {
    hover: "#2563eb",
    clickable: "#4b5563",
    accent: "#2563eb",
    errorSurface: "#fef2f2",
    error: "#dc2626",
    surface3: "#f3f4f6",
    surface2: "#e5e7eb",
    surface1: "#ffffff",
  },
  syntax: {
    plain: "#1f2937",
    comment: {
      color: "#6b7280",
    },
    keyword: "#7c3aed",
    tag: "#0891b2",
    punctuation: "#4b5563",
    definition: "#0284c7",
    property: "#0284c7",
    static: "#6b7280",
    string: "#059669",
  },
  font: {
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
    size: "14px",
    lineHeight: "26px",
  },
};

// PreviewTabs Component
interface PreviewTabsProps {
  selectedTab: Tab;
  onTabSelect: (tab: Tab) => void;
  onClear: () => void;
  onFullscreen: () => void;
}

const PreviewTabs = ({
  selectedTab,
  onTabSelect,
  onClear,
  onFullscreen,
}: PreviewTabsProps) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-3 h-10">
      <div className="flex gap-2">
        <button
          onClick={() => onTabSelect("preview")}
          className={`px-3 py-1.5 text-sm transition-colors ${
            selectedTab === "preview"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => onTabSelect("console")}
          className={`px-3 py-1.5 text-sm transition-colors ${
            selectedTab === "console"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Console
        </button>
      </div>
      <div className="flex gap-2">
        {selectedTab === "console" && (
          <button
            onClick={onClear}
            className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 transition-colors"
            title="Clear console"
          >
            Clear
          </button>
        )}
        <button
          onClick={onFullscreen}
          className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 transition-colors"
          title="Toggle fullscreen"
        >
          Fullscreen
        </button>
      </div>
    </div>
  );
};

// TODO extends from sandpack type
interface SandpackOptions {
  editorWidthPercentage: number;
  editorHeight: number;
}

interface SandpackProps {
  template: SandpackPredefinedTemplate;
  options?: SandpackOptions;
  files: Record<
    string,
    string | { code: string; hidden?: boolean; active?: boolean }
  >;
  dependencies?: Record<string, string>;
  autorun?: boolean;
  defaultTab?: Tab;
}

const defaultFilesByTemplate: Partial<
  Record<SandpackPredefinedTemplate, Record<string, string>>
> = {
  react: {},
  "react-ts": {},
  vanilla: {},
  "vanilla-ts": {},
  angular: {},
  vue: {},
  "vue-ts": {},
  svelte: {},
  solid: {},
  "test-ts": {},
};

const Sandpack = (props: SandpackProps) => {
  const {
    files,
    dependencies,
    template,
    autorun = true,
    defaultTab = "preview",
  } = props;

  const [consoleKey, setConsoleKey] = useState(0);
  const [selectedTab, setSelectedTab] = useState<Tab>(defaultTab);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);

  const defaultEditorOptions = {
    editorHeight: 520,
  };

  const handleFullscreen = () => {
    setIsFullscreen((prev) => {
      if (!prev) {
        // Entering fullscreen - save current scroll position
        setSavedScrollPosition(window.scrollY);
        document.body.style.overflow = "hidden";
      } else {
        // Exiting fullscreen - restore scroll position
        document.body.style.overflow = "auto";
        // Use requestAnimationFrame to ensure DOM has updated
        requestAnimationFrame(() => {
          window.scrollTo(0, savedScrollPosition);
        });
      }
      return !prev;
    });
  };

  return (
    <div
      className={
        isFullscreen ? "sandpack-wrapper-fullscreen" : "sandpack-wrapper"
      }
    >
      <SandpackProvider
        template={template}
        theme={theme}
        files={{
          ...files,
          ...defaultFilesByTemplate[template],
        }}
        customSetup={{
          dependencies: dependencies || {},
        }}
        options={{
          autorun,
        }}
      >
        <SandpackLayout>
          <SandpackCodeEditor
            showRunButton={false}
            showTabs
            showLineNumbers
            style={{
              borderRight: "1px solid #e5e7eb",
              height: isFullscreen
                ? "100dvh"
                : defaultEditorOptions.editorHeight,
            }}
          />
          <div
            className="flex flex-col justify-between w-1/2 max-md:w-full"
            style={{
              height: isFullscreen ? "100dvh" : "520px",
            }}
          >
            <PreviewTabs
              onFullscreen={handleFullscreen}
              onClear={() => setConsoleKey(consoleKey + 1)}
              onTabSelect={(tab) => setSelectedTab(tab)}
              selectedTab={selectedTab}
            />
            <SandpackConsole
              key={consoleKey}
              showHeader
              style={{
                height: isFullscreen
                  ? "100dvh"
                  : defaultEditorOptions.editorHeight - 40,
                display: selectedTab === "console" ? "flex" : "none",
              }}
            />
            <SandpackPreview
              showRefreshButton={false}
              showOpenInCodeSandbox={false}
              style={{
                height: isFullscreen
                  ? "100dvh"
                  : defaultEditorOptions.editorHeight - 40,
                display: selectedTab === "preview" ? "flex" : "none",
              }}
            />
          </div>
        </SandpackLayout>
      </SandpackProvider>
      <style jsx>{`
        .sandpack-wrapper :global(.sp-layout) {
          background: #ffffff;
          position: relative;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          margin: 2rem 0;
          border: 1px solid #e5e7eb;
        }

        @media (max-width: 880px) {
          .sandpack-wrapper :global(.sp-layout) {
            display: block;
            width: 95vw;
            left: 50%;
            right: 50%;
            margin-left: -47.5vw;
            margin-right: -47.5vw;
          }
        }

        @media (min-width: 880px) {
          .sandpack-wrapper :global(.sp-layout) {
            position: relative;
            width: calc(100% + 150px);
            margin-left: -75px;
            margin-right: -75px;
          }
        }

        .sandpack-wrapper-fullscreen :global(.sp-layout) {
          width: 100%;
          height: 100%;
          border-radius: 0;
          margin: 0;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 101;
          border: none;
        }

        .sandpack-wrapper-fullscreen :global(.sp-layout iframe) {
          height: 100dvh !important;
        }

        .sandpack-wrapper :global(.cm-gutterElement) {
          font-size: 12px;
          user-select: none;
          opacity: 1;
          color: #9ca3af;
        }

        .sandpack-wrapper :global(.sp-console > button) {
          display: none;
        }

        .sandpack-wrapper :global(.sp-tab-container) {
          padding-right: 0.5rem;
          outline: none !important;
        }
      `}</style>
    </div>
  );
};

export default Sandpack;
