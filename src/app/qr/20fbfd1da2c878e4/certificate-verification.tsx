"use client";

import Image from "next/image";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import styles from "./verification.module.css";

type Language = "ar" | "en";
type LocalizedText = Record<Language, string>;

const DIGEST =
  "20fbfd1da2c878e4852fc0bf9df95eb56f15283afb4fda95e0eb4a5b77a989c4";

const ISSUED_FILES: Record<string, LocalizedText> = {
  f36a77fb625aadf074575654cd0563487d2bc43d718497c30b492ec193c3526a: {
    ar: "النسخة العربية (PDF)",
    en: "Arabic edition (PDF)",
  },
  "3cf01aaabc09e87ff30f642cf7f4413b24baa99286f8924e6bffa7c16f160b1d": {
    ar: "النسخة الإنجليزية (PDF)",
    en: "English edition (PDF)",
  },
};

const copy: Record<string, LocalizedText> = {
  eyebrow: { ar: "سجل شهادة صادرة", en: "Issued certificate record" },
  title: {
    ar: "شهادة إثبات ملكية الأصول البرمجية",
    en: "Certificate of Software Asset Ownership",
  },
  intro: {
    ar: "هذه الصفحة هي سجل الشهادة التي تحمل الرقم المرجعي الظاهر أدناه.",
    en: "This page is the record of the Certificate bearing the reference number below.",
  },
  reference: { ar: "الرقم المرجعي", en: "Reference no." },
  issuedAt: { ar: "تاريخ الإصدار", en: "Date of issue" },
  issuedBy: { ar: "الجهة المُصدِرة", en: "Issued by" },
  issuer: {
    ar: "م. محمود مطر، المدير التقني (CTO)",
    en: "Eng. Mahmoud Matar, Chief Technology Officer (CTO)",
  },
  company: { ar: "الشركة", en: "Company" },
  nationalNumber: { ar: "الرقم الوطني الموحد", en: "Unified national no." },
  digestTitle: {
    ar: "بصمة سجل البصمات (SHA-256)",
    en: "Register digest (SHA-256)",
  },
  digestDescription: {
    ar: "تُحتسب هذه البصمة من نص قياسي يضم الرقم المرجعي وبيانات كل مستودع في جدول البصمات الرقمية: الاسم، وعدد التعديلات، ومعرّف آخر تعديل، وبصمة شجرة الملفات، وبصمة SHA-256 للأرشيف. أي تغيير في أي رقم منها يغيّر البصمة، وأول 16 خانة منها تشكّل عنوان هذه الصفحة.",
    en: "This digest is computed from a canonical text containing the reference number and, for every repository in the digital fingerprint register: its name, commit count, last-commit identifier, file-tree fingerprint and archive SHA-256. Changing any value changes the digest. The first 16 characters of the digest form this page’s address.",
  },
  copyDigest: { ar: "نسخ البصمة", en: "Copy digest" },
  copied: { ar: "تم النسخ", en: "Copied" },
  digestMethodTitle: { ar: "كيف تُحتسب البصمة", en: "How the digest is computed" },
  digestMethod: {
    ar: "تُجمع السطور الآتية بفاصل سطر جديد (بلا سطر أخير فارغ) بترميز UTF-8، ثم تُطبَّق SHA-256: السطر الأول الرقم المرجعي، ثم سطر لكل مستودع بالترتيب الوارد في الشهادة بالصيغة: الاسم|عدد التعديلات|معرّف آخر تعديل|بصمة شجرة الملفات|بصمة SHA-256 للأرشيف. وعدد السطور الكلي 16.",
    en: "The following lines are joined with a newline (no trailing empty line), encoded as UTF-8, then hashed with SHA-256: line 1 is the reference number, then one line per repository in the order of the Certificate, in the form name|commit count|last-commit identifier|file-tree fingerprint|archive SHA-256. There are 16 lines in total.",
  },
  checkTitle: { ar: "تحقق من ملف الشهادة", en: "Check a Certificate file" },
  checkDescription: {
    ar: "اختر ملف الـPDF لتُحتسب بصمته على جهازك، دون رفعه إلى أي خادم، ثم تُقارن بالملفات الصادرة أدناه.",
    en: "Choose the PDF file; its SHA-256 is computed on your device, without uploading it anywhere, and compared with the issued files below.",
  },
  chooseFile: {
    ar: "اسحب الملف إلى هنا أو انقر للاختيار",
    en: "Drop the file here or click to choose",
  },
  computing: { ar: "جارٍ احتساب البصمة…", en: "Computing digest…" },
  fileMatch: { ar: "الملف مطابق لملف صادر: ", en: "The file matches an issued file: " },
  fileMismatch: {
    ar: "الملف لا يطابق أي ملف صادر. قد يكون معدّلًا أو نسخة غير معتمدة.",
    en: "The file does not match any issued file. It may have been modified or be an unofficial copy.",
  },
  fileError: {
    ar: "تعذّر احتساب البصمة في هذا المتصفح.",
    en: "This browser could not compute the digest.",
  },
  issuedFile: { ar: "الملف الصادر", en: "Issued file" },
  wordNotice: {
    ar: "نسخ Word قابلة للتعديل ولا تحمل بصمة معتمدة؛ والمرجع الصادر هو ملفا الـPDF.",
    en: "Word copies are editable and carry no issued digest; the issued reference is the two PDF files.",
  },
  commercialTitle: { ar: "السجل التجاري", en: "Commercial registration" },
  commercialDescription: {
    ar: "يمكن الاطلاع على بيانات السجل التجاري للشركة من المصدر الرسمي في مركز الأعمال السعودي.",
    en: "The Company’s commercial registration data can be viewed at the official source, the Saudi Business Center.",
  },
  commercialAction: { ar: "عرض السجل التجاري", en: "View the commercial registration" },
  sourceTitle: { ar: "الاطلاع على الشيفرة المصدرية", en: "Access to the source code" },
  sourceDescription: {
    ar: "لا تتضمن الشهادة أي جزء من الشيفرة المصدرية. ولا يتم الاطلاع عليها إلا بإحدى طريقتين: مراجعة في مقر الشركة تحت اتفاقية عدم إفصاح (NDA)، أو إيداعها لدى طرف ثالث (Escrow) يُتفق عليه بين الأطراف.",
    en: "The Certificate contains no source code. The code may be examined only in one of two ways: a review at the Company’s premises under a non-disclosure agreement (NDA), or deposit with an agreed third party (Escrow).",
  },
  confidential: {
    ar: "سري – للاستخدام في التقييم المالي فقط",
    en: "Confidential — For Financial Valuation Purposes Only",
  },
};

