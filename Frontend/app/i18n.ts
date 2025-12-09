// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const en = {
    title: 'Welcome',
    ok: 'OK',
    category: 'Category',
    Title: 'Title',
    Description: 'Description',
    selectDate: 'Select Date',
    save: 'Save',
    cancel: 'Cancel',

};
const fi = {
    title: 'Tervetuloa',
    ok: 'OK',
    category: 'Kategoria',
    Title: 'Otsikko',
    Description: 'Kuvaus',
    selectDate: 'Valitse päivämäärä',
    save: 'Tallenna',
    cancel: 'Peruuta',
};

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        fi: { translation: fi },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
});

export default i18n; // <-- export the i18next instance
