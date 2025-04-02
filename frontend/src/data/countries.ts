export interface Country {
    code: string;
    name: string;
    phoneCode: string;
  }
  
  export const countries: Country[] = [
    { code: 'AF', name: 'Afghanistan', phoneCode: '+93' },
    { code: 'AL', name: 'Albania', phoneCode: '+355' },
    { code: 'DZ', name: 'Algeria', phoneCode: '+213' },
    // ... add all countries
    { code: 'US', name: 'United States', phoneCode: '+1' },
    { code: 'UY', name: 'Uruguay', phoneCode: '+598' },
    { code: 'UZ', name: 'Uzbekistan', phoneCode: '+998' },
    { code: 'VA', name: 'Vatican City', phoneCode: '+379' },
    { code: 'VE', name: 'Venezuela', phoneCode: '+58' },
    { code: 'VN', name: 'Vietnam', phoneCode: '+84' },
    { code: 'YE', name: 'Yemen', phoneCode: '+967' },
    { code: 'ZM', name: 'Zambia', phoneCode: '+260' },
    { code: 'ZW', name: 'Zimbabwe', phoneCode: '+263' }
  ].sort((a, b) => a.name.localeCompare(b.name));