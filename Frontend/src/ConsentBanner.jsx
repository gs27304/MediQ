import { useEffect, useState } from "react";

const CONSENT_KEY = "site_consent";

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [consent, setConsent] = useState({
    performance: false,
    functional: false,
    targeting: false
  });

  const buildActiveGroups = (consentData) => {
    let groups = ["C0001"];
    if (consentData.performance) groups.push("C0002");
    if (consentData.functional) groups.push("C0003");
    if (consentData.targeting) groups.push("C0004");
    window.OptanonActiveGroups = "," + groups.join(",") + ",";
  };

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      buildActiveGroups({
        performance: false,
        functional: false,
        targeting: false
      });
      setShowBanner(true);
    } else {
      const parsed = JSON.parse(stored);
      setConsent(parsed);
      buildActiveGroups(parsed);
    }

    window.openCookieSettings = () => {
      setShowBanner(false);
      setShowSettings(true);
    };

    return () => {
      delete window.openCookieSettings;
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      showBanner || showSettings ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showBanner, showSettings]);

  const saveConsent = (updatedConsent) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(updatedConsent));
    setConsent(updatedConsent);
    buildActiveGroups(updatedConsent);
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    saveConsent({
      performance: true,
      functional: true,
      targeting: true
    });
  };

  const rejectAll = () => {
    saveConsent({
      performance: false,
      functional: false,
      targeting: false
    });
  };

  const savePreferences = () => {
    saveConsent(consent);
  };

  if (!showBanner && !showSettings) return null;

  // Modern Dark Theme Styles
  const styles = {
    backdrop: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
      backdropFilter: "blur(4px)",
    },
    modal: {
      backgroundColor: "#121212",
      color: "#e0e0e0",
      padding: "2rem",
      borderRadius: "16px",
      maxWidth: "450px",
      width: "90%",
      border: "1px solid #333",
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
      fontFamily: "'Segoe UI', Roboto, sans-serif",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "600",
      marginBottom: "1rem",
      color: "#ffffff",
    },
    description: {
      fontSize: "0.95rem",
      lineHeight: "1.6",
      color: "#b0b0b0",
      marginBottom: "1.5rem",
    },
    actionStack: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    },
    btnPrimary: {
      backgroundColor: "#00d1b2",
      color: "#000",
      padding: "0.8rem",
      borderRadius: "8px",
      border: "none",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "0.2s",
    },
    btnSecondary: {
      backgroundColor: "transparent",
      color: "#00d1b2",
      padding: "0.8rem",
      borderRadius: "8px",
      border: "1px solid #00d1b2",
      fontWeight: "600",
      cursor: "pointer",
    },
    optionRow: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px",
      backgroundColor: "#1e1e1e",
      borderRadius: "8px",
      marginBottom: "10px",
      border: "1px solid #2a2a2a",
    }
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        {!showSettings ? (
          <>
            <h2 style={styles.title}>Namaste! We respect your privacy.</h2>
            <p style={styles.description}>
              As per Indian digital privacy standards, we use cookies to improve your experience, 
              show you relevant content, and keep our services secure and fast for our users.
            </p>
            <div style={styles.actionStack}>
              <button style={styles.btnPrimary} onClick={acceptAll}>
                Sahi Hai (Accept All)
              </button>
              <button style={styles.btnSecondary} onClick={rejectAll}>
                Reject All
              </button>
              <button
                style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: "0.85rem", marginTop: "5px" }}
                onClick={() => setShowSettings(true)}
              >
                Change My Preferences
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 style={styles.title}>Manage Privacy Settings</h2>
            <p style={{ ...styles.description, fontSize: "0.85rem" }}>
              Tailor how we handle your data to suit your needs.
            </p>

            <div style={styles.optionRow}>
              <input type="checkbox" checked disabled style={{ accentColor: "#00d1b2" }} />
              <span style={{ fontSize: "0.9rem" }}>Essential Services (Hamesha Active)</span>
            </div>

            <div style={styles.optionRow}>
              <input
                type="checkbox"
                checked={consent.performance}
                onChange={() => setConsent({ ...consent, performance: !consent.performance })}
                style={{ accentColor: "#00d1b2" }}
              />
              <span style={{ fontSize: "0.9rem" }}>Analytics & Performance</span>
            </div>

            <div style={styles.optionRow}>
              <input
                type="checkbox"
                checked={consent.functional}
                onChange={() => setConsent({ ...consent, functional: !consent.functional })}
                style={{ accentColor: "#00d1b2" }}
              />
              <span style={{ fontSize: "0.9rem" }}>Personalized Features</span>
            </div>

            <div style={styles.optionRow}>
              <input
                type="checkbox"
                checked={consent.targeting}
                onChange={() => setConsent({ ...consent, targeting: !consent.targeting })}
                style={{ accentColor: "#00d1b2" }}
              />
              <span style={{ fontSize: "0.9rem" }}>Marketing & Ad Tracking</span>
            </div>

            <div style={{ ...styles.actionStack, marginTop: "1.5rem" }}>
              <button style={styles.btnPrimary} onClick={savePreferences}>
                Save My Choices
              </button>
              <button style={styles.btnSecondary} onClick={() => setShowSettings(false)}>
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}