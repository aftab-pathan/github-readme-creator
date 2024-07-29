import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import RawPreview from "./RawPreview";
import { Link } from "react-router-dom";
import { TAB } from "../constant";

export const PreviewColumn = ({
  selectedSectionSlugs,
  getTemplate,
  selectedTab,
}) => {
  selectedSectionSlugs = [...new Set(selectedSectionSlugs)];
  const markdown = selectedSectionSlugs.reduce((acc, section) => {
    const template = getTemplate(section);
    if (template) {
      return `${acc}${template?.markdown}`;
    } else {
      return acc;
    }
  }, ``);

  const showPreview = selectedTab == TAB.PREVIEW;

  return (
    <div
      className={`h-full preview-width md:w-auto border border-gray-500 rounded-md p-6 preview bg-white full-screen overflow-x-scroll md:overflow-x-auto ${
        showPreview ? "overflow-y-scroll" : "overflow-hidden"
      }`}
    >
      {/* {showPreview ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          children={markdown}
          renderers={{
            link: (props) => (
              <Link to={props.href} target="__blank">
                {props.children}
              </Link>
            ),
          }}
        />
      ) : (
        <RawPreview text={markdown} />
      )} */}
    </div>
  );
};
