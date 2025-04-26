import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

type HelmetTagsProps = {
  title: string;
  description: string;
  keywords?: string;
  index?: true | false;
  children?: React.ReactNode | string;
  canonical?: string;
};

export default function HelmetTags({
  title,
  description = "Lana",
  keywords,
  index = true,
  children,
  canonical,
}: HelmetTagsProps) {
  const { i18n } = useTranslation("");
const lng=i18n.language?.startsWith("ar")?"ar":"en"
  const baseURL = import.meta.env.VITE_WEBSITE_BASE_URL + "/" + lng;

  return (
    <Helmet>
      {/* 
      //!---- Standard metadata tags ----
     */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {index && <link rel="canonical" href={`${baseURL}/${canonical}`} />}
      {index && <meta name="keywords" content={keywords} />}
      {!index && <meta name="robots" content="noindex, nofollow" />}
      {/* 
          //!---- Facebook tags ------
      */}
      {index && <meta property="og:title" content={title} />}
      {index && <meta property="og:description" content={description} />}
      {index && <meta property="og:type" content="website" />}
      {/*      {index && <meta property="og:url" content={`${baseURL}`} />}
      {index && <meta property="og:image" content={`${baseURL}`} />} */}
      {/* 
          //!---- Twitter tags -----
           */}
      {index && <meta name="twitter:title" content={title} />}
      {index && <meta name="twitter:description" content={description} />}
      {/*   {index && <meta name="twitter:site" content="@lana" />}
      {index && <meta name="twitter:creator" content="@lana" />} */}
      {index && <meta name="twitter:card" content="summary_large_image" />}
      {/* {index && <meta name="twitter:image" content={`${baseURL}`} />} */}
      {children}
    </Helmet>
  );
}
