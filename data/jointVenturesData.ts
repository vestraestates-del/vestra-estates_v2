
export interface JointVenture {
  id: number;
  title: string;
  category: 'Technology' | 'Real Estate Development' | 'Sustainable Energy';
  location: string;
  description: string;
  investmentSize: string;
  expectedReturn: string;
  image: string;
}

export const initialJointVentures: JointVenture[] = [
  {
    id: 1,
    title: "Project Hyperion: Next-Gen Geothermal",
    category: 'Sustainable Energy',
    location: 'Iceland',
    description: 'A partnership to develop and scale a revolutionary closed-loop geothermal energy system, aiming for 90% efficiency improvement over existing technologies. Seeking capital for final prototype and commercial deployment.',
    investmentSize: '$50M - $100M',
    expectedReturn: '25-30% IRR (projected)',
    image: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: "The Athena District: Smart City Module",
    category: 'Real Estate Development',
    location: 'NEOM, Saudi Arabia',
    description: 'A joint venture to build a fully autonomous, AI-managed residential and commercial district. This module will serve as a blueprint for future smart city developments, integrating sustainable infrastructure with advanced IoT.',
    investmentSize: '$500M+',
    expectedReturn: '18-22% IRR (projected)',
    image: 'https://images.pexels.com/photos/220769/pexels-photo-220769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];
