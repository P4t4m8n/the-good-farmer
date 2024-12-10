import ProductList from "./ProductList";
import SideNav from "./SideNav";
import SubProductList from "./SubProductList";

interface Props {
  products: IProductSmall[];
  subProductList: string[];
  subProductType: string;
}

export default function ProductIndex({
  products,
  subProductList,
  subProductType,
}: Props) {
  return (
    <div className="h-full relative flex w-full ">
      <SideNav subProductList={subProductList} />
      <SubProductList
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
