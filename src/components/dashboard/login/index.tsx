"use client";

import { motion } from "framer-motion";

import { LoginCard } from "./login-card";
import { LoginFooter } from "./login-footer";
import { LoginForm } from "./login-form";
import { LoginHeader } from "./login-header";
import { LoginShell } from "./login-shell";

function Login() {
  return (
    <LoginShell>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="w-full max-w-130"
      >
        <LoginCard>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.12 }}
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
