<p align="center">
  <img src="./Frontend/bannar.gif" />
</p>

# 🧬 MediQ: Neural Diagnostic & Healthcare Ecosystem

**Explore the Site at (Live Link)**  https://main.d331bz1skb95jo.amplifyapp.com

**MediQ** is a high-performance MERN-stack ecosystem designed to bridge the gap between traditional clinical OPDs and next-generation neural diagnostics. Engineered for the "Digital Bharat" initiative, it provides a secure, obsidian-themed interface for medical professionals and patients.

---

### 🌑 Theme Architecture

The platform is built on a **Deep Obsidian & Slate-950** visual foundation.

- **Eye-Strain Reduction:** Optimized for clinical environments.
- **Neural Aesthetics:** High-contrast indigo and cyan accents to highlight diagnostic data.
- **Glassmorphism:** Modern backdrop-blur effects for high-tech dashboarding.

---

### 🛠 Technical Stack

**Frontend Strategy**

- **Core:** React.js (Hooks & Context API)
- **Styling:** TailwindCSS (Utility-first CSS)
- **Animations:** Framer Motion (for neural voxel processing simulations)
- **Notification Engine:** React-Toastify
- **Routing:** React-Router-Dom v6

**Backend Strategy**

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **AI Brain:** Google Generative AI (Gemini API)
- **Voice Synthesis:** ElevenLabs API (Text-to-Speech)
- **Cloud Infrastructure:** Cloudinary (Medical Image Storage)
- **Payment Gateway:** Stripe API
- **Security:** JSON Web Tokens (JWT) & Bcrypt

---

### 🏗 System Architecture & Logic

MediQ follows a **Decoupled Client-Server Model** with a focus on state integrity and data security.

- **Authentication Flow:** Implements a role-based JWT system that differentiates between **Doctors** and **Patients**. This ensures that neural sandbox tools are restricted to authorized medical personnel.
- **AI Audio Pipeline:** Asynchronous processing of Gemini-generated medical text into binary audio buffers via ElevenLabs, delivered to the client as Base64 for instant playback without local file storage.
- **Data Layering:** Integration with GTM (Google Tag Manager) and Adobe Launch for behavioral clinical analytics.
- **Media Pipeline:** Automated image optimization via Cloudinary to handle high-resolution MRI and CT scan uploads without degrading frontend performance.
- **State Management:** Centralized `AuthContext` to maintain the "Verified User" status across complex page transitions.

---

### 🚀 Core Engineering Features

#### **1. MediQ Intelligence (Voice-Enabled AI Assistant)**

- **Conversational Diagnostics:** An integrated chatbot powered by Gemini AI that processes user queries and provides accurate, empathetic medical information.
- **Neural Voice Synthesis:** Utilizes the ElevenLabs TTS engine to read out AI responses in real-time, providing a fully accessible, hands-free auditory experience for patients and doctors.
- **Failsafe Delivery:** Engineered with dual-delivery logic; if the voice generation payload fails or exhausts limits, the system seamlessly falls back to text-only mode to ensure uninterrupted care.

#### **2. Neural Diagnostic Suite (AI Sandbox)**

- **Automated Feature Extraction:** Real-time simulation of brain morphology analysis.
- **Specialized Detection Portals:** Dedicated logic for Tumor Detection, Alzheimer’s tracking, and Hemorrhage triage.

#### **3. Specialist Hub**

- A dynamic, searchable directory of medical professionals.
- **Aadhaar Verified Network:** UI components designed for seamless identity verification integration.

#### **4. Clinical Ledger**

- A centralized repository for medical history, prescriptions, and digital lab reports.
- **State-Persistent Reports:** Leverages MongoDB document nesting for complex medical histories.

#### **5. Virtual OPD & Physical Booking**

- Dual-mode consultation engine supporting both in-person visits and remote digital clinics via a secure Stripe payment gateway.

---

### 🛰 Operational Node Flow

1.  **Ingress:** Secure JWT-based login and role identification.
2.  **Diagnostic Input:** Uploading morphological data to the Neural Suite or querying the Voice AI.
3.  **Processing:** Backend coordination with Cloudinary, Gemini AI, and database logging.
4.  **Completion:** Automated generation of the diagnostic summary in the Clinical Ledger.

---

---

> **MediQ Operational Node v1.3.0** | _Redefining Healthcare for Digital Bharat._
