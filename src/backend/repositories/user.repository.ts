import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class UserRepository {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async findByFirebaseUid(firebaseUid: string) {
    if (!firebaseUid) return null;
    return prisma.user.findUnique({
      where: { firebaseUid },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findByUsername(username: string) {
    // If findUnique has issues with optional unique fields in linting
    return prisma.user.findFirst({
      where: { username },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async updateScore(id: string, increment: number) {
    return prisma.user.update({
      where: { id },
      data: {
        score: { increment },
      },
    });
  }

  async getProfile(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        avatarUrl: true,
        role: true,
        score: true,
        bio: true,
        birthday: true,
        location: true,
        institution: true,
        major: true,
        interests: true,
        favoritePhilosopher: true,
        phone: true,
        instagram: true,
        facebook: true,
        linkedIn: true,
        preferredLanguage: true,
        philosophySchool: true,
        createdAt: true,
      },
    });
  }

  async getDashboard(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        role: true,
        score: true,
      },
    });
  }
}

export const userRepository = new UserRepository();
