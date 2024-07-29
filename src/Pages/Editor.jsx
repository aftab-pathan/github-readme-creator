import { useEffect, useState } from "react";
import { sectionTemplates } from "../markdown-templates/sectionTemplates";
import { Nav } from "../components/Nav";
import { DownloadModal } from "../components/DownloadModal";
import { SectionsColumn } from "../components/SectionsColumn";
import EditorPreviewContainer from "../components/EditorPreviewContainer";
import useLocalStorage from "../hooks/useLocalStorage";

function ReadmeEditor() {
  const [markdown, setMarkdown] = useState("");
  const [selectedSectionSlugs, setSelectedSectionSlugs] = useState([]);
  const [sectionSlugs, setSectionSlugs] = useState(
    sectionTemplates.map((t) => t.slug),
  );
  const [focusedSectionSlug, setFocusedSectionSlug] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [templates, setTemplates] = useState(sectionTemplates);
  const [showDrawer, toggleDrawer] = useState(false);
  const { backup } = useLocalStorage();

  useEffect(() => {
    if (backup) {
      setTemplates(backup);
    }
  }, [backup]);

  const getTemplate = (slug) => {
    return templates.find((t) => t.slug === slug);
  };

  useEffect(() => {
    setFocusedSectionSlug(null);
  }, []);

  useEffect(() => {
    let currentSlugList = localStorage.getItem("current-slug-list");
    if (
      currentSlugList.indexOf("title-and-description") == -1 &&
      selectedSectionSlugs.indexOf("title-and-description") > -1
    ) {
      selectedSectionSlugs.splice(
        selectedSectionSlugs.indexOf("title-and-description"),
        1,
      );
    }
    setFocusedSectionSlug(
      localStorage.getItem("current-slug-list").split(",")[0],
    );
    localStorage.setItem("current-slug-list", selectedSectionSlugs);
  }, [selectedSectionSlugs]);
  const drawerClass = showDrawer ? "" : "-translate-x-full md:transform-none";
  return (
    <div className="w-full h-full">
      {/* <Head></Head> */}
      <Nav
        selectedSectionSlugs={selectedSectionSlugs}
        setShowModal={setShowModal}
        getTemplate={getTemplate}
        onMenuClick={() => {}}
        isDrawerOpen={showDrawer}
      ></Nav>
      {showModal && <DownloadModal setShowModal={setShowModal} />}
      <div className="flex md:px-6 md:pt-6">
        <div
          className={`flex flex-0 drawer-height absolute md:static p-6 md:p-0 bg-white md:bg-transparent shadow md:shadow-none z-10 md:z-0 transform transition-transform duration-500 ease-in-out ${drawerClass}`}
        >
          <SectionsColumn
            selectedSectionSlugs={selectedSectionSlugs}
            setSelectedSectionSlugs={setSelectedSectionSlugs}
            sectionSlugs={sectionSlugs}
            setSectionSlugs={setSectionSlugs}
            setFocusedSectionSlug={setFocusedSectionSlug}
            focusesSectionSlug={focusedSectionSlug}
            templates={templates}
            // originalTemplate={sectionTemplate}
            setTemplates={setTemplates}
            getTemplate={getTemplate}
          />
        </div>
        <EditorPreviewContainer
          templates={templates}
          setTemplates={setTemplates}
          getTemplate={getTemplate}
          focusedSectionSlug={focusedSectionSlug}
          setFocusedSectionSlug={setFocusedSectionSlug}
          selectedSectionSlugs={selectedSectionSlugs}
          setSelectedSectionSlugs={setSelectedSectionSlugs}
        />
      </div>
    </div>
  );
}

export default ReadmeEditor;
