export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  brand?: string;
}

export const inventory: Product[] = [
  // Bricks & Cement
  {
    id: 'brick-red-001',
    categoryId: 'bricks-cement',
    name: 'Red Bricks',
    description: 'Premium quality red bricks for construction',
    brand: 'Suraj Munna',
  },
  {
    id: 'cement-opc-001',
    categoryId: 'bricks-cement',
    name: 'OPC Cement 53 Grade',
    description: 'High strength cement for structural work',
    brand: 'UltraTech',
  },
  {
    id: 'cement-ppc-001',
    categoryId: 'bricks-cement',
    name: 'PPC Cement',
    description: 'Portland Pozzolana Cement for general construction',
    brand: 'ACC',
  },
  {
    id: 'cement-psc-001',
    categoryId: 'bricks-cement',
    name: 'PSC Cement',
    description: 'Portland Slag Cement for durability',
    brand: 'Ambuja',
  },

  // Steel & Rods
  {
    id: 'steel-rod-8mm',
    categoryId: 'steel-rods',
    name: 'Steel Rod 8mm',
    description: 'TMT steel rod 8mm diameter',
    brand: 'TATA Steel',
  },
  {
    id: 'steel-rod-10mm',
    categoryId: 'steel-rods',
    name: 'Steel Rod 10mm',
    description: 'TMT steel rod 10mm diameter',
    brand: 'TATA Steel',
  },
  {
    id: 'steel-rod-12mm',
    categoryId: 'steel-rods',
    name: 'Steel Rod 12mm',
    description: 'TMT steel rod 12mm diameter',
    brand: 'TATA Steel',
  },
  {
    id: 'steel-rod-16mm',
    categoryId: 'steel-rods',
    name: 'Steel Rod 16mm',
    description: 'TMT steel rod 16mm diameter',
    brand: 'TATA Steel',
  },
  {
    id: 'steel-rod-20mm',
    categoryId: 'steel-rods',
    name: 'Steel Rod 20mm',
    description: 'TMT steel rod 20mm diameter',
    brand: 'TATA Steel',
  },

  // Plumbing
  {
    id: 'pipe-pvc-half',
    categoryId: 'plumbing',
    name: 'PVC Pipe 1/2 inch',
    description: 'Durable PVC pipe for water supply',
    brand: 'Astral',
  },
  {
    id: 'pipe-pvc-one',
    categoryId: 'plumbing',
    name: 'PVC Pipe 1 inch',
    description: 'Heavy duty PVC pipe',
    brand: 'Astral',
  },
  {
    id: 'water-tank-500l',
    categoryId: 'plumbing',
    name: 'Water Tank 500L',
    description: 'Overhead water storage tank',
    brand: 'Sintex',
  },
  {
    id: 'water-tank-1000l',
    categoryId: 'plumbing',
    name: 'Water Tank 1000L',
    description: 'Large capacity water storage',
    brand: 'Sintex',
  },

  // Fasteners
  {
    id: 'nails-wire-2inch',
    categoryId: 'fasteners',
    name: 'Wire Nails 2 inch',
    description: 'General purpose wire nails',
  },
  {
    id: 'nails-wire-3inch',
    categoryId: 'fasteners',
    name: 'Wire Nails 3 inch',
    description: 'Heavy duty wire nails',
  },
  {
    id: 'screws-wood-1inch',
    categoryId: 'fasteners',
    name: 'Wood Screws 1 inch',
    description: 'Self-tapping wood screws',
  },
  {
    id: 'screws-metal-1inch',
    categoryId: 'fasteners',
    name: 'Metal Screws 1 inch',
    description: 'Durable metal screws',
  },

  // Paints
  {
    id: 'paint-exterior-white',
    categoryId: 'paints',
    name: 'Exterior Paint - White',
    description: 'Weather resistant exterior emulsion',
    brand: 'Asian Paints',
  },
  {
    id: 'paint-exterior-cream',
    categoryId: 'paints',
    name: 'Exterior Paint - Cream',
    description: 'Premium exterior finish',
    brand: 'Asian Paints',
  },
  {
    id: 'paint-interior-white',
    categoryId: 'paints',
    name: 'Interior Paint - White',
    description: 'Smooth interior emulsion',
    brand: 'Berger',
  },
  {
    id: 'paint-interior-beige',
    categoryId: 'paints',
    name: 'Interior Paint - Beige',
    description: 'Elegant interior finish',
    brand: 'Berger',
  },
  {
    id: 'primer-wall',
    categoryId: 'paints',
    name: 'Wall Primer',
    description: 'Base coat for better paint adhesion',
    brand: 'Asian Paints',
  },

  // Bathroom
  {
    id: 'tap-basin-chrome',
    categoryId: 'bathroom',
    name: 'Basin Tap - Chrome',
    description: 'Modern chrome finish basin tap',
    brand: 'Jaquar',
  },
  {
    id: 'tap-sink-chrome',
    categoryId: 'bathroom',
    name: 'Sink Tap - Chrome',
    description: 'Kitchen sink tap with chrome finish',
    brand: 'Jaquar',
  },
  {
    id: 'basin-wall-mount',
    categoryId: 'bathroom',
    name: 'Wall Mount Basin',
    description: 'Ceramic wall mounted wash basin',
    brand: 'Hindware',
  },
  {
    id: 'basin-pedestal',
    categoryId: 'bathroom',
    name: 'Pedestal Basin',
    description: 'Full pedestal wash basin',
    brand: 'Hindware',
  },
  {
    id: 'shower-overhead',
    categoryId: 'bathroom',
    name: 'Overhead Shower',
    description: 'Rain shower head with arm',
    brand: 'Jaquar',
  },
  {
    id: 'shower-hand',
    categoryId: 'bathroom',
    name: 'Hand Shower',
    description: 'Flexible hand shower with hose',
    brand: 'Jaquar',
  },
];
