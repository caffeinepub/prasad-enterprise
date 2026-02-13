import { generateGalleryMetadata } from '@/utils/galleryInference';

export interface GalleryItem {
  id: string;
  imageSrc: string;
  name: string;
  category: string;
}

// Static list of gallery image paths (manually added)
const GALLERY_IMAGE_PATHS = [
  '/assets/generated/blueprint-bg-tile.dim_1024x1024.png',
  '/assets/generated/product-brick-red-001.dim_800x600.jpg',
  '/assets/generated/product-cement-opc-001.dim_800x600.jpg',
  '/assets/generated/product-cement-ppc-001.dim_800x600.jpg',
  '/assets/generated/product-cement-psc-001.dim_800x600.jpg',
  '/assets/generated/product-nails-wire-2inch.dim_800x600.jpg',
  '/assets/generated/product-nails-wire-3inch.dim_800x600.jpg',
  '/assets/generated/product-pipe-pvc-half.dim_800x600.jpg',
  '/assets/generated/product-pipe-pvc-one.dim_800x600.jpg',
  '/assets/generated/product-steel-rod-10mm.dim_800x600.jpg',
  '/assets/generated/product-steel-rod-12mm.dim_800x600.jpg',
  '/assets/generated/product-steel-rod-16mm.dim_800x600.jpg',
  '/assets/generated/product-steel-rod-20mm.dim_800x600.jpg',
  '/assets/generated/product-steel-rod-8mm.dim_800x600.jpg',
  '/assets/generated/product-water-tank-1000l.dim_800x600.jpg',
  '/assets/generated/product-water-tank-500l.dim_800x600.jpg',
];

/**
 * Generate gallery items with auto-inferred names and categories
 */
export const galleryItems: GalleryItem[] = GALLERY_IMAGE_PATHS.map((imagePath, index) => {
  const metadata = generateGalleryMetadata(imagePath);
  
  return {
    id: `gallery-${index + 1}`,
    imageSrc: imagePath,
    name: metadata.name,
    category: metadata.category,
  };
});

/**
 * Get unique categories from gallery items
 */
export function getGalleryCategories(): string[] {
  const categories = new Set(galleryItems.map(item => item.category));
  return ['All', ...Array.from(categories).sort()];
}
