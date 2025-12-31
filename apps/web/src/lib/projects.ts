import { prisma } from './db';
import { buildMockProjects } from './mock-data';

export const getProjects = async (userId: string) => {
  try {
    return await prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        assets: true,
        videos: true,
        tasks: true,
      },
    });
  } catch (error) {
    console.warn('Falling back to mock projects', error);
    return buildMockProjects(userId);
  }
};

export const getProject = async (projectId: string, userId: string) => {
  try {
    return await prisma.project.findFirst({
      where: { id: projectId, userId },
      include: {
        assets: true,
        script: true,
        storyboard: true,
        voiceover: true,
        campaignTips: true,
        videos: true,
        tasks: true,
      },
    });
  } catch (error) {
    console.warn('Returning mock project', error);
    return buildMockProjects(userId).find((project) => project.id === projectId) ?? null;
  }
};
