// documents
import {menu} from './documents/menu'
import {press} from './documents/press'
import {wine} from './documents/wine'
import {softDrink} from './documents/softDrink'
import {herbalTea} from './documents/herbalTea'

// objects
import {blockContent} from './objects/blockContent'
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
import {softDrinks} from './singletons/softDrinks'
import {herbalTeas} from './singletons/herbalTeas'

import {drinking} from './singletons/drinking'
import {contacts} from './singletons/contacts'
import {events} from './singletons/events'
import {academy} from './singletons/academy'
import {menuPage} from './singletons/menuPage'
import {popup} from './singletons/popup'

export const schemaTypes = [
  linkInternal,
  linkExternal,
  linkEmail,

  // documents
  menu,
  press,
  wine,
  softDrink,
  herbalTea,

  // objects
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
  softDrinks,
  herbalTeas,
  drinking,
  lunch,
  contacts,
  academy,
  menuPage,
  popup,
]
