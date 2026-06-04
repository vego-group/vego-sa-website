import DepositPageContent from "@/components/landing/deposit";

type DepositPageProps = {
  searchParams: Promise<{
    productSlug?: string;
    product?: string;
  }>;
};

async function DepositPage({ searchParams }: DepositPageProps) {
  const params = await searchParams;

  return (
    <DepositPageContent initialProductSlug={params.productSlug ?? params.product} />
  );
}

export default DepositPage;
