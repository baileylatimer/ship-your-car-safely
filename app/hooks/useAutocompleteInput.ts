import { useEffect, RefObject } from 'react';

export const useAutocompleteInput = (
  inputRef: RefObject<HTMLInputElement>,
  onSelect: (value: string) => void,
  options: {
    types?: string[];
    country?: string;
    fields?: string[];
  } = {}
) => {
  useEffect(() => {
    // Safety checks
    if (typeof window === "undefined" || !window.google || !window.google.maps || !inputRef.current) return;
    
    try {
      // Configure autocomplete with more focused options
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: options.types || ['(cities)', 'postal_code'],
        componentRestrictions: { country: options.country || 'us' },
        fields: options.fields || ['address_components', 'formatted_address'],
      });
      
      // Handle selection
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
          onSelect(place.formatted_address);
        }
      });
      
      // Prevent form submission on Enter key in autocomplete
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && document.querySelector('.pac-container:visible')) {
          e.preventDefault();
        }
      };
      
      inputRef.current.addEventListener('keydown', handleKeyDown);
      
      // Clean up listeners
      return () => {
        if (window.google && window.google.maps) {
          window.google.maps.event.clearInstanceListeners(autocomplete);
        }
        inputRef.current?.removeEventListener('keydown', handleKeyDown);
      };
    } catch (error) {
      console.error('Error initializing Google Places Autocomplete:', error);
    }
  }, [inputRef, onSelect, options]);
};
