// Type declarations for Google Maps API and Extended Component Library
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Window {
  google?: {
    maps: {
      places: {
        // Keep for compatibility with existing code
        Autocomplete: new (
          input: HTMLInputElement,
          options?: google.maps.places.AutocompleteOptions
        ) => google.maps.places.Autocomplete;
      };
      event: {
        // Using unknown instead of any
        clearInstanceListeners: (instance: unknown) => void;
      };
    };
  };
  customElements?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(name: string): unknown;
    define(name: string, constructor: CustomElementConstructor, options?: ElementDefinitionOptions): void;
  };
}

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace google.maps.places {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Autocomplete {
    addListener: (event: string, callback: () => void) => void;
    setFields: (fields: string[]) => void;
    getPlace: () => {
      formatted_address?: string;
      name?: string;
      address_components?: Array<{
        long_name: string;
        short_name: string;
        types: string[];
      }>;
    };
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface AutocompleteOptions {
    types?: string[];
    componentRestrictions?: { country: string | string[] };
    fields?: string[];
  }
}

// Custom types for the Google Maps Extended Component Library
/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars */
namespace gmpx {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PlaceAutocompleteElement extends HTMLElement {
    value: string;
    setAttribute(name: string, value: string): void;
    getAttribute(name: string): string | null;
    addEventListener(type: 'placechange', listener: (event: CustomEvent) => void): void;
  }
}

// Add JSX support for the web component
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'gmpx-placeautocomplete': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        placeholder?: string;
        country?: string;
        types?: string;
        value?: string;
      };
    }
  }
}
