import { useEffect } from "react";
import siteConfig from "../../content/siteConfig";

const SEO = ({ title, description }) => {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
    document.title = fullTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description || siteConfig.description);
    }
  }, [title, description]);

  return null;
};

export default SEO;
