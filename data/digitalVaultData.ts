
export interface VaultDocument {
  id: number;
  title: string;
  category: 'Legal' | 'Financial' | 'Personal';
  dateAdded: string;
  encrypted: boolean;
  content: string; // In a real app, this would be fetched securely and decrypted on the client.
}

export const initialVaultDocuments: VaultDocument[] = [
  {
    id: 1,
    title: "Last Will and Testament",
    category: 'Legal',
    dateAdded: '2023-01-15',
    encrypted: true,
    content: `
CONFIDENTIAL - FOR AUTHORIZED EYES ONLY

LAST WILL AND TESTAMENT

This document outlines the final wishes and distribution of assets.

Article I: Beneficiaries
Primary Beneficiary: [REDACTED]
Secondary Beneficiary: The VESTRA Philanthropic Trust

Article II: Asset Distribution
- Real Estate Portfolio: To be managed by VESTRA ESTATES in trust for the primary beneficiary.
- Art Collection: To be donated to The Rossi Collection, with lifetime viewing rights for the primary beneficiary.
- Financial Assets: To be transferred to Aethelred Capital under the existing management agreement.

[...Further details redacted for security...]
    `,
  },
  {
    id: 2,
    title: "Q2 2024 Portfolio Statement",
    category: 'Financial',
    dateAdded: '2024-07-01',
    encrypted: true,
    content: `
VESTRA ESTATES - CONFIDENTIAL FINANCIAL STATEMENT
Period Ending: June 30, 2024

Total Portfolio Value: $1.075B USD
Change vs. Q1 2024: +$25M (+2.38%)

Key Holdings:
1. The Bosphorus Estate - Value: $115M
2. Villa Leopolda - Value: $640M
3. Aspen Mountain Retreat - Value: $75M
...

[...Detailed financial breakdown redacted...]
    `,
  },
   {
    id: 3,
    title: "Trust Deed - The Legacy Trust",
    category: 'Legal',
    dateAdded: '2022-08-20',
    encrypted: true,
    content: `
DEED OF TRUST

This Deed of Trust establishes "The Legacy Trust" under the jurisdiction of the Canton of Geneva, Switzerland.

Trustee: VESTRA ESTATES AG
Grantor: [REDACTED]

Purpose: The preservation and multi-generational management of the Grantor's core assets for the benefit of designated heirs.

[...Full legal text redacted...]
    `,
  },
   {
    id: 4,
    title: "Emergency Medical Directives",
    category: 'Personal',
    dateAdded: '2023-05-10',
    encrypted: true,
    content: `
CONFIDENTIAL MEDICAL DIRECTIVE

Patient: [REDACTED]
Primary Physician: Dr. Alistair Finch (Zurich)

Known Allergies: None
Blood Type: O-
Key Conditions: None

Directives:
- In case of emergency, contact VESTRA Security Division immediately.
- Authorization for private medical evacuation to pre-approved facilities in Switzerland or the United States.

[...Contact details and further instructions redacted...]
    `,
  }
];
