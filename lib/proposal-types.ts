export type ProposalStatus = "Confirmed" | "Declined"

export type ProposalRoleType = "entourage" | "sponsor-ninong" | "sponsor-ninang"

export interface ProposalRole {
  id: string
  title: string
  category: string
  type: ProposalRoleType
  roleCategory: string
  description: string
}

export interface ProposalResponse {
  id: string
  role: string
  name: string
  status: ProposalStatus
  submittedAt: string
  category: string
}

export interface ProposalSubmitPayload {
  role: string
  name: string
  status: ProposalStatus
  submittedAt: string
}
