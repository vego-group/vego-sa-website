const investmentTicketTypeLabels: Record<string, string> = {
  "150000-200000": "SAR 150,000 - 200,000",
  "250000-350000": "SAR 250,000 - 350,000",
  "350000+": "SAR 350,000+",
};

function formatInvestmentTicketType(value?: string | null) {
  const normalized = value?.trim();
  if (!normalized) return undefined;

  return investmentTicketTypeLabels[normalized] ?? normalized;
}

export { formatInvestmentTicketType };
