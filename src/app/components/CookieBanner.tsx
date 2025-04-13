"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    } else {
      setCookiesAccepted(consent === "true");
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setCookiesAccepted(true);
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "false");
    setCookiesAccepted(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 w-full bg-gray-900 text-white p-4 flex flex-col items-center md:flex-row justify-between">
      <p className="text-sm">
        Nous utilisons des cookies pour améliorer votre expérience. En acceptant, vous autorisez l'utilisation de Google Analytics.
      </p>
      <div className="mt-2 md:mt-0">
        <button onClick={handleAccept} className="bg-green-500 px-4 py-2 rounded text-white mr-2">Accepter</button>
        <button onClick={handleReject} className="bg-red-500 px-4 py-2 rounded text-white">Refuser</button>
      </div>
    </div>
  );
}
