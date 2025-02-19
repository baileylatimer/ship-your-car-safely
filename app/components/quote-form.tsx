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
  year: string;
  make: CarMake | '';
  model: string;
  operable: 'yes' | 'no' | '';
}

export default function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    year: '',
    make: '',
    model: '',
    operable: ''
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      // Reset model when make changes
      if (field === 'make') {
        newData.model = '';
      }
      return newData;
    });
  };
  return (
    <div className="bg-[#C8D6E6] rounded-xl p-6 w-full max-w-md">
      <h2 className="text-[#17283D] text-xl mb-6">
        Get a quote or call now{' '}
        <a href="tel:8887717774" className="whitespace-nowrap">(888) 771-7774</a>
      </h2>
      
      <form className="flex flex-col">
        {currentStep === 1 ? (
          <>
            <div className="relative">
          <input
            type="text"
            placeholder="From (ZIP or City)"
            className="w-full p-3 pl-10 border border-[#17283D] rounded-md bg-transparent text-[#17283D]"
            style={{ borderRadius: '18px 18px 0 0' }}
          />
          <svg 
            className="absolute left-3 top-1/2 -translate-y-1/2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.9999 4.47997C16.4086 2.88867 14.2504 1.99469 11.9999 1.99469C9.74949 1.99469 7.59123 2.88867 5.99993 4.47997C4.40863 6.07127 3.51465 8.22954 3.51465 10.48C3.51465 12.7304 4.40863 14.8887 5.99993 16.48L11.2699 21.76C11.3629 21.8537 11.4735 21.9281 11.5954 21.9789C11.7172 22.0296 11.8479 22.0558 11.9799 22.0558C12.1119 22.0558 12.2426 22.0296 12.3645 21.9789C12.4864 21.9281 12.597 21.8537 12.6899 21.76L17.9999 16.43C19.5846 14.8453 20.4748 12.696 20.4748 10.455C20.4748 8.21392 19.5846 6.06465 17.9999 4.47997Z" fill="#17283D"/>
          </svg>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="To (ZIP or City)"
            className="w-full p-3 pl-10 border border-[#17283D] rounded-md bg-transparent text-[#17283D]"
            style={{ borderRadius: '0', borderTop: '0' }}
          />
          <svg 
            className="absolute left-3 top-1/2 -translate-y-1/2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 11.9V17C11 17.2652 11.1054 17.5196 11.2929 17.7071C11.4804 17.8947 11.7348 18 12 18C12.2652 18 12.5196 17.8947 12.7071 17.7071C12.8946 17.5196 13 17.2652 13 17V11.9C14.214 11.6522 15.2928 10.9624 16.0272 9.96443C16.7616 8.96643 17.0992 7.7313 16.9747 6.49849C16.8501 5.26569 16.2723 4.12304 15.3532 3.29208C14.434 2.46112 13.2391 2.00104 12 2.00104C10.7609 2.00104 9.56598 2.46112 8.64685 3.29208C7.72771 4.12304 7.14986 5.26569 7.02532 6.49849C6.90078 7.7313 7.23843 8.96643 7.9728 9.96443C8.70718 10.9624 9.78596 11.6522 11 11.9Z" fill="#17283D"/>
          </svg>
        </div>

        <div className="relative">
          <input
            type="date"
            placeholder="Pickup Date"
            defaultValue=""
            className="w-full p-3 pl-10 border border-[#17283D] rounded-md bg-transparent text-[#17283D]"
            style={{ borderRadius: '0 0 18px 18px', borderTop: '0'}}
          />
          <svg 
            className="absolute left-3 top-1/2 -translate-y-1/2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 4H18V3C18 2.73478 17.8946 2.48043 17.7071 2.29289C17.5196 2.10536 17.2652 2 17 2C16.7348 2 16.4804 2.10536 16.2929 2.29289C16.1054 2.48043 16 2.73478 16 3V4H8V3C8 2.73478 7.89464 2.48043 7.70711 2.29289C7.51957 2.10536 7.26522 2 7 2C6.73478 2 6.48043 2.10536 6.29289 2.29289C6.10536 2.48043 6 2.73478 6 3V4H5C4.20435 4 3.44129 4.31607 2.87868 4.87868C2.31607 5.44129 2 6.20435 2 7V19C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 22 5 22H19C19.7956 22 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 19V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4Z" fill="#17283D"/>
          </svg>
        </div>

            <Button 
            variant="dark" 
            className="group w-full mt-8"
            onClick={() => setCurrentStep(2)}
          >
            Vehicle Details
            <svg className="ml-2 w-4 h-4 -rotate-45 transition-transform group-hover:rotate-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
          </>
        ) : (
          <>
            <div className="relative">
              <select
                className="w-full p-3 pl-10 border border-[#17283D] rounded-[18px] bg-transparent text-[#17283D] appearance-none"
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
            </div>

            <div className="relative">
              <select
                className="w-full p-3 pl-10 border border-[#17283D] rounded-[18px] bg-transparent text-[#17283D] appearance-none"
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
            </div>

            <div className="relative">
              <select
                className="w-full p-3 pl-10 border border-[#17283D] rounded-[18px] bg-transparent text-[#17283D] appearance-none"
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
            </div>

            <div className="mt-6">
              <p className="text-[#17283D] mb-3">Is it operable?</p>
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
                onClick={() => {}}
              >
                Next
                <svg className="ml-2 w-4 h-4 -rotate-45 transition-transform group-hover:rotate-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
