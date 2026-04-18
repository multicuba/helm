"use client";

import { useRouter } from "next/navigation";
import { useWorkspaceStore } from "@/lib/stores";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useWorkspaceStore((s) => s.setUser);

  const handleDemoLogin = () => {
    setUser({
      id: "daniel",
      name: "Daniel Torres",
      email: "daniel@multitopup.com",
      role: "Chairman / Operator",
      initials: "DT",
    });
    router.push("/command");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="max-w-sm w-full"
      >
        <div className="flex items-center gap-3 mb-12">
          <div className="relative w-10 h-10 rounded-full border-[1.5px] border-brass flex items-center justify-center">
            <div className="absolute w-[1.5px] h-7 top-[5px] bg-brass" />
            <div className="absolute h-[1.5px] w-7 left-[5px] bg-brass" />
          </div>
          <div className="font-serif text-2xl font-medium">Helm</div>
        </div>

        <h1 className="text-display text-4xl mb-3">
          The bridge between<br />
          the <em className="text-display-italic text-brass">idea</em> and the<br />
          <em className="text-display-italic text-brass">shipped product.</em>
        </h1>

        <p className="text-text-secondary mb-10 leading-relaxed">
          Operator console for founders running multiple companies with hybrid human+AI teams.
        </p>

        <button
          onClick={handleDemoLogin}
          className="w-full bg-brass text-bg-deep font-medium py-3 rounded-md hover:bg-brass-bright transition-colors"
        >
          Continue as demo (Daniel Torres)
        </button>

        <div className="text-mono-meta text-center mt-6">
          v0.1 · prototype · no real data
        </div>
      </motion.div>
    </div>
  );
}
