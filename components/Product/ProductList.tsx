import ProductPreview from "./ProductPreview";

interface Props {
  products: IProductSmall[];
  styleMode: TProductStyleMode;
}
// Module imports cause Tailwind to ignore classes, so the constants are defined here
const PRODUCTS_LIST_PAGE_STYLE =
  "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4";
const PRODUCTS_LIST_CART_STYLE =
  "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4";
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
