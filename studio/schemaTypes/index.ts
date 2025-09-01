// documents
import {menu} from './documents/menu'
import {press} from './documents/press'

// objects
import {hero} from './objects/hero'
import {blockContent} from './objects/blockContent'
import {blockquote} from './objects/blockquote'
import {gallery} from './objects/gallery'
import {twoImages} from './objects/twoImages'
import {elementImage} from './objects/elementImage'
import {elementVideo} from './objects/elementVideo'
import {link} from './objects/link'
import {linkInternal} from './objects/link/linkInternal'
import {linkExternal} from './objects/link/linkExternal'
import {linkEmail} from './objects/link/linkEmail'
import {seo} from './objects/seo'
import {cta} from './objects/cta'
import {infoSection} from './objects/infoSection'
import {info} from './objects/info'
import {highlightedText} from './objects/highlightedText'

// singletons
import {home} from './singletons/home'
import {about} from './singletons/about'
import {settings} from './singletons/settings'
import {lunch} from './singletons/lunch'
import {wines} from './singletons/wines'
import {contacts} from './singletons/contacts'
import {events} from './singletons/events'
import {academy} from './singletons/academy'
import {menuPage} from './singletons/menuPage'

export const schemaTypes = [
  link,
  linkInternal,
  linkExternal,
  linkEmail,

  // documents
  menu,
  press,

  // objects
  hero,
  blockContent,
  blockquote,
  gallery,
  twoImages,
  highlightedText,
  elementImage,
  elementVideo,
  seo,
  cta,
  infoSection,
  info,

  // singletons
  home,
  settings,
  about,
  events,
  wines,
  lunch,
  contacts,
  academy,
  menuPage
]