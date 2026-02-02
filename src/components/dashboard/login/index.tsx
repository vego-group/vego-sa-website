"use client";

import { motion } from "framer-motion";

import { LoginCard } from "./login-card";
import { LoginFooter } from "./login-footer";
import { LoginForm } from "./login-form";
import { LoginHeader } from "./login-header";
import { LoginShell } from "./login-shell";
import { cardVariants, contentVariants } from "@/lib";

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
            initial="hidden"
            animate="visible"
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
