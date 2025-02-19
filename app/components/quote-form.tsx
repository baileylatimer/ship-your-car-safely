import Button from './button';
import { useState } from 'react';

const currentYear = 2025;
const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

const carMakes = [
  "Acura", "Audi", "BMW", "Buick", "Cadillac", "Chevrolet", "Chrysler", 
  "Dodge", "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", 
  "Kia", "Land Rover", "Lexus", "Lincoln", "Mazda", "Mercedes-Benz", "MINI", 
  "Mitsubishi", "Nissan", "Porsche", "Ram", "Subaru", "Tesla", "Toyota", 
  "Volkswagen", "Volvo"
] as const;

type CarMake = typeof carMakes[number];

type CarData = {
  [K in CarMake]: string[];
};

const carData: CarData = {
  "Acura": ["ILX", "MDX", "RDX", "TLX", "NSX"],
  "Audi": ["A3", "A4", "A6", "Q3", "Q5", "Q7", "e-tron"],
  "BMW": ["2 Series", "3 Series", "5 Series", "X1", "X3", "X5", "i4", "iX"],
  "Buick": ["Enclave", "Encore", "Envision"],
  "Cadillac": ["CT4", "CT5", "Escalade", "XT4", "XT5", "XT6", "LYRIQ"],
  "Chevrolet": ["Blazer", "Camaro", "Corvette", "Equinox", "Malibu", "Silverado", "Tahoe", "Bolt EV"],
  "Chrysler": ["300", "Pacifica"],
  "Dodge": ["Challenger", "Charger", "Durango"],
  "Ford": ["Bronco", "Edge", "Escape", "Explorer", "F-150", "Mustang", "Ranger", "Mach-E"],
  "GMC": ["Acadia", "Canyon", "Sierra", "Terrain", "Yukon"],
  "Honda": ["Accord", "Civic", "CR-V", "HR-V", "Odyssey", "Pilot", "Ridgeline"],
  "Hyundai": ["Elantra", "Kona", "Palisade", "Santa Fe", "Sonata", "Tucson", "IONIQ 5"],
  "Infiniti": ["Q50", "Q60", "QX50", "QX60", "QX80"],
  "Jaguar": ["E-PACE", "F-PACE", "F-TYPE", "I-PACE", "XF"],
  "Jeep": ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Wrangler"],
  "Kia": ["Forte", "K5", "Seltos", "Sorento", "Sportage", "Telluride", "EV6"],
  "Land Rover": ["Defender", "Discovery", "Range Rover", "Range Rover Sport", "Range Rover Velar"],
  "Lexus": ["ES", "IS", "NX", "RX", "UX"],
  "Lincoln": ["Aviator", "Corsair", "Nautilus", "Navigator"],
  "Mazda": ["CX-30", "CX-5", "CX-9", "Mazda3", "Mazda6", "MX-5 Miata"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "GLA", "GLC", "GLE", "S-Class", "EQS"],
  "MINI": ["Clubman", "Countryman", "Hardtop"],
  "Mitsubishi": ["Eclipse Cross", "Outlander", "Outlander Sport"],
  "Nissan": ["Altima", "Frontier", "Kicks", "Leaf", "Maxima", "Murano", "Pathfinder", "Rogue", "Sentra"],
  "Porsche": ["911", "Cayenne", "Macan", "Panamera", "Taycan"],
  "Ram": ["1500", "2500", "3500", "ProMaster"],
  "Subaru": ["Ascent", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "WRX"],
  "Tesla": ["Model 3", "Model S", "Model X", "Model Y"],
  "Toyota": ["4Runner", "Camry", "Corolla", "Highlander", "RAV4", "Tacoma", "Tundra", "Prius", "bZ4X"],
  "Volkswagen": ["Atlas", "Golf", "ID.4", "Jetta", "Passat", "Taos", "Tiguan"],
  "Volvo": ["S60", "S90", "XC40", "XC60", "XC90"]
};

interface FormData {
  from: string;
  to: string;
  date: string;
  year: string;
  make: CarMake | '';
  model: string;
  operable: 'yes' | 'no' | '';
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  from?: string;
  to?: string;
  date?: string;
  year?: string;
  make?: string;
  model?: string;
  operable?: string;
  name?: string;
  email?: string;
}

