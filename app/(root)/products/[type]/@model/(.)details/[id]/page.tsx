import ProductDetailsModel from "@/components/Product/ProductDetails/ProductDetails";
import DialogWrapper from "@/components/Wrappers/DialogWrapper";
import { getProductById } from "@/lib/actions/product.actions";
import { redirect } from "next/navigation";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string; type: string }>;
}) {
  const { id, type } = await params;

  const product = await getProductById({ _id: id, isSmallProduct: false });
  if (!product) return redirect(`/products/${type}`);

  return (
    <DialogWrapper>
      <ProductDetailsModel product={product} />
    </DialogWrapper>
  );
}
