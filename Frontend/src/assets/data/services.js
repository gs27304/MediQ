import burn from '../images/Burn.jpg';
import cancer from '../images/cancer.jpg';
import heart from '../images/heart.jpg';
import labour from '../images/labour.jpg';
import mind from '../images/neurology.png';
import mind2 from '../images/mind2.png';
import MriDiagnosis from "../../pages/MriDiagnosis";

export const services = [
  {
    name: "Neurology & AI",
    desc: "Advanced neural diagnostics powered by AI. We offer unmatched expert care for complex brain health and MRI analysis.",
    bgColor: "rgba(0, 242, 254, 0.15)", // Electric Cyan
    textColor: "#00F2FE", 
    img: mind,
    link: MriDiagnosis,
  },
  {
    name: "Oncology Center",
    desc: "Personalized cancer care plans and high-tech support systems to navigate your journey with confidence.",
    bgColor: "rgba(255, 0, 128, 0.15)", // Neon Pink
    textColor: "#FF0080",
    img: cancer,
  },
  {
    name: "Maternity Care",
    desc: "Comprehensive support and specialized attention for a safe, positive, and technologically assisted birth experience.",
    bgColor: "rgba(123, 255, 190, 0.15)", // Seafoam Green
    textColor: "#7BFFBE",
    img: labour,
  },
  {
    name: "Cardiology",
    desc: "Leading-edge heart health management utilizing innovative cardiovascular solutions and real-time monitoring.",
    bgColor: "rgba(255, 49, 49, 0.15)", // Vivid Red
    textColor: "#FF3131",
    img: heart,
  },
  {
    name: "Mental Wellness",
    desc: "Specialized therapies and holistic neurological support to manage and significantly improve mental health.",
    bgColor: "rgba(189, 107, 255, 0.15)", // Deep Violet
    textColor: "#BD6BFF",
    img: mind2,
  },
  {
    name: "Dermatology & Burns",
    desc: "State-of-the-art healing therapies to promote rapid recovery and skin regeneration from burn injuries.",
    bgColor: "rgba(255, 170, 0, 0.15)", // Amber/Orange
    textColor: "#FFAA00",
    img: burn,
  },
];