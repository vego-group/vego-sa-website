import { contactsAPI } from "@/services/queries/contacts";
import { useCustomQuery } from "../useCustomQuery";

export function useContacts(page: number) {
  return useCustomQuery(["contacts", page], async () => contactsAPI(page));
}
