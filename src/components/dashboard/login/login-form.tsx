import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Lock, Mail, MoveRight } from "lucide-react";
import { useForm } from "react-hook-form";

import { loginSchema, type LoginSchema } from "@/schemas";

import { LoginField } from "./login-field";

function LoginForm() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (values: LoginSchema) => {
    void values;
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="space-y-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <LoginField
            name="email"
            label="Email"
            type="email"
            placeholder="admin@vego.sa"
            autoComplete="email"
            icon={<Mail size={18} />}
            register={form.register}
            error={form.formState.errors.email?.message}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
        >
          <LoginField
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            icon={<Lock size={18} />}
            register={form.register}
            error={form.formState.errors.password?.message}
          />
        </motion.div>
      </motion.div>

      <motion.button
        type="submit"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.16, ease: "easeOut" }}
        className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-secondary px-6 py-3 text-sm font-semibold text-primary shadow-[0_18px_40px_-24px_color-mix(in_oklab,var(--color-secondary)_80%,transparent)] transition duration-300 hover:bg-secondary/90"
      >
        Log In
        <MoveRight
          size={18}
          className="transition duration-300 group-hover:translate-x-1"
        />
      </motion.button>
    </form>
  );
}

export { LoginForm };
