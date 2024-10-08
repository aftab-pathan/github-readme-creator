import {
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  arrayMove,
  sortableKeyboardCoordinates,
  SortableContext,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useEffect } from "react";

import useLocalStorage from "../hooks/useLocalStorage";
import { SortableItem } from "./SortableItem";
import { CustomSection } from "./CustomSection";

const keybabCaseToTitleCase = (str) => {
  return str
    .split("-")
    .map((word) => {
      return word.slice(0, 1).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

export const SectionsColumn = ({
  selectedSectionSlugs,
  setSelectedSectionSlugs,
  sectionSlugs,
  setSectionSlugs,
  setFocusedSectionSlug,
  focusesSectionSlug,
  templates,
  originalTemplate,
  setTemplates,
  getTemplate,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const { saveBackup, deleteBackup } = useLocalStorage();

  let alphabetizedSectionSlugs = sectionSlugs.sort();

  useEffect(() => {
    let slugsList = ["title-and-description"];
    if (localStorage.getItem("current-slug-list")) {
      const slugsFromPreviousSession =
        localStorage.getItem("current-slug-list");
      console.log(slugsFromPreviousSession);
      slugsList = slugsFromPreviousSession.split(",");
    }

    slugsList.forEach(function (entry) {
      setSectionSlugs((prev) => prev.filter((s) => s != entry));
    });
    setSelectedSectionSlugs(slugsList);
    setFocusedSectionSlug(slugsList[0]);
    localStorage.setItem("current-slug-list", slugsList);
    localStorage.setItem("current-focused-slug", slugsList[0]);
  }, []);

  useEffect(() => {
    if (selectedSectionSlugs.length > 0) {
      localStorage.setItem("current-slug-list", selectedSectionSlugs);
    }
  }, [selectedSectionSlugs]);

  useEffect(() => {
    localStorage.setItem("current-focused-slug", focusesSectionSlug);
  }, [focusesSectionSlug]);

  const onAddSection = (e, section) => {
    localStorage.setItem("current-focused-slug", section);
    setSectionSlugs((prev) => prev.filter((s) => s !== section));
    setSelectedSectionSlugs((prev) => [...prev, section]);
    setFocusedSectionSlug(section);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setSelectedSectionSlugs((sections) => {
        const oldIndex = sections.findIndex((s) => s === active.id);
        const newIndex = sections.findIndex((s) => s === over.id);

        return arrayMove(sections, oldIndex, newIndex);
      });
    }
  };

  const onDeleteSection = (e, sectionSlug) => {
    e.stopPropagation();
    setSelectedSectionSlugs((prev) => prev.filter((s) => s !== sectionSlug));
    setSectionSlugs((prev) => [...prev, sectionSlug]);
    setFocusedSectionSlug(null);
    localStorage.setItem("current-focused-slug", "noEdit");
  };

  const onResetSection = (e, sectionSlug) => {
    e.stopPropagation();
    let originalSection;
    if (sectionSlug.slice(0, 6) === "custom") {
      const sectionTitle = keybabCaseToTitleCase(
        sectionSlug.slice(6, sectionSlug.length),
      );
      originalSection = {
        slug: sectionSlug,
        name: sectionTitle,
        markdown: `
## ${sectionTitle}`,
      };
    } else {
      originalSection = originalTemplate.find((s) => s.slug === sectionSlug);
    }

    const newTemplates = templates.map((s) => {
      if (s.slug === originalSection.slug) {
        return originalSection;
      }
      return s;
    });
    setTemplates(newTemplates);
    saveBackup(newTemplates);
  };

  const resetSelectedSections = () => {
    const data = localStorage.getItem("current-slug-list");

    const sectionResetConfirmed = window.confirm(
      "All sections of your readme will be removed, to continue, click OK",
    );
    if (sectionResetConfirmed === true) {
      const slugList = data ? data.split(",") : [];
      setSectionSlugs((prev) =>
        [...prev, ...slugList].filter((s) => s !== "title-and-description"),
      );
      setSelectedSectionSlugs(["title-and-description"]);
      setFocusedSectionSlug("title-and-description");
      localStorage.setItem("current-focused-slug", "noEdit");
      setTemplates(originalTemplate);
      deleteBackup();
    }
  };

  return (
    <div className="sections">
      <h3 className="border-transparent text-green-500 whitespace-nowrap px-1 border-b-2 font-medium text-sm focus:outline-none">
        Sections
        {
          <button
            className="focus:outline-none float-right"
            type="button"
            onClick={resetSelectedSections}
          >
            <span className="pl-2 float-right">Reset</span>
            <img
              className="w-auto h-5 inline-block"
              src="reset.svg"
              alt="Delete"
            />
          </button>
        }
      </h3>
      <div className="full-screen overflow-y-scroll px-3 pr-4">
        {selectedSectionSlugs.length > 0 && (
          <h4 className="text-xs leading-6 text-gray-900 mb-3">
            Click on a section below to edit the contents
          </h4>
        )}
        <ul className="space-y-3 mb-12">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={selectedSectionSlugs}>
              {selectedSectionSlugs.map((s) => {
                const template = getTemplate(s);
                if (template) {
                  return (
                    <SortableItem
                      key={s}
                      id={s}
                      section={template}
                      focusesSectionSlug={focusesSectionSlug}
                      setFocusedSectionSlug={setFocusedSectionSlug}
                      onDeleteSection={onDeleteSection}
                      onResetSection={onResetSection}
                    />
                  );
                }
              })}
            </SortableContext>
          </DndContext>
        </ul>
        {sectionSlugs.length > 0 && (
          <h4 className="text-xs leading-6 text-gray-900 mb-3">
            Click on a section below to add it to your readme
          </h4>
        )}
        <CustomSection
          setSelectedSectionSlugs={setSelectedSectionSlugs}
          setFocusedSectionSlug={setFocusedSectionSlug}
          setTemplates={setTemplates}
        />
        <ul className="space-y-3 mb-12">
          {alphabetizedSectionSlugs.map((s) => {
            const template = getTemplate(s);
            if (template) {
              return (
                <li key={s}>
                  <button
                    className="flex items-center block w-full h-full py-2 pl-3 pr-6 bg-white rounded-md shadow cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                    type="button"
                    onClick={(e) => onAddSection(e, s)}
                  >
                    <span>{template.name}</span>
                  </button>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};
