declare global {
    interface Window {
      google: {
        translate: {
          TranslateElement: any;
          InlineLayout: any;
        };
      };
      googleTranslateElementInit: () => void;  // Add this line to declare googleTranslateElementInit
    }
  }
  
  export {};
  