import groq from 'groq';

// singletons
export const homepageQuery = groq`*[_type == "home" && language == $language][0]`;

export const menusQuery = groq`*[_type == "menu" && language == $language]`;

export const menuPageQuery = groq`*[_type == "menuPage" && language == $language][0]`;
export const press = groq`*[_type == "press"]`;

export const contactQuery = groq`*[_type == "contact" && language == $language][0]`;
export const aboutQuery = groq`*[_type == "about" && language == $language][0]`;
export const settingsQuery = groq`*[_type == "settings" && language == $language][0]`;
export const academyQuery = groq`*[_type == "academy" && language == $language][0]`;
export const eventsQuery = groq`*[_type == "events" && language == $language][0]`;
export const winesQuery = groq`*[_type == "wines" && language == $language][0]`;

export const lunch = groq`*[_type == "lunch" && language == $language][0]`;
