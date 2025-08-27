import groq from 'groq';
import { eventThumb } from './thumbnails/event';

import { link } from './fragments/link';
import { pageBuilder } from './fragments/pageBuilder';

// singletons
export const homepageQuery = groq`*[_type == "homepage"][0]`;
export const contactQuery = groq`*[_type == "contact"][0]`;
export const aboutQuery = groq`*[_type == "about"][0]`;
export const settingsQuery = groq`*[_type == "settings"][0]`;

// document single entry
export const eventQuery = groq`*[
    _type == "event"
    && defined(slug.current)
    && slug.current == $slug] {
    ...,
    ${pageBuilder},
    cta {
        ${link}
    }
    }`;

// document archive entries
export const eventsQuery = groq`*[_type == "event" && defined(slug.current) && (
  !defined($date) || start >= $date
)] | order(start asc) [$start...$end] {
    ${eventThumb}
}`;

export const filteredEventsQuery = groq`*[_type == "event" && defined(slug.current) && (
  typology->slug.current in $typologies
  || featuredArtists[]->slug.current in $people
  || institution->slug.current in $institutions
) && (
  !defined($date) || start >= $date
)] | order(start asc) [$start...$end] {
    ${eventThumb}
}`;

// document filters queries
export const eventTypologiesQuery = groq`*[_type == "event" && defined(slug.current) && defined(typology)] {
    "typology": typology-> {
        _id,
        "slug": slug.current,
        title
    }
} | order(typology.title asc)`;

/* SEARCH */
export const searchQuery = groq`{
  "performances": *[_type == "performance" && (
      title match "*" + $query + "*" ||
      pt::text(description) match "*" + $query + "*" ||
      count(institutions[title match "*" + $query + "*"]) > 0 ||
      count(artists[name match "*" + $query + "*"]) > 0 ||
      count(typology[title match "*" + $query + "*"]) > 0
    )] {
    _id,
    title,
    "slug": slug.current
  },

  "people": *[_type == "people" && (
      name match "*" + $query + "*" ||
      pt::text(summary) match "*" + $query + "*" ||
      string(job) match "*" + $query + "*"
    )] {
    _id,
    name,
    "slug": slug.current
  },

  "partners": *[_type == "partner" && (
      title match "*" + $query + "*" ||
      extendedTitle match "*" + $query + "*" ||
      pt::text(description) match "*" + $query + "*"
    )] {
    _id,
    title,
    "slug": slug.current
  },

  "events": *[_type == "event" && (
      title match "*" + $query + "*" ||
      pt::text(summary) match "*" + $query + "*" ||
      pt::text(description) match "*" + $query + "*" ||
      location match "*" + $query + "*" ||
      city match "*" + $query + "*" ||
      count(institution[title match "*" + $query + "*"]) > 0 ||
      count(featuredArtists[name match "*" + $query + "*"]) > 0 ||
      count(typology[title match "*" + $query + "*"]) > 0
    )] {
    _id,
    title,
    "slug": slug.current
  },

  "resources": *[_type == "resource" && (
      title match "*" + $query + "*" ||
      typology match "*" + $query + "*" ||
      count(performance[title match "*" + $query + "*"]) > 0
    )] {
    _id,
    title,
    "slug": slug.current
  }
}`;
