import React, { createContext, useContext } from "react";
import {
  profile,
  about,
  skillGroups,
  skillsNote,
  projects,
  experience,
  education,
  organizations,
  contact,
  certificates,
  hasResume,
} from "../data/portfolio";

const PortfolioContext = createContext(null);

// The site is English-only. `t` is kept so existing components that still call
// t(idText, enText) keep working; it always returns the English text.
const t = (idText, enText) => enText || idText || "";

const value = {
  lang: "EN",
  t,
  profile,
  about,
  skillGroups,
  skillsNote,
  projects,
  experience,
  education,
  organizations,
  contact,
  certificates,
  hasResume,
};

export const PortfolioProvider = ({ children }) => (
  <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
