import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faBell,
    faCalendar,
    faCalendarWeek,
    faCamera,
    faChartBar,
    faCreditCard,
    faEdit,
    faEnvelope,
    faEye,
    faEyeSlash,
    faHeart,
    faHome,
    faLock,
    faMapMarkerAlt,
    faMinus,
    faPhone,
    faPlus,
    faSearch,
    faShoppingCart,
    faStar,
    faTrash,
    faUnlock,
    faUser
} from '@fortawesome/free-solid-svg-icons';

// Adiciona todos os ícones à biblioteca
library.add(
  faHome, faUser, faSearch, faHeart, faStar,
  faBell, faEnvelope, faPhone, faCamera, faMapMarkerAlt,
  faShoppingCart, faCreditCard, faLock, faUnlock,
  faEye, faEyeSlash, faEdit, faTrash, faPlus, faMinus,
    faCalendarWeek, faCalendar, faChartBar
);