import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Read
  if (req.method === "GET") {
    const users = await client.user.findMany({});
    res.json({ ok: true, users });
  }
  // Create
  if (req.method === "POST") {
    const duplicateUser = await client.user.findFirst({
      where: {
        userId: req.body.userId,
      },
    });
    if (duplicateUser) {
      res
        .status(400)
        .json({
          ok: false,
          code: "duplicate-id",
          message: "이미 사용중인 아이디 입니다",
        });
    }

    await client.user.create({
      data: req.body,
    });
    res.json({ ok: true, message: "성공적으로 가입되었습니다 😊" });
  }
  // Update
  if (req.method === "PUT") {
    res.json({ ok: true });
  }
  // Delete
  if (req.method === "DELETE") {
    await client.user.delete({
      where: {
        id: req.body.id,
      },
    });
    res.json({ ok: true });
  }
};

export default handler;
