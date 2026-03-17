"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border"
        >
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
            <Cookie className="h-6 w-6 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground flex-1">
              Vi bruker informasjonskapsler for &aring; forbedre din opplevelse.
              Ved &aring; fortsette &aring; bruke CoinWatch Norge samtykker du til v&aring;r bruk av
              informasjonskapsler. Les mer i v&aring;r{" "}
              <a href="/personvern" className="text-primary underline">
                personvernerkl&aelig;ring
              </a>
              .
            </p>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={decline}>
                Avsl&aring;
              </Button>
              <Button size="sm" onClick={accept}>
                Godta
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
