import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const {title, content, userId} = req.body
	const token = req.headers.authorization
	console.log(userId)
	try {
		const decode = jwt.verify(token, 'bangmessi') 
	}
	catch {
		res.status(400).json({message: "Token tidak valid"})
	}
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
