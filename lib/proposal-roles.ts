import type { ProposalRole } from "@/lib/proposal-types"

export const PROPOSAL_ROLES: ProposalRole[] = [
  {
    id: "best-man",
    title: "Best Man",
    category: "Entourage",
    type: "entourage",
    roleCategory: "Best Man",
    description:
      "To stand beside the groom, offer counsel, and help keep the celebration joyful and meaningful.",
  },
  {
    id: "matron-of-honor",
    title: "Matron of Honor",
    category: "Entourage",
    type: "entourage",
    roleCategory: "Matron of Honor",
    description:
      "To stand beside the bride, lend a steady hand, and help make every moment of the day unforgettable.",
  },
  {
    id: "bridesmaid",
    title: "Bridesmaid",
    category: "Entourage",
    type: "entourage",
    roleCategory: "Bridesmaids",
    description:
      "To walk with the bride, share in her joy, and support her through this beautiful chapter.",
  },
  {
    id: "groomsman",
    title: "Groomsman",
    category: "Entourage",
    type: "entourage",
    roleCategory: "Groomsmen",
    description:
      "To stand with the groom, celebrate his happiness, and help make the day run smoothly.",
  },
  {
    id: "flower-girl",
    title: "Flower Girl",
    category: "Entourage",
    type: "entourage",
    roleCategory: "Flower Girls",
    description: "To scatter petals down the aisle and bring sweetness to the ceremony.",
  },
  {
    id: "ring-bearer",
    title: "Ring Bearer",
    category: "Entourage",
    type: "entourage",
    roleCategory: "Ring Bearer",
    description: "To carry the rings with care and present them at the altar.",
  },
  {
    id: "coin-bearer",
    title: "Coin Bearer",
    category: "Entourage",
    type: "entourage",
    roleCategory: "Coin Bearer",
    description: "To carry the arrhae with reverence during the wedding ceremony.",
  },
  {
    id: "little-bride",
    title: "Little Bride",
    category: "Entourage",
    type: "entourage",
    roleCategory: "Little Bride",
    description: "To walk down the aisle and add a touch of innocence and charm.",
  },
  {
    id: "candle-sponsor",
    title: "Candle Sponsor",
    category: "Entourage",
    type: "entourage",
    roleCategory: "Candle Sponsors",
    description: "To light the candles that symbolize the union of two families.",
  },
  {
    id: "veil-sponsor",
    title: "Veil Sponsor",
    category: "Entourage",
    type: "entourage",
    roleCategory: "Veil Sponsors",
    description: "To place the veil over the couple as a symbol of unity and protection.",
  },
  {
    id: "cord-sponsor",
    title: "Cord Sponsor",
    category: "Entourage",
    type: "entourage",
    roleCategory: "Cord Sponsors",
    description: "To bind the cord around the couple, signifying their lifelong bond.",
  },
  {
    id: "principal-sponsor-ninong",
    title: "Principal Sponsor (Ninong)",
    category: "Principal Sponsor",
    type: "sponsor-ninong",
    roleCategory: "Principal Sponsors",
    description:
      "To serve as a principal sponsor and spiritual guide, offering wisdom and support to the couple.",
  },
  {
    id: "principal-sponsor-ninang",
    title: "Principal Sponsor (Ninang)",
    category: "Principal Sponsor",
    type: "sponsor-ninang",
    roleCategory: "Principal Sponsors",
    description:
      "To serve as a principal sponsor and spiritual guide, offering wisdom and support to the couple.",
  },
]

export function getProposalRoleById(roleId: string): ProposalRole | undefined {
  return PROPOSAL_ROLES.find((role) => role.id === roleId)
}

export function getRoleSingular(title: string): string {
  return title.endsWith("s") ? title.slice(0, -1) : title
}
