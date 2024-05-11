import { Stack, useMediaQuery } from "@mui/material";
import DataLinks from "./DataLinks";
import { useTranslation } from "react-i18next";


export default function NavLinks() {
  const isLargeScreen = useMediaQuery("(min-width:992px)");
  const { t, i18n } = useTranslation();
  const storedLanguage = i18n.language;
  const title1 = t("header3.dataLinks.title1");
  const title2 = t("header3.dataLinks.title2");
  const title3 = t("header3.dataLinks.title3");
  const title4 = t("header3.dataLinks.title4");

  return (
    <>
      <Stack  direction={isLargeScreen ? "row" : "column"} spacing={2} color={'#fff'}>
        <DataLinks
          data={[
            {
              title: title1,
              rightAligned: storedLanguage === 'ar' ? true : false,
              links: [
                {
                  label: "Link 1",
                  url: "#",
                  subLinks: [
                    { label: "sublink1", url: "#" },
                    { label: "sublink2", url: "#" },
                  ],
                },
                { label: "Link 2", url: "#" },
              ],
            },
            {
              title: title2,
              rightAligned: storedLanguage === 'ar' ? true : false,
              links: [
                {
                  label: "Link9",
                  url: "#",
                  subLinks: [
                    { label: "sublink3", url: "#" },
                    { label: "sublink4", url: "#" },
                  ],
                },
                { label: "Link10", url: "#" },
                {
                  label: "Link11",
                  url: "#"
                },
              ],
            },
            {
              title: title3,
              rightAligned: storedLanguage === 'en' ? true : false,
              links: [
                {
                  label: "Link12",
                  url: "#"
                },
                { label: "Link13", url: "#" },
                {
                  label: "Link14",
                  url: "#",
                  subLinks: [
                    { label: "sublink3", url: "#" },
                    { label: "sublink6", url: "#" },
                  ],
                },
              ],
            },
            {
              title: title4,
              rightAligned: storedLanguage === 'en' ? true : false,
              links: [
                {
                  label: "Link15",
                  url: "#",
                  subLinks: [
                    { label: "sublink3", url: "#" },
                    { label: "sublink4", url: "#" },
                  ],
                },
                { label: "Link16", url: "#" },
                {
                  label: "Link17",
                  url: "#",
                  subLinks: [
                    { label: "sublink3", url: "#" },
                    { label: "sublink4", url: "#" },
                    { label: "sublink5", url: "#" },
                    { label: "sublink6", url: "#" },
                  ],
                },
              ],
            },
          ]}
        />
      </Stack>
    </>
  );
}
