import DepositPageContent from "@/components/landing/deposit";

type DepositPageProps = {
  searchParams: Promise<{
    product?: string;
  }>;
};

async function DepositPage({ searchParams }: DepositPageProps) {
  const params = await searchParams;

  return <DepositPageContent initialProductId={params.product} />;
}

export default DepositPage;
