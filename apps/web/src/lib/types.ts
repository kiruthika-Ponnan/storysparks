export type CreateProjectState = {
  error?: string;
  success?: boolean;
  projectId?: string;
  redirectTo?: string;
};

export function getInitialCreateState(): CreateProjectState {
  return {};
}