import ProductList from "./ProductList";
import SideNav from "./SideNav";
import SubProductList from "./SubProductList";

interface Props {
  productType: TProductType;
  products: IProductSmall[];
  subProductList: string[];
  subProductType: string;
}

export default function ProductIndex({
  productType,
  products,
  subProductList,
  subProductType,
}: Props) {
  return (
    <div className="h-full relative flex gap-4 w-full">
      <SideNav subProductList={subProductList} />
      <SubProductList
        productType={productType}
        subProductType={subProductType}
        subProductList={subProductList}
      >
        <li
          key={subProductType}
          id={subProductType}
          className=" scroll-mt-[9.5rem] pt-16 "
        >
          <h3 className="text-4xl font-title pb-8">{subProductType}</h3>
          <ProductList products={products} styleMode="page" />
        </li>
      </SubProductList>
    </div>
  );
}
