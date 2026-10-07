// ============================================================================
// Single source of truth for all portfolio content.
// Data is loaded directly from portfolio.json for easy editing & Vercel deployment.
// ============================================================================
import portfolioData from "./portfolio.json";

export const profile = portfolioData.profile;
export const navLinks = portfolioData.navLinks;
export const about = portfolioData.about;
export const skillGroups = portfolioData.skillGroups;
export const skillsNote = portfolioData.skillsNote;
export const projects = portfolioData.projects;
export const experience = portfolioData.experience;
export const education = portfolioData.education;
export const organizations = portfolioData.organizations;
export const contact = portfolioData.contact;

// The CV link is only rendered when the PDF actually exists in /public at build
// time (see vite.config.js), so the site never ships a broken download button.
export const hasResume = typeof __HAS_RESUME__ !== "undefined" && __HAS_RESUME__;

export default portfolioData;
