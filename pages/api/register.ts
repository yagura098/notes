import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const {username, password} = req.body

	try {
		await prisma.user.create({
			data: {
				username,
				password
			}
		})
		res.status(200).json({message: 'Akun berhasil dibuat'})
	} catch (error) {
		console.log("Akun gagal dibuat");
	}
}