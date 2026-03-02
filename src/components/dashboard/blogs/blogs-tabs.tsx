"use client";

import { useEffect, useMemo, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { BlogsTabItem } from "./blogs-tab-item";

type TabType = "all" | "published" | "drafts";

type BlogsTabsProps = {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
};

function BlogsTabs({ activeTab, onTabChange }: BlogsTabsProps) {
  const [tabsSwiper, setTabsSwiper] = useState<SwiperType | null>(null);
  const tabs = useMemo(
    () => [
      { id: "all", label: "All" },
      { id: "published", label: "Published" },
      { id: "drafts", label: "Drafts" },
    ],
    [],
  );

  useEffect(() => {
    if (!tabsSwiper) return;

    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (activeIndex >= 0) {
      tabsSwiper.slideTo(activeIndex, 250);
    }
  }, [activeTab, tabs, tabsSwiper]);

  return (
    <div className="border-b border-white/10">
      <Swiper
        onSwiper={setTabsSwiper}
        slidesPerView="auto"
        spaceBetween={8}
        className="w-full"
      >
        {tabs.map((tab) => (
          <SwiperSlide key={tab.id} className="w-auto!">
            <BlogsTabItem
              isActive={activeTab === tab.id}
              label={tab.label}
              onClick={() => onTabChange(tab.id as TabType)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export { BlogsTabs };
