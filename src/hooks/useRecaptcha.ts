import { useCallback } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string },
      ) => Promise<string>;
    };
  }
}

interface UseRecaptchaResponse {
  executeRecaptcha: () => Promise<string>;
}

export function useRecaptcha(): UseRecaptchaResponse {
  const executeRecaptcha = useCallback(async (): Promise<string> => {
    if (typeof window === "undefined" || !window.grecaptcha) {
      throw new Error("reCAPTCHA not loaded");
    }

    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, {
            action: "submit",
          })
          .then(resolve)
          .catch(reject);
      });
    });
  }, []);

  return { executeRecaptcha };
}
