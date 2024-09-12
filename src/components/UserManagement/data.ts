const names = [
  'Aman',
  'Aarti',
  'Raj',
  'Rita',
  'Vikram',
  'Neha',
  'Ravi',
  'Simran',
  'Amit',
  'Kiran',
  'Sanjay',
  'Pooja',
  'Nitin',
  'Suman',
  'Anil',
  'Meena',
  'Sandeep',
  'Anjali',
  'Kunal',
  'Priya',
  'Deepak',
  'Nisha',
  'Gaurav',
  'Kavita',
  'Rohit',
  'Sheetal',
  'Sunil',
  'Rina',
  'Arun',
  'Nandini',
  'Mohit',
  'Sonia',
];

const roles = ['Admin', 'Manager', 'Customer'];
const generateRandomRole = () => roles[Math.floor(Math.random() * roles.length)];

const generateUserObjects = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    name: names[index % names.length], // Cycle through names if count > names.length
    role: generateRandomRole(),
    email: `user${index + 1}@example.com`, // Generating a unique email for each user
    status: Math.random() > 0.5, // Random true/false status
    lastLogin: new Date(2024, 7, 28), // Constant date
  }));
};

export const users = generateUserObjects(30);
