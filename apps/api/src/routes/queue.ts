import { Router } from 'express';
import { z } from 'zod';

const router = Router();

const triggerSchema = z.object({
  projectId: z.string().min(1),
});

router.post('/generate', async (req, res) => {
  const parseResult = triggerSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.flatten() });
  }

  // TODO: enqueue BullMQ job once Redis connection is configured.
  res.status(202).json({ accepted: true, projectId: parseResult.data.projectId });
});

export { router };
