import groq from 'groq';

// singletons
export const homepageQuery = groq`{
  "home": *[_type == "home" && language == $language][0] {
  ...,
  chefs {
  ...,
  cta {
    label,
    "url": url->_id
  }
  }
  },
  "menus": *[_type == "menu" && language == $language] {
    title,
    "slug": slug.current,
    _id
    }
  }`;

export const menusQuery = groq`*[_type == "menu" && language == $language]`;

export const menuPageQuery = groq`*[_type == "menuPage" && language == $language][0] {
    ...,
    menus[]->
}`;
export const press = groq`*[_type == "press"]`;

export const contactQuery = groq`*[_type == "contact" && language == $language][0]`;
export const aboutQuery = groq`*[_type == "about" && language == $language][0]`;
export const settingsQuery = groq`*[_type == "settings" && language == $language][0]`;
export const academyQuery = groq`*[_type == "academy" && language == $language][0]`;
export const eventsQuery = groq`*[_type == "events" && language == $language][0]`;
export const winesQuery = groq`*[_type == "wines" && language == $language][0] {
  ...,
  tastingNotes {
    ...,
    cta {
      label,
      "url": url->_id
    }
    }
  }`;
export const lunchQuery = groq`*[_type == "lunch" && language == $language][0]`;
export const drinkingQuery = groq`*[_type == "drinking" && language == $language][0] {
  ...,
  gallerySections[] {
    ...,
    cta {
      ...,
      "url":url->_id
    }
  },
  tastingNotes {
    ...,
    cta {
      ...,
      "url":url->_id
    }
    }
  }`;
