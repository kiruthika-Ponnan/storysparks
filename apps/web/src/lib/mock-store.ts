// Simple in-memory store for mock projects
// In production, this would be replaced with database storage

interface MockProject {
  id: string;
  userId: string;
  businessName: string;
  businessCategory: string;
  offer: string;
  tone: string;
  status: "GENERATING" | "READY" | "FAILED";
  createdAt: Date;
  updatedAt: Date;
  assets: any[];
  videos: any[];
  script: any;
  storyboard: any;
  voiceover: any;
  campaignTips: any;
  tasks: any[];
}

// In-memory store (in production, this would be a database)
const mockProjectsStore = new Map<string, MockProject>();

export function storeMockProject(project: MockProject) {
  mockProjectsStore.set(project.id, project);
  console.log("Stored mock project:", project);
}

export function getMockProject(projectId: string): MockProject | null {
  const project = mockProjectsStore.get(projectId);
  console.log("Retrieved mock project:", project);
  return project || null;
}

export function getAllMockProjects(userId: string): MockProject[] {
  const projects = Array.from(mockProjectsStore.values()).filter(p => p.userId === userId);
  console.log("Retrieved all mock projects for user:", projects);
  return projects;
}


