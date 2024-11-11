const translations = {
    en: {
      mainMenu: "Main Menu",
      myBudget: "My Budget",
      addNewItem: "Add New Item",
      editBudget: "Edit Budget",
      settings: "Settings",
      add: "Add",
      aller1: "New item added",
    },
    ua: {
      mainMenu: "Головне меню",
      myBudget: "Мое розподілення бюджету",
      addNewItem: "Додати новий пункт",
      editBudget: "Налаштування розподілення",
      settings: "Налаштування",
      add: "Додати",
      aller1: "Новий пункт додан",
    },
    es: {
      mainMenu: "Menú Principal",
      myBudget: "Mi Presupuesto",
      addNewItem: "Agregar Nuevo Elemento",
      editBudget: "Editar Presupuesto",
      settings: "Configuraciones",
      add: "Agregar",
      aller1: "Nuevo elemento agregado",
    },
    fr: {
      mainMenu: "Menu Principal",
      myBudget: "Mon Budget",
      addNewItem: "Ajouter un Nouvel Élément",
      editBudget: "Modifier le Budget",
      settings: "Paramètres",
      add: "Ajouter",
      aller1: "Nouvel élément ajouté",
    },
    de: {
      mainMenu: "Hauptmenü",
      myBudget: "Mein Budget",
      addNewItem: "Neues Element Hinzufügen",
      editBudget: "Budget Bearbeiten",
      settings: "Einstellungen",
      add: "Hinzufügen",
      aller1: "Neues Element hinzugefügt",
    },
  };
  
  export const getTranslation = (lang, key) => {
    return translations[lang][key] || key;
  };
  