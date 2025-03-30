export interface IAssignmentsDataResponse {
  name: string,
  email: string,
  assignment_description: string,
  github_repo_url: string,
  candidate_level: string
}

export interface IAssignmentsErrorResponse {
  message: string,
  errors: string[],
}