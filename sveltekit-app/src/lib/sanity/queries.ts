import groq from 'groq';
import { portableText } from './fragments/portableText';

// singletons
export const homepageQuery = groq`{
  "home": *[_type == "home" && language == $language][0] {
    ...,
    intro[] {
      ${portableText}
    },
    chefs {
      ...,
      content[] {
        ${portableText}
      },
      cta {
        label,
        url->{
            "_type": _type,
            language,
        }
      }
    },
    lunch{
    ...,
      content[]{
        ${portableText}
      }
    },
    philosophy {
    ...,
      content[]{
        ${portableText}
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
    drink {
    ...,
      content[]{
        ${portableText}
      }
    },
    lunch {
    ...,
      content[]{
        ${portableText}
      }
    },
    menus[]->{
      ...,
      description[]{
        ${portableText}
      },
      courses[]{
        ...,
        content[]{
          ${portableText}
        }
      },
      dessert{
      ...,
        desserts[]{
          ...,
          content[]{
            ${portableText}
          }
        }
      },
    }
}`;
export const press = groq`*[_type == "press"]`;

export const contactQuery = groq`*[_type == "contacts" && language == $language][0]{
    ...,
    hours {
    ...,
      content[]{
        ${portableText}
      }
    },
    generalInformations {
    ...,
      content[]{
        ${portableText}
      }
    }
  }`;

export const aboutQuery = groq`{
  "about": *[_type == "about" && language == $language][0]{
    ...,
    intro[]{
      ${portableText}
    },
    description[]{
      ${portableText}
    },
    detailsSections[]{
      content[]{
        ${portableText}
      }
    },
    team[] {
      ...,
      content[]{
        ${portableText}
      }
    },
    founder {
      ...,
      infoSection {
        ...,
        content[]{
          ${portableText}
        }
      }
    },
    location {
      ...,
      description[]{
        ${portableText}
      }
    }
  },
  "press": *[_type == "press" && language == $language] | order(releaseDate desc) {
    ...,
    description[]{
      ${portableText}
    }
  }
  }`;

export const academyQuery = groq`*[_type == "academy" && language == $language][0]{
  ...,
  intro[]{
      ${portableText}
  },
  details{
  ...,
    infoSection {
    ...,
    content[]{
        ${portableText}
      }
    },
  }
}`;

export const eventsQuery = groq`*[_type == "events" && language == $language][0] {
    ...,
    intro[]{
      ${portableText}
    },
    eventsBlock {
      ...,
      content[]{
        ${portableText}
      }
    }
  }`;
export const winesQuery = groq`*[_type == "wines" && language == $language][0] {
  ...,
  categories[] {
  title,
  subCategories[] {
      title,
      wines[]->
    }
  },
  tastingNotes {
      ...,
      infoSection {
      ...,
        content[]{
          ${portableText}
        }
      },
      cta {
        label,
        url->{
            "_type": _type,
            language,
        }
      }
    }
  }`;

export const softDrinksQuery = groq`*[_type == "softDrinks" && language == $language][0] {
  ...,
  categories[] {
  title,
    subCategories[] {
      title,
      drink[]->
    }
  },
  tastingNotes {
      ...,
      infoSection {
      ...,
        content[]{
          ${portableText}
        }
      },
      cta {
        label,
        url->{
            "_type": _type,
            language,
        }
      }
    }
  }`;

export const herbalTeasQuery = groq`*[_type == "herbalTeas" && language == $language][0] {
    ...,
    categories[] {
    title,
      subCategories[] {
        title,
        drink[]->
      }
    },
    tastingNotes {
        ...,
        infoSection {
        ...,
          content[]{
            ${portableText}
          }
        },
        cta {
          label,
          url->{
              "_type": _type,
              language,
          }
        }
      }
  }`;

export const lunchQuery = groq`*[_type == "lunch" && language == $language][0] {
    ...,
    description[] {
      ${portableText}
    },
    choices[] {
    ...,
      description[] {
        ${portableText}
      }
    },
    notes[] {
      ${portableText}
    },
    tastingNotes {
        ...,
        infoSection {
        ...,
          content[]{
            ${portableText}
          }
        },
        cta {
          label,
          url->{
              "_type": _type,
              language,
          }
        }
      }
  }`;
export const drinkingQuery = groq`*[_type == "drinking" && language == $language][0] {
  ...,
  heading[] {
    ${portableText}
  },
  intro[] {
    ${portableText}
  },
  gallerySections[] {
    ...,
    cta {
      label,
      url->{
          "_type": _type,
          language,
      }
    }
  },
  tastingNotes {
      ...,
      infoSection {
      ...,
        content[]{
          ${portableText}
        }
      },
      cta {
        label,
        url->{
            "_type": _type,
            language,
        }
      }
    }
  }`;

export const settingsQuery = groq`{
  "settings" : *[_type == "settings" && language == $language][0],
  "popup" : *[_type == "popup" && language == $language][0] {
    ...,
    content[]{
      ${portableText}
    }
  }
  }`;
// export const popupQuery = groq`*[_type == "popup" && language == $language][0]`;
