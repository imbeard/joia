// documents
import {menu} from './documents/menu'
import {press} from './documents/press'

// objects
import {blockContent} from './objects/blockContent'
import {hero} from './objects/hero'
import {gallery} from './objects/gallery'
import {gallerySection} from './objects/gallerySection'
import {twoImages} from './objects/twoImages'
import {twoGalleries} from './objects/twoGalleries'
import {elementImage} from './objects/elementImage'
import {elementVideo} from './objects/elementVideo'
import {linkInternal} from './objects/link/linkInternal'
import {linkExternal} from './objects/link/linkExternal'
import {linkEmail} from './objects/link/linkEmail'
import {seo} from './objects/seo'
import {infoSection} from './objects/infoSection'
import {info} from './objects/info'

// singletons
import {home} from './singletons/home'
import {about} from './singletons/about'
import {settings} from './singletons/settings'
import {lunch} from './singletons/lunch'
import {wines} from './singletons/wines'
import {drinking} from './singletons/drinking'
import {contacts} from './singletons/contacts'
import {events} from './singletons/events'
import {academy} from './singletons/academy'
import {menuPage} from './singletons/menuPage'

export const schemaTypes = [
  linkInternal,
  linkExternal,
  linkEmail,

  // documents
  menu,
  press,

  // objects
  hero,
  blockContent,
  gallery,
  twoGalleries,
  twoImages,
  gallerySection,
  elementImage,
  elementVideo,
  seo,
  infoSection,
  info,

  // singletons
  home,
  settings,
  about,
  events,
  wines,
  drinking,
  lunch,
  contacts,
  academy,
  menuPage,
]
