import Image from "next/image";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEventHandler,
  type RefObject,
} from "react";
import InputErrorMessage from "@/components/ui/InputErrorMessage";

type CoverImageSectionProps = {
  id: number;
  fileInputRef: RefObject<HTMLInputElement | null>;
  imageSrc: string;
  imageValue: string;
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  fileInputName?: string;
  fileInputOnBlur?: FocusEventHandler<HTMLInputElement>;
  fileInputRefRegister?: (instance: HTMLInputElement | null) => void;
  errorMessage?: string;
  onRemoveImage: () => void;
};

function CoverImageSection({
  id,
  fileInputRef,
  imageSrc,
  imageValue,
  onImageUpload,
  fileInputName,
  fileInputOnBlur,
  fileInputRefRegister,
  errorMessage,
  onRemoveImage,
}: CoverImageSectionProps) {
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  const normalizedImageSrc =
    typeof imageSrc === "string" ? imageSrc.trim() : "";
  const hasImageValue =
    !!normalizedImageSrc &&
    normalizedImageSrc !== "null" &&
    normalizedImageSrc !== "undefined";
  const hasImage = hasImageValue && !imageLoadFailed;

  useEffect(() => {
    setImageLoadFailed(false);
  }, [normalizedImageSrc]);

  return (
    <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
      <h3 className="text-base sm:text-lg font-medium text-white">
        Cover Image
      </h3>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-col items-center justify-center w-full">
          <label
            htmlFor={`image-upload-${id}`}
            className="flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed border-white/20 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-colors"
          >
            <div className="flex flex-col items-center justify-center px-4 py-3 sm:py-5">
              <p className="text-xs sm:text-sm text-white/60 text-center">
                <span className="font-semibold">Click to upload</span>
                <span className="hidden sm:inline"> or drag and drop</span>
              </p>
              <p className="text-xs text-white/40 mt-1">
                PNG, JPG, JPEG, GIF (Max 5MB)
              </p>
            </div>
            <input
              id={`image-upload-${id}`}
              type="file"
              ref={(element) => {
                fileInputRef.current = element;
                fileInputRefRegister?.(element);
              }}
              className="hidden"
              name={fileInputName}
              accept="image/png, image/jpeg, image/jpg, image/gif"
              onBlur={fileInputOnBlur}
              onChange={onImageUpload}
            />
          </label>
          <InputErrorMessage msg={errorMessage} />
        </div>

        <div className="relative rounded-xl overflow-hidden border border-white/10 group">
          <div className="relative w-full h-32 sm:h-40 md:h-48 bg-white/5">
            <Image
              src={hasImage ? normalizedImageSrc : "/images/placeholder-image.svg"}
              alt="Cover preview"
              onError={() => setImageLoadFailed(true)}
              className={
                hasImage
                  ? "object-cover"
                  : "object-contain p-4 brightness-0 invert opacity-35"
              }
              fill
            />
          </div>
          {hasImage ? (
            <button
              type="button"
              onClick={onRemoveImage}
              className="absolute top-2 right-2 p-1.5 bg-red-500/80 hover:bg-red-600 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              title="Remove image"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : null}
        </div>

        <input type="hidden" name="coverImage" value={imageValue} />
      </div>
    </div>
  );
}

export { CoverImageSection };
