import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const {title, content, userId} = req.body

	try {
		await prisma.note.create({
			data: {
				title,
				content,
                userId
			}
		})
		res.status(200).json({message: 'Note Berhasil dibuat'})
	} catch (error) {
		console.log("Note Gagal dibuat");
	}
}
