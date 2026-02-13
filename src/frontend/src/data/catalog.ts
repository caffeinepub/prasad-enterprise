import { Hammer, Wrench, Paintbrush, Droplet, Bath, Package } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export const categories: Category[] = [
  {
    id: 'bricks-cement',
    name: 'Bricks & Cement',
    description: 'High-quality bricks and cement for strong foundations',
    icon: Package,
  },
  {
    id: 'steel-rods',
    name: 'Steel & Rods',
    description: 'Durable steel rods and reinforcement materials',
    icon: Hammer,
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    description: 'Complete plumbing solutions and water storage',
    icon: Droplet,
  },
  {
    id: 'fasteners',
    name: 'Fasteners',
    description: 'Nails, screws, and all fastening materials',
    icon: Wrench,
  },
  {
    id: 'paints',
    name: 'Paints & Primers',
    description: 'Premium paints for interior and exterior applications',
    icon: Paintbrush,
  },
  {
    id: 'bathroom',
    name: 'Bathroom Fixtures',
    description: 'Modern bathroom fittings and accessories',
    icon: Bath,
  },
];
