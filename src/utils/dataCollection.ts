
// User metadata collection utilities
// Note: This is for demonstration purposes. In a real app, you'd want to handle privacy concerns appropriately.

export interface UserMetadata {
  ipAddress: string;
  location: {
    city: string;
    region: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  browserInfo: {
    userAgent: string;
    browser: string;
    os: string;
    deviceType: string;
  };
  timestamp: number;
}

// Detect browser
const detectBrowser = (): string => {
  const userAgent = navigator.userAgent;
  
  if (userAgent.indexOf("Firefox") > -1) return "Mozilla Firefox";
  if (userAgent.indexOf("SamsungBrowser") > -1) return "Samsung Browser";
  if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) return "Opera";
  if (userAgent.indexOf("Trident") > -1) return "Internet Explorer";
  if (userAgent.indexOf("Edge") > -1) return "Microsoft Edge (Legacy)";
  if (userAgent.indexOf("Edg") > -1) return "Microsoft Edge (Chromium)";
  if (userAgent.indexOf("Chrome") > -1) return "Google Chrome";
  if (userAgent.indexOf("Safari") > -1) return "Apple Safari";
  
  return "Unknown Browser";
};

// Detect operating system
const detectOS = (): string => {
  const userAgent = navigator.userAgent;
  
  if (userAgent.indexOf("Win") > -1) return "Windows";
  if (userAgent.indexOf("Mac") > -1) return "MacOS";
  if (userAgent.indexOf("Linux") > -1) return "Linux";
  if (userAgent.indexOf("Android") > -1) return "Android";
  if (userAgent.indexOf("iPhone") > -1 || userAgent.indexOf("iPad") > -1) return "iOS";
  
  return "Unknown OS";
};

// Detect device type
const detectDeviceType = (): string => {
  const userAgent = navigator.userAgent;
  
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    return "Tablet";
  }
  
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    return "Mobile";
  }
  
  return "Desktop";
};

// For demonstration, we'll use a public API to get IP and location data
// In a real app, you might use server-side code to obtain this information
export const fetchUserMetadata = async (): Promise<UserMetadata> => {
  try {
    // Fetch IP and geolocation
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    return {
      ipAddress: data.ip || '127.0.0.1',
      location: {
        city: data.city || 'Unknown City',
        region: data.region || 'Unknown Region',
        country: data.country_name || 'Unknown Country',
        latitude: data.latitude || 0,
        longitude: data.longitude || 0
      },
      browserInfo: {
        userAgent: navigator.userAgent,
        browser: detectBrowser(),
        os: detectOS(),
        deviceType: detectDeviceType()
      },
      timestamp: Date.now()
    };
  } catch (error) {
    console.error('Error fetching user metadata:', error);
    
    // Fallback data in case the API call fails
    return {
      ipAddress: '192.168.1.1',
      location: {
        city: 'Unknown City',
        region: 'Unknown Region',
        country: 'Unknown Country',
        latitude: 40.7128,  // Default to New York coordinates
        longitude: -74.0060
      },
      browserInfo: {
        userAgent: navigator.userAgent,
        browser: detectBrowser(),
        os: detectOS(),
        deviceType: detectDeviceType()
      },
      timestamp: Date.now()
    };
  }
};

// Generate fake personal data for the simulation
export const generateFakePersonalData = (seed: string) => {
  // Use the IP address as a seed for "consistent" fake data
  const firstNameOptions = ["Alex", "Jordan", "Taylor", "Casey", "Morgan", "Riley", "Avery", "Quinn"];
  const lastNameOptions = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia"];
  
  // Simple hash function to get a number from the seed string
  const seedNumber = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  const firstName = firstNameOptions[seedNumber % firstNameOptions.length];
  const lastName = lastNameOptions[(seedNumber * 3) % lastNameOptions.length];
  
  // Generate a "leaked" password that looks realistic
  const commonWords = ["password", "qwerty", "welcome", "sunshine", "football"];
  const basePassword = commonWords[seedNumber % commonWords.length];
  const leakedPassword = `${basePassword}${(seedNumber % 99) + 1}!`;
  
  // Generate fictional relatives based on the seed
  const relativesFirstNames = ["Pat", "Sam", "Jesse", "Jamie"];
  const relatives = relativesFirstNames.map(name => `${name} ${lastName}`);
  
  // Generate fake social media accounts
  const socialAccounts = [
    { platform: "Facebook", username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}` },
    { platform: "Instagram", username: `${firstName.toLowerCase()}${lastName.toLowerCase()}${seedNumber % 100}` },
    { platform: "Twitter", username: `@${firstName.toLowerCase()}${seedNumber % 1000}` },
    { platform: "LinkedIn", username: `${firstName.toLowerCase()}-${lastName.toLowerCase()}-${seedNumber % 10}a` },
  ];
  
  // Generate fake email
  const emailDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
  const emailDomain = emailDomains[seedNumber % emailDomains.length];
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${seedNumber % 100}@${emailDomain}`;
  
  // Generate fake phone number
  const areaCode = 100 + (seedNumber % 900);
  const phoneNumber = `(${areaCode}) ${200 + (seedNumber % 800)}-${1000 + (seedNumber % 9000)}`;
  
  return {
    name: `${firstName} ${lastName}`,
    email,
    phoneNumber,
    socialAccounts,
    relatives,
    leakedPasswords: [leakedPassword, `${firstName}${seedNumber % 100}`],
    dateOfBirth: `${1950 + (seedNumber % 50)}-${(seedNumber % 12) + 1}-${(seedNumber % 28) + 1}`,
    possibleAddresses: [
      "123 Main St, Apt 4B",
      "567 Oak Avenue",
      "892 Pine Lane"
    ]
  };
};

// Generate random timestamps for "data breach" events
export const generateBreachEvents = (count: number): { site: string, date: string }[] => {
  const sites = [
    "SocialConnect", "EasyShop", "GameWorld", "QuickMail", 
    "CloudStore", "FinanceTracker", "TravelBooker", "FitnessLog"
  ];
  
  const events = [];
  
  for (let i = 0; i < count; i++) {
    const randomSite = sites[Math.floor(Math.random() * sites.length)];
    const randomYear = 2016 + Math.floor(Math.random() * 7); // 2016-2023
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    const randomDay = Math.floor(Math.random() * 28) + 1;
    
    const date = `${randomYear}-${randomMonth.toString().padStart(2, '0')}-${randomDay.toString().padStart(2, '0')}`;
    
    events.push({
      site: randomSite,
      date
    });
  }
  
  // Sort by date descending
  return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