type FileResult = {
  status: "checking" | "match" | "mismatch" | "error";
  hash?: string;
  issuedFile?: LocalizedText;
};

function toHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default function CertificateVerification() {
  const [language, setLanguage] = useState<Language>("ar");
  const [copied, setCopied] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [fileResult, setFileResult] = useState<FileResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const text = (key: keyof typeof copy) => copy[key][language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const selectLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setCopied(false);
  };

  const copyDigest = async () => {
    try {
      await navigator.clipboard.writeText(DIGEST);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.getSelection()?.selectAllChildren(document.getElementById("digest")!);
    }
  };

  const verifyFile = async (file?: File) => {
    if (!file) return;
    setFileResult({ status: "checking" });

    try {
      const hash = toHex(await crypto.subtle.digest("SHA-256", await file.arrayBuffer()));
      const issuedFile = ISSUED_FILES[hash];
      setFileResult({
        status: issuedFile ? "match" : "mismatch",
        hash,
        issuedFile,
      });
    } catch {
      setFileResult({ status: "error" });
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    void verifyFile(event.target.files?.[0]);
  };

  const onDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDragging(false);
    void verifyFile(event.dataTransfer.files?.[0]);
  };

  const resultMessage = () => {
    if (!fileResult) return null;
    if (fileResult.status === "checking") return text("computing");
    if (fileResult.status === "error") return text("fileError");
    if (fileResult.status === "match" && fileResult.issuedFile) {
      return `${text("fileMatch")}${fileResult.issuedFile[language]}`;
    }
    return text("fileMismatch");
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>
          <Image
            className={styles.logo}
            src="/images/logo.svg"
            alt="VEGO Group"
            width={150}
            height={84}
            priority
          />
          <div className={styles.languageSwitch} role="group" aria-label="Language">
            <button
              type="button"
              className={language === "ar" ? styles.activeLanguage : undefined}
              aria-pressed={language === "ar"}
              onClick={() => selectLanguage("ar")}
            >
              العربية
            </button>
            <button
              type="button"
              className={language === "en" ? styles.activeLanguage : undefined}
              aria-pressed={language === "en"}
              onClick={() => selectLanguage("en")}
            >
              English
            </button>
          </div>
        </div>
      </header>

      <main className={`${styles.container} ${styles.main}`}>
        <section className={`${styles.card} ${styles.hero}`}>
          <span className={styles.eyebrow}>
            <span aria-hidden="true" />
            {text("eyebrow")}
          </span>
          <h1>{text("title")}</h1>
          <p className={styles.lead}>{text("intro")}</p>
          <dl className={styles.details}>
            <div>
              <dt>{text("reference")}</dt>
              <dd className={styles.mono}>VEGO-CTO-OWN-20261020-001</dd>
            </div>
            <div>
              <dt>{text("issuedAt")}</dt>
              <dd className={styles.mono}>{language === "ar" ? "2026/10/20" : "2026-10-20"}</dd>
            </div>
            <div>
              <dt>{text("issuedBy")}</dt>
              <dd>{text("issuer")}</dd>
            </div>
            <div>
              <dt>{text("company")}</dt>
              <dd>
                VEGO <small>Alanitlaq Alakhdar Company</small>
              </dd>
            </div>
            <div>
              <dt>{text("nationalNumber")}</dt>
              <dd className={styles.mono}>7036997315</dd>
            </div>
          </dl>
        </section>

        <section className={styles.card} aria-labelledby="digest-title">
          <h2 id="digest-title">{text("digestTitle")}</h2>
          <p>{text("digestDescription")}</p>
          <div className={styles.digestBox}>
            <code id="digest">{DIGEST}</code>
            <button type="button" className={styles.secondaryButton} onClick={copyDigest}>
              {copied ? text("copied") : text("copyDigest")}
            </button>
          </div>
          <details className={styles.detailsDisclosure}>
            <summary>{text("digestMethodTitle")}</summary>
            <p>{text("digestMethod")}</p>
          </details>
        </section>

        <section className={styles.card} aria-labelledby="file-title">
          <h2 id="file-title">{text("checkTitle")}</h2>
          <p>{text("checkDescription")}</p>
          <input
            ref={inputRef}
            className={styles.visuallyHidden}
            type="file"
            accept="application/pdf,.pdf"
            onChange={onFileChange}
          />
          <button
            type="button"
            className={`${styles.dropZone} ${dragging ? styles.dropZoneActive : ""}`}
            onClick={() => inputRef.current?.click()}
            onDragEnter={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragOver={(event) => event.preventDefault()}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
          >
            <span className={styles.uploadIcon} aria-hidden="true">↑</span>
            <strong>{text("chooseFile")}</strong>
            <span>PDF · SHA-256</span>
          </button>
          {fileResult && (
            <div
              className={`${styles.result} ${
                fileResult.status === "match" ? styles.success : fileResult.status === "checking" ? "" : styles.error
              }`}
              role="status"
              aria-live="polite"
            >
              <strong>{resultMessage()}</strong>
              {fileResult.hash && <code>{fileResult.hash}</code>}
            </div>
          )}
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>{text("issuedFile")}</th>
                  <th>SHA-256</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(ISSUED_FILES).map(([hash, name]) => (
                  <tr key={hash}>
                    <td>{name[language]}</td>
                    <td><code>{hash}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.note}>{text("wordNotice")}</p>
        </section>

        <section className={styles.card} aria-labelledby="commercial-title">
          <h2 id="commercial-title">{text("commercialTitle")}</h2>
          <p>{text("commercialDescription")}</p>
          <a
            className={styles.primaryButton}
            href="https://qr.saudibusiness.gov.sa/viewcr?nCrNumber=KQ1+DSOOHJPVL2JnQ2CaAg=="
            target="_blank"
            rel="noopener noreferrer"
          >
            {text("commercialAction")}
          </a>
        </section>

        <section className={styles.card} aria-labelledby="source-title">
          <h2 id="source-title">{text("sourceTitle")}</h2>
          <p>{text("sourceDescription")}</p>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <strong>{text("confidential")}</strong>
          <span aria-hidden="true">·</span>
          <span className={styles.mono}>VEGO-CTO-OWN-20261020-001</span>
        </div>
      </footer>
    </div>
  );
}
