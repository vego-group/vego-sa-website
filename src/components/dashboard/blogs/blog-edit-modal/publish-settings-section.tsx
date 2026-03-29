import InputErrorMessage from "@/components/ui/InputErrorMessage";
import type { PublishSettingsSectionFormProps } from "./types";
import { Blog } from "@/interfaces/dashboard/blogs";

type PublishSettingsSectionProps = {
  blog?: Blog;
} & PublishSettingsSectionFormProps;

function PublishSettingsSection({
  blog,
  register,
  errors,
  defaultStatus,
}: PublishSettingsSectionProps) {
  return (
    <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
      <h3 className="text-base sm:text-lg font-medium text-white">
        Publish Settings
      </h3>
      <div>
        <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
          Status
        </label>
        <select
          {...register?.("status")}
          defaultValue={
            defaultStatus ??
            (blog?.status === "publish" || blog?.status === "published"
              ? "publish"
              : "draft")
          }
          className="w-full sm:max-w-xs rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-sm text-white focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
        >
          <option value="draft" className="bg-primary">
            Save as Draft
          </option>
          <option value="publish" className="bg-primary">
            Publish Now
          </option>
        </select>
        <InputErrorMessage msg={errors?.status?.message} />
      </div>

      <div>
        <label className="block text-xs sm:text-sm font-medium text-white/80 mb-1 sm:mb-2">
          Created Date
        </label>
        <input
          type="date"
          {...register?.("created_at")}
          defaultValue={blog?.created_at?.slice(0, 10) ?? ""}
          className="w-full sm:max-w-xs rounded-xl border border-white/10 bg-white/5 px-3 sm:px-4 py-2 text-sm text-white focus:border-secondary/60 focus:ring-1 focus:ring-secondary/30 focus:outline-none"
        />
        <InputErrorMessage msg={errors?.created_at?.message} />
      </div>
    </div>
  );
}

export { PublishSettingsSection };
