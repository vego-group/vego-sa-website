"use client";

import { motion, type Variants } from "framer-motion";

import { LoginCard } from "./login-card";
import { LoginFooter } from "./login-footer";
import { LoginForm } from "./login-form";
import { LoginHeader } from "./login-header";
import { LoginShell } from "./login-shell";

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
} satisfies Variants;

const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, delay: 0.12 },
  },
} satisfies Variants;

function Login() {
  return (
    <LoginShell>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="w-full max-w-130"
      >
        <LoginCard>
          <motion.div
            variants={contentVariants}
            className="space-y-7"
          >
            <LoginHeader />
            <LoginForm />
            <LoginFooter />
          </motion.div>
        </LoginCard>
      </motion.div>
    </LoginShell>
  );
}

export default Login;
