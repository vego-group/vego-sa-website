import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import styles from "./not-found.module.css";

const NotFoundPage = async () => {
  const locale = await getLocale();
  const t = await getTranslations("not-found");

  const isAr = locale === "ar";

  return (
    <div className={styles.wrapper} dir={isAr ? "rtl" : "ltr"}>
      <div className={styles.container}>
        <div className={styles.center}>
          <h1 className={styles.code}>404</h1>

          <p className={styles.title}>
            <span className={styles.oops}>{t("oops")}</span>{" "}
            <span>{t("page-not-found")}</span>
          </p>

          <p className={styles.desc}>{t("not-found-desc")}</p>

          <Link href={`/${locale}`} className={styles.button}>
            {t("go-home")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
