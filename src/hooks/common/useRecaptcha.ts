import { useCallback, useEffect } from "react";

// Custom hook for reCAPTCHA
export const useRecaptcha = () => {
  useEffect(() => {
    // Only load the script if it hasn't been loaded already
    if (!document.querySelector('script[src*="recaptcha"]')) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  const getToken = useCallback(async (action: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Check if grecaptcha is available
      if (typeof window.grecaptcha === "undefined") {
        reject(new Error("reCAPTCHA not loaded"));
        return;
      }

      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "", { action })
          .then(resolve)
          .catch(reject);
      });
    });
  }, []);

  return { getToken };
};
