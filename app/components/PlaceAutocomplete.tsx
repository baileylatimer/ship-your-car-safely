import { useEffect, useRef, useState } from 'react';

interface PlaceAutocompleteProps {
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  hasLeadingIcon?: boolean;
}

export default function PlaceAutocomplete({ 
  placeholder = "Enter city or ZIP", 
  value, 
  onChange,
  className,
  style,
  hasLeadingIcon = false
}: PlaceAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  
  // Check if Google Maps API is loaded
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check if Google is already loaded
    const isLoaded = typeof window.google !== 'undefined' && 
                    typeof window.google.maps !== 'undefined' &&
                    typeof window.google.maps.places !== 'undefined';
    
    if (isLoaded) {
      setIsGoogleLoaded(true);
      return;
    }
    
    // Check periodically for Google Maps to load
    const checkGoogleInterval = setInterval(() => {
      if (typeof window.google !== 'undefined' && 
          typeof window.google.maps !== 'undefined' &&
          typeof window.google.maps.places !== 'undefined') {
        setIsGoogleLoaded(true);
        clearInterval(checkGoogleInterval);
      }
    }, 300);
    
    // Set a timeout to stop checking after a while
    const timeout = setTimeout(() => {
      clearInterval(checkGoogleInterval);
      if (!isGoogleLoaded) {
        console.warn('Google Maps API failed to load after timeout.');
      }
    }, 10000);
    
    return () => {
      clearInterval(checkGoogleInterval);
      clearTimeout(timeout);
    };
  }, [isGoogleLoaded]);
  
  // Initialize autocomplete when Google is loaded and input is mounted
  useEffect(() => {
    if (!isGoogleLoaded || !inputRef.current) return;
    
    try {
      // Safety checks to avoid SES restrictions
      if (!window.google?.maps?.places?.Autocomplete) {
        console.warn('Google Maps Places Autocomplete is not available');
        return;
      }
      
      // Initialize the autocomplete
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['(cities)'],
        componentRestrictions: { country: 'us' }
      });
      
      // Set the autocomplete options
      autocomplete.setFields(['address_components', 'formatted_address', 'name']);
      
      // Add listener for place changes
      autocomplete.addListener('place_changed', () => {
        try {
          const place = autocomplete.getPlace();
          
          if (place.formatted_address || place.name) {
            // Ensure we have a string value for onChange
            const placeValue = place.formatted_address || place.name || '';
            onChange(placeValue);
          }
        } catch (error) {
          console.error('Error handling place selection:', error);
        }
      });
      
      // Save the autocomplete instance
      autocompleteRef.current = autocomplete;
    } catch (error) {
      console.error('Error initializing Google Places Autocomplete:', error);
    }
    
    return () => {
      // Clean up listeners
      if (autocompleteRef.current && google?.maps?.event) {
        try {
          google.maps.event.clearInstanceListeners(autocompleteRef.current);
        } catch (error) {
          console.warn('Error cleaning up Google Maps event listeners:', error);
        }
      }
    };
  }, [isGoogleLoaded, onChange]);
  
  // Add extra padding for icon positioning
  const combinedStyle = {
    ...style,
    ...(hasLeadingIcon ? { paddingLeft: '2.5rem' } : {})
  };
  
  // Keep the input value in sync with the component's value prop
  useEffect(() => {
    if (inputRef.current && value !== undefined && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }
  }, [value]);
  
  return (
    <div className={className} style={combinedStyle}>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        defaultValue={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 pl-2 border-0 bg-transparent text-[#17283D] outline-none"
        style={{ height: '48px' }}
      />
    </div>
  );
}
