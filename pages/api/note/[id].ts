import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const noteId = req.query.id

	if(req.method === 'DELETE') {
		const note = await prisma.note.delete({
			where: {id: Number(noteId)}
		})
		res.json({message: "Berhasil"})
	} else {
		console.log("Note tidak dapat dibuat");
	}
}