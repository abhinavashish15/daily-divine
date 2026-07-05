import { Request, Response } from 'express';
import { prisma } from '../config/prisma';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        receiveAutomatedMessages: true,
        createdAt: true,
      }
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const toggleAutomation = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { receiveAutomatedMessages } = req.body;

    if (typeof receiveAutomatedMessages !== 'boolean') {
       return res.status(400).json({ error: 'receiveAutomatedMessages must be a boolean' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { receiveAutomatedMessages },
      select: {
        id: true,
        receiveAutomatedMessages: true,
      }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error toggling automation:', error);
    res.status(500).json({ error: 'Failed to toggle automation' });
  }
};
