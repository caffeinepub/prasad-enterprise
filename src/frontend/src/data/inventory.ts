export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  brand?: string;
  imageSrc: string;
}

export const inventory: Product[] = [
  // Bricks & Cement
  {
    id: 'brick-red-001',
    categoryId: 'bricks-cement',
    name: 'Red Bricks',
    description: 'Premium quality red bricks for construction',
    brand: 'Suraj Munna',
    imageSrc: '/assets/generated/product-brick-red-001.dim_800x600.jpg',
  },
  {
    id: 'cement-opc-001',
    categoryId: 'bricks-cement',
    name: 'OPC Cement 53 Grade',
    description: 'High strength cement for structural work',
    brand: 'UltraTech',
    imageSrc: '/assets/generated/product-cement-opc-001.dim_800x600.jpg',
  },
  {
    id: 'cement-ppc-001',
    categoryId: 'bricks-cement',
    name: 'PPC Cement',
    description: 'Portland Pozzolana Cement for general construction',
    brand: 'ACC',
    imageSrc: '/assets/generated/product-cement-ppc-001.dim_800x600.jpg',
  },
  {
    id: 'cement-psc-001',
    categoryId: 'bricks-cement',
    name: 'PSC Cement',
    description: 'Portland Slag Cement for durability',
    brand: 'Ambuja',
    imageSrc: '/assets/generated/product-cement-psc-001.dim_800x600.jpg',
  },

  // Steel & Rods (brand removed)
  {
    id: 'steel-rod-8mm',
    categoryId: 'steel-rods',
    name: 'Steel Rod 8mm',
    description: 'TMT steel rod 8mm diameter',
    imageSrc: '/assets/generated/product-steel-rod-8mm.dim_800x600.jpg',
  },
  {
    id: 'steel-rod-10mm',
    categoryId: 'steel-rods',
    name: 'Steel Rod 10mm',
    description: 'TMT steel rod 10mm diameter',
    imageSrc: '/assets/generated/product-steel-rod-10mm.dim_800x600.jpg',
  },
  {
    id: 'steel-rod-12mm',
    categoryId: 'steel-rods',
    name: 'Steel Rod 12mm',
    description: 'TMT steel rod 12mm diameter',
    imageSrc: '/assets/generated/product-steel-rod-12mm.dim_800x600.jpg',
  },
  {
    id: 'steel-rod-16mm',
    categoryId: 'steel-rods',
    name: 'Steel Rod 16mm',
    description: 'TMT steel rod 16mm diameter',
    imageSrc: '/assets/generated/product-steel-rod-16mm.dim_800x600.jpg',
  },
  {
    id: 'steel-rod-20mm',
    categoryId: 'steel-rods',
    name: 'Steel Rod 20mm',
    description: 'TMT steel rod 20mm diameter',
    imageSrc: '/assets/generated/product-steel-rod-20mm.dim_800x600.jpg',
  },

  // Plumbing
  {
    id: 'pipe-pvc-half',
    categoryId: 'plumbing',
    name: 'PVC Pipe 1/2 inch',
    description: 'Durable PVC pipe for water supply',
    brand: 'Astral',
    imageSrc: '/assets/generated/product-pipe-pvc-half.dim_800x600.jpg',
  },
  {
    id: 'pipe-pvc-one',
    categoryId: 'plumbing',
    name: 'PVC Pipe 1 inch',
    description: 'Heavy duty PVC pipe',
    brand: 'Astral',
    imageSrc: '/assets/generated/product-pipe-pvc-one.dim_800x600.jpg',
  },
  {
    id: 'water-tank-500l',
    categoryId: 'plumbing',
    name: 'Water Tank 500L',
    description: 'Overhead water storage tank',
    brand: 'Sintex',
    imageSrc: '/assets/generated/product-water-tank-500l.dim_800x600.jpg',
  },
  {
    id: 'water-tank-1000l',
    categoryId: 'plumbing',
    name: 'Water Tank 1000L',
    description: 'Large capacity water storage',
    brand: 'Sintex',
    imageSrc: '/assets/generated/product-water-tank-1000l.dim_800x600.jpg',
  },

  // Fasteners
  {
    id: 'nails-wire-2inch',
    categoryId: 'fasteners',
    name: 'Wire Nails 2 inch',
    description: 'General purpose wire nails',
    imageSrc: '/assets/generated/product-nails-wire-2inch.dim_800x600.jpg',
  },
  {
    id: 'nails-wire-3inch',
    categoryId: 'fasteners',
    name: 'Wire Nails 3 inch',
    description: 'Heavy duty wire nails',
    imageSrc: '/assets/generated/product-nails-wire-3inch.dim_800x600.jpg',
  },
  {
    id: 'screws-wood-1inch',
    categoryId: 'fasteners',
    name: 'Wood Screws 1 inch',
    description: 'Self-tapping wood screws',
    imageSrc: '/assets/generated/product-screws-wood-1inch.dim_800x600.jpg',
  },
  {
    id: 'screws-metal-1inch',
    categoryId: 'fasteners',
    name: 'Metal Screws 1 inch',
    description: 'Durable metal screws',
    imageSrc: '/assets/generated/product-screws-metal-1inch.dim_800x600.jpg',
  },

  // Paints
  {
    id: 'paint-exterior-white',
    categoryId: 'paints',
    name: 'Exterior Paint - White',
    description: 'Weather resistant exterior emulsion',
    brand: 'Asian Paints',
    imageSrc: '/assets/generated/product-paint-exterior-white.dim_800x600.jpg',
  },
  {
    id: 'paint-exterior-cream',
    categoryId: 'paints',
    name: 'Exterior Paint - Cream',
    description: 'Premium exterior finish',
    brand: 'Asian Paints',
    imageSrc: '/assets/generated/product-paint-exterior-cream.dim_800x600.jpg',
  },
  {
    id: 'paint-interior-white',
    categoryId: 'paints',
    name: 'Interior Paint - White',
    description: 'Smooth interior emulsion',
    brand: 'Berger',
    imageSrc: '/assets/generated/product-paint-interior-white.dim_800x600.jpg',
  },
  {
    id: 'paint-interior-beige',
    categoryId: 'paints',
    name: 'Interior Paint - Beige',
    description: 'Elegant interior finish',
    brand: 'Berger',
    imageSrc: '/assets/generated/product-paint-interior-beige.dim_800x600.jpg',
  },
  {
    id: 'primer-wall',
    categoryId: 'paints',
    name: 'Wall Primer',
    description: 'Base coat for better paint adhesion',
    brand: 'Asian Paints',
    imageSrc: '/assets/generated/product-primer-wall.dim_800x600.jpg',
  },

  // Bathroom
  {
    id: 'tap-basin-chrome',
    categoryId: 'bathroom',
    name: 'Basin Tap - Chrome',
    description: 'Modern chrome finish basin tap',
    brand: 'Jaquar',
    imageSrc: '/assets/generated/product-tap-basin-chrome.dim_800x600.jpg',
  },
  {
    id: 'tap-sink-chrome',
    categoryId: 'bathroom',
    name: 'Sink Tap - Chrome',
    description: 'Kitchen sink tap with chrome finish',
    brand: 'Jaquar',
    imageSrc: '/assets/generated/product-tap-sink-chrome.dim_800x600.jpg',
  },
  {
    id: 'basin-wall-mount',
    categoryId: 'bathroom',
    name: 'Wall Mount Basin',
    description: 'Ceramic wall mounted wash basin',
    brand: 'Hindware',
    imageSrc: '/assets/generated/product-basin-wall-mount.dim_800x600.jpg',
  },
  {
    id: 'basin-pedestal',
    categoryId: 'bathroom',
    name: 'Pedestal Basin',
    description: 'Full pedestal wash basin',
    brand: 'Hindware',
    imageSrc: '/assets/generated/product-basin-pedestal.dim_800x600.jpg',
  },
  {
    id: 'shower-overhead',
    categoryId: 'bathroom',
    name: 'Overhead Shower',
    description: 'Rain shower head with arm',
    brand: 'Jaquar',
    imageSrc: '/assets/generated/product-shower-overhead.dim_800x600.jpg',
  },
  {
    id: 'shower-hand',
    categoryId: 'bathroom',
    name: 'Hand Shower',
    description: 'Flexible hand shower with hose',
    brand: 'Jaquar',
    imageSrc: '/assets/generated/product-shower-hand.dim_800x600.jpg',
  },
];
