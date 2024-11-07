export default interface UserInfoInterface {
  userId?: string;
  ip?: string;
  fio?: string;
  isAD?: boolean;
  login?: string;
  externalId?: string;
  keycloakId?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  avatar?: string;
  mobile?: string;
  organizationsInfo?: { organizationId: string; externalId?: string }[];
  contractorsInfo?: { contractorId: string; externalId?: string }[];
  organizationIds?: string[];
  contractorsIds?: string[];
}