export default function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    from: '',
    to: '',
    date: '',
    year: '',
    make: '',
    model: '',
    operable: '',
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      // Reset model when make changes
      if (field === 'make') {
        newData.model = '';
      }
      return newData;
    });
    // Clear error when field is changed
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateStep = (step: number) => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.from) newErrors.from = 'Origin location is required';
      if (!formData.to) newErrors.to = 'Destination location is required';
      if (!formData.date) newErrors.date = 'Pickup date is required';
    } else if (step === 2) {
      if (!formData.year) newErrors.year = 'Vehicle year is required';
      if (!formData.make) newErrors.make = 'Vehicle make is required';
      if (!formData.model) newErrors.model = 'Vehicle model is required';
      if (!formData.operable) newErrors.operable = 'Please specify if the vehicle is operable';
    } else if (step === 3) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!validateEmail(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      // Handle form submission
      console.log('Form submitted:', formData);
    }
  };

  const renderErrorMessage = (field: keyof FormErrors) => {
    if (!errors[field]) return null;
    return (
      <p className="text-red-500 text-sm mt-1 ml-2">{errors[field]}</p>
    );
  };

  const renderStep = () => {
    if (currentStep === 1) {
      return (
        <>
          <div className="relative">
            <input
              type="text"
              placeholder="From (ZIP or City)"
              value={formData.from}
              onChange={(e) => handleInputChange('from', e.target.value)}
              className={`w-full p-3 pl-10 border border-[#17283D] rounded-md bg-transparent text-[#17283D] ${
                errors.from ? 'border-red-500' : ''
              }`}
              style={{ borderRadius: '18px 18px 0 0' }}
            />
           <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.9999 4.47997C16.4086 2.88867 14.2504 1.99469 11.9999 1.99469C9.74949 1.99469 7.59123 2.88867 5.99993 4.47997C4.40863 6.07127 3.51465 8.22954 3.51465 10.48C3.51465 12.7304 4.40863 14.8887 5.99993 16.48L11.2699 21.76C11.3629 21.8537 11.4735 21.9281 11.5954 21.9789C11.7172 22.0296 11.8479 22.0558 11.9799 22.0558C12.1119 22.0558 12.2426 22.0296 12.3645 21.9789C12.4864 21.9281 12.597 21.8537 12.6899 21.76L17.9999 16.43C19.5846 14.8453 20.4748 12.696 20.4748 10.455C20.4748 8.21392 19.5846 6.06465 17.9999 4.47997ZM16.5699 15L11.9999 19.59L7.42993 15C6.52707 14.0963 5.91241 12.9452 5.66362 11.6923C5.41484 10.4393 5.54312 9.14072 6.03223 7.96065C6.52135 6.78059 7.34935 5.77202 8.41156 5.06245C9.47377 4.35288 10.7225 3.97415 11.9999 3.97415C13.2773 3.97415 14.5261 4.35288 15.5883 5.06245C16.6505 5.77202 17.4785 6.78059 17.9676 7.96065C18.4567 9.14072 18.585 10.4393 18.3362 11.6923C18.0875 12.9452 17.4728 14.0963 16.5699 15ZM8.99993 7.40997C8.19264 8.21974 7.73932 9.31654 7.73932 10.46C7.73932 11.6034 8.19264 12.7002 8.99993 13.51C9.59969 14.1108 10.3635 14.5211 11.1956 14.6894C12.0276 14.8577 12.8909 14.7766 13.677 14.4561C14.4631 14.1357 15.1371 13.5903 15.6144 12.8882C16.0917 12.1862 16.3511 11.3588 16.3599 10.51C16.3644 9.94318 16.2553 9.38123 16.0388 8.85736C15.8224 8.33349 15.5032 7.85833 15.0999 7.45997C14.7036 7.05455 14.231 6.73151 13.7094 6.50944C13.1877 6.28736 12.6273 6.17065 12.0603 6.166C11.4934 6.16135 10.9311 6.26887 10.4059 6.48236C9.88067 6.69585 9.40285 7.0111 8.99993 7.40997ZM13.6899 12.09C13.311 12.4747 12.8101 12.7159 12.2731 12.7722C11.736 12.8286 11.196 12.6966 10.7454 12.3989C10.2949 12.1012 9.96173 11.6562 9.80294 11.1401C9.64415 10.6239 9.66958 10.0686 9.87489 9.56913C10.0802 9.06964 10.4526 8.65699 10.9285 8.40171C11.4044 8.14643 11.9542 8.06438 12.4839 8.16959C13.0135 8.2748 13.4902 8.56073 13.8324 8.9785C14.1746 9.39627 14.3611 9.91994 14.3599 10.46C14.3454 11.0772 14.0864 11.6635 13.6399 12.09H13.6899Z" fill="#17283D"/>
</svg>

            {renderErrorMessage('from')}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="To (ZIP or City)"
              value={formData.to}
              onChange={(e) => handleInputChange('to', e.target.value)}
              className={`w-full p-3 pl-10 border border-[#17283D] rounded-md bg-transparent text-[#17283D] ${
                errors.to ? 'border-red-500' : ''
              }`}
              style={{ borderRadius: '0', borderTop: '0' }}
            />
<svg className="absolute left-3 top-1/2 -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 11.9V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8947 11.7348 18 12 18C12.2652 18 12.5196 17.8947 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V11.9C14.214 11.6522 15.2928 10.9624 16.0272 9.96443C16.7616 8.96643 17.0992 7.7313 16.9747 6.49849C16.8501 5.26569 16.2723 4.12304 15.3532 3.29208C14.434 2.46112 13.2391 2.00104 12 2.00104C10.7609 2.00104 9.56598 2.46112 8.64685 3.29208C7.72771 4.12304 7.14986 5.26569 7.02532 6.49849C6.90078 7.7313 7.23843 8.96643 7.9728 9.96443C8.70718 10.9624 9.78596 11.6522 11 11.9ZM12 4.00002C12.5933 4.00002 13.1734 4.17596 13.6667 4.50561C14.1601 4.83525 14.5446 5.30379 14.7716 5.85197C14.9987 6.40015 15.0581 7.00335 14.9424 7.58529C14.8266 8.16723 14.5409 8.70178 14.1213 9.12134C13.7018 9.5409 13.1672 9.82662 12.5853 9.94237C12.0033 10.0581 11.4001 9.99872 10.8519 9.77166C10.3038 9.54459 9.83524 9.16008 9.50559 8.66673C9.17595 8.17338 9 7.59336 9 7.00002C9 6.20437 9.31607 5.44131 9.87868 4.8787C10.4413 4.31609 11.2044 4.00002 12 4.00002ZM16.21 14.42C16.0787 14.3924 15.9432 14.391 15.8113 14.4158C15.6795 14.4406 15.5537 14.4911 15.4414 14.5644C15.329 14.6378 15.2322 14.7325 15.1565 14.8433C15.0808 14.9541 15.0276 15.0787 15 15.21C14.9724 15.3413 14.971 15.4768 14.9958 15.6087C15.0205 15.7406 15.071 15.8663 15.1444 15.9786C15.2178 16.091 15.3125 16.1878 15.4233 16.2635C15.5341 16.3393 15.6587 16.3924 15.79 16.42C18.06 16.87 19 17.68 19 18C19 18.58 16.55 20 12 20C7.45 20 5 18.58 5 18C5 17.68 5.94 16.87 8.21 16.38C8.34132 16.3524 8.46593 16.2993 8.5767 16.2235C8.68747 16.1478 8.78224 16.051 8.8556 15.9386C8.92896 15.8263 8.97947 15.7006 9.00424 15.5687C9.02902 15.4368 9.02758 15.3013 9 15.17C8.97242 15.0387 8.91925 14.9141 8.84352 14.8033C8.76778 14.6925 8.67097 14.5978 8.55861 14.5244C8.44626 14.4511 8.32055 14.4006 8.18867 14.3758C8.05679 14.351 7.92132 14.3524 7.79 14.38C4.75 15.08 3 16.39 3 18C3 20.63 7.53 22 12 22C16.47 22 21 20.63 21 18C21 16.39 19.25 15.08 16.21 14.42Z" fill="#17283D"/>
</svg>

            {renderErrorMessage('to')}
          </div>

          <div className="relative">
            <input
              type="date"
              placeholder="Pickup Date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={`w-full p-3 pl-10 border border-[#17283D] rounded-md bg-transparent text-[#17283D] ${
                errors.date ? 'border-red-500' : ''
              }`}
              style={{ borderRadius: '0 0 18px 18px', borderTop: '0'}}
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 14C12.1978 14 12.3911 13.9414 12.5556 13.8315C12.72 13.7216 12.8482 13.5654 12.9239 13.3827C12.9996 13.2 13.0194 12.9989 12.9808 12.8049C12.9422 12.6109 12.847 12.4327 12.7071 12.2929C12.5673 12.153 12.3891 12.0578 12.1951 12.0192C12.0011 11.9806 11.8 12.0004 11.6173 12.0761C11.4346 12.1518 11.2784 12.28 11.1685 12.4444C11.0586 12.6089 11 12.8022 11 13C11 13.2652 11.1054 13.5196 11.2929 13.7071C11.4804 13.8946 11.7348 14 12 14ZM17 14C17.1978 14 17.3911 13.9414 17.5556 13.8315C17.72 13.7216 17.8482 13.5654 17.9239 13.3827C17.9996 13.2 18.0194 12.9989 17.9808 12.8049C17.9422 12.6109 17.847 12.4327 17.7071 12.2929C17.5673 12.153 17.3891 12.0578 17.1951 12.0192C17.0011 11.9806 16.8 12.0004 16.6173 12.0761C16.4346 12.1518 16.2784 12.28 16.1685 12.4444C16.0586 12.6089 16 12.8022 16 13C16 13.2652 16.1054 13.5196 16.2929 13.7071C16.4804 13.8946 16.7348 14 17 14ZM12 18C12.1978 18 12.3911 17.9414 12.5556 17.8315C12.72 17.7216 12.8482 17.5654 12.9239 17.3827C12.9996 17.2 13.0194 16.9989 12.9808 16.8049C12.9422 16.6109 12.847 16.4327 12.7071 16.2929C12.5673 16.153 12.3891 16.0578 12.1951 16.0192C12.0011 15.9806 11.8 16.0004 11.6173 16.0761C11.4346 16.1518 11.2784 16.28 11.1685 16.4444C11.0586 16.6089 11 16.8022 11 17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8946 11.7348 18 12 18ZM17 18C17.1978 18 17.3911 17.9414 17.5556 17.8315C17.72 17.7216 17.8482 17.5654 17.9239 17.3827C17.9996 17.2 18.0194 16.9989 17.9808 16.8049C17.9422 16.6109 17.847 16.4327 17.7071 16.2929C17.5673 16.153 17.3891 16.0578 17.1951 16.0192C17.0011 15.9806 16.8 16.0004 16.6173 16.0761C16.4346 16.1518 16.2784 16.28 16.1685 16.4444C16.0586 16.6089 16 16.8022 16 17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18ZM7 14C7.19778 14 7.39112 13.9414 7.55557 13.8315C7.72002 13.7216 7.84819 13.5654 7.92388 13.3827C7.99957 13.2 8.01937 12.9989 7.98079 12.8049C7.9422 12.6109 7.84696 12.4327 7.70711 12.2929C7.56725 12.153 7.38907 12.0578 7.19509 12.0192C7.00111 11.9806 6.80004 12.0004 6.61732 12.0761C6.43459 12.1518 6.27841 12.28 6.16853 12.4444C6.05865 12.6089 6 12.8022 6 13C6 13.2652 6.10536 13.5196 6.29289 13.7071C6.48043 13.8946 6.73478 14 7 14ZM19 4H18V3C18 2.73478 17.8946 2.48043 17.7071 2.29289C17.5196 2.10536 17.2652 2 17 2C16.7348 2 16.4804 2.10536 16.2929 2.29289C16.1054 2.48043 16 2.73478 16 3V4H8V3C8 2.73478 7.89464 2.48043 7.70711 2.29289C7.51957 2.10536 7.26522 2 7 2C6.73478 2 6.48043 2.10536 6.29289 2.29289C6.10536 2.48043 6 2.73478 6 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4ZM20 19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20H5C4.73478 20 4.48043 19.8946 4.29289 19.7071C4.10536 19.5196 4 19.2652 4 19V10H20V19ZM20 8H4V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V8ZM7 18C7.19778 18 7.39112 17.9414 7.55557 17.8315C7.72002 17.7216 7.84819 17.5654 7.92388 17.3827C7.99957 17.2 8.01937 16.9989 7.98079 16.8049C7.9422 16.6109 7.84696 16.4327 7.70711 16.2929C7.56725 16.153 7.38907 16.0578 7.19509 16.0192C7.00111 15.9806 6.80004 16.0004 6.61732 16.0761C6.43459 16.1518 6.27841 16.28 6.16853 16.4444C6.05865 16.6089 6 16.8022 6 17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18Z" fill="#17283D"/>
</svg>

            {renderErrorMessage('date')}
          </div>

          <Button 
            variant="dark" 
            className="group w-full mt-8"
            onClick={handleNext}
          >
            Vehicle Details
            <svg className="ml-2 w-4 h-4 -rotate-45 transition-transform group-hover:rotate-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </>
      );
    }

    if (currentStep === 2) {
      return (
        <>
          <div className="relative">
            <select
              className={`w-full p-3 pl-10 border border-[#17283D] rounded-[18px] bg-transparent text-[#17283D] appearance-none ${
                errors.year ? 'border-red-500' : ''
              }`}
              style={{ borderRadius: '18px 18px 0 0' }}
              value={formData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
            >
              <option value="" disabled>Vehicle year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#17283D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {renderErrorMessage('year')}
          </div>

          <div className="relative">
            <select
              className={`w-full p-3 pl-10 border border-[#17283D] rounded-[18px] bg-transparent text-[#17283D] appearance-none ${
                errors.make ? 'border-red-500' : ''
              }`}
              style={{ borderRadius: '0', borderTop: '0' }}
              value={formData.make}
              onChange={(e) => handleInputChange('make', e.target.value)}
            >
              <option value="" disabled>Vehicle make</option>
              {carMakes.map(make => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#17283D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {renderErrorMessage('make')}
          </div>

          <div className="relative">
            <select
              className={`w-full p-3 pl-10 border border-[#17283D] rounded-[18px] bg-transparent text-[#17283D] appearance-none ${
                errors.model ? 'border-red-500' : ''
              }`}
              style={{ borderRadius: ' 0 0 18px 18px', borderTop: '0' }}
              value={formData.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              disabled={!formData.make}
            >
              <option value="" disabled>Vehicle model</option>
              {formData.make && carData[formData.make as CarMake].map((model: string) => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="#17283D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {renderErrorMessage('model')}
          </div>

          <div className="mt-6">
            <p className={`text-[#17283D] mb-3 ${errors.operable ? 'text-red-500' : ''}`}>
              Is it operable?
              {errors.operable && <span className="text-sm ml-2">*</span>}
            </p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="operable"
                  value="yes"
                  className="w-5 h-5 accent-[#17283D]"
                  checked={formData.operable === 'yes'}
                  onChange={(e) => handleInputChange('operable', e.target.value)}
                />
                <span className="text-[#17283D]">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="operable"
                  value="no"
                  className="w-5 h-5 accent-[#17283D]"
                  checked={formData.operable === 'no'}
                  onChange={(e) => handleInputChange('operable', e.target.value)}
                />
                <span className="text-[#17283D]">No</span>
              </label>
            </div>
            {renderErrorMessage('operable')}
          </div>

          <div className="flex gap-4 mt-6">
            <Button 
              variant="dark" 
              className="group flex-1"
              onClick={() => setCurrentStep(1)}
            >
              <svg className="mr-2 w-4 h-4 transition-transform group-hover:rotate-180" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
              style={{ transform: 'rotate(215deg)' }}
              >
                <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </Button>
            <Button 
              variant="dark" 
              className="group flex-1"
              onClick={handleNext}
            >
              Next
              <svg className="ml-2 w-4 h-4 -rotate-45 transition-transform group-hover:rotate-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="relative">
          <input
            type="text"
            placeholder="Full name"
            className={`w-full p-3 pl-10 border border-[#17283D] rounded-md bg-transparent text-[#17283D] ${
              errors.name ? 'border-red-500' : ''
            }`}
            style={{ borderRadius: '18px 18px 0 0' }}
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
              stroke="#17283D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {renderErrorMessage('name')}
        </div>

        <div className="relative">
          <input
            type="email"
            placeholder="Email address"
            className={`w-full p-3 pl-10 border border-[#17283D] rounded-md bg-transparent text-[#17283D] ${
              errors.email ? 'border-red-500' : ''
            }`}
            style={{ borderRadius: '0', borderTop: '0' }}
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
              stroke="#17283D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {renderErrorMessage('email')}
        </div>

        <div className="relative">
          <input
            type="tel"
            placeholder="Phone number (optional)"
            className="w-full p-3 pl-10 border border-[#17283D] rounded-md bg-transparent text-[#17283D]"
            style={{ borderRadius: '0 0 18px 18px', borderTop: '0'}}
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 5.25L17.75 2H6.25L3 5.25M21 5.25V16.75L17.75 20H6.25L3 16.75V5.25M21 5.25L12 12L3 5.25"
              stroke="#17283D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="flex gap-4 mt-6">
          <Button 
            variant="dark" 
            className="group flex-1"
            onClick={() => setCurrentStep(2)}
          >
            <svg className="mr-2 w-4 h-4 transition-transform group-hover:rotate-180" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'rotate(215deg)' }}
            >
              <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </Button>
          <Button 
            variant="dark" 
            className="group flex-1"
            onClick={handleSubmit}
          >
            Get my quote
            <svg className="ml-2 w-4 h-4 -rotate-45 transition-transform group-hover:rotate-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className="bg-[#C8D6E6] rounded-xl p-6 w-full max-w-md">
      <h2 className="text-[#17283D] text-xl mb-6">
        Get a quote or call now{' '}
        <a href="tel:8887717774" className="whitespace-nowrap">(888) 771-7774</a>
      </h2>
      
      <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
        {renderStep()}
      </form>
    </div>
  );
}
