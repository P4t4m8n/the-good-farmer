import { IProductSmall, TProductStyleMode } from "@/types/product";
import ProductPreview from "./ProductPreview";

interface Props {
  products: IProductSmall[];
  styleMode: TProductStyleMode;
}

export default function ProductList({ products, styleMode }: Props) {
  const listStyle =
    styleMode === "page" ? PRODUCTS_LIST_PAGE_STYLE : PRODUCTS_LIST_CART_STYLE;

  return (
    <ul className={`${listStyle}`}>
      {products?.map((product) => (
        <ProductPreview
          product={product}
          key={product._id}
          styleMode={styleMode}
        />
      ))}
    </ul>
  );
}

// Module imports cause Tailwind to ignore classes because Tailwind CSS scans the source files for class names during the build process.
// If the class names are dynamically generated or imported from another module, Tailwind cannot detect and include them in the final CSS.
const PRODUCTS_LIST_PAGE_STYLE =
  "grid grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] gap-4 w-full h-full";
const PRODUCTS_LIST_CART_STYLE =
  "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4";
