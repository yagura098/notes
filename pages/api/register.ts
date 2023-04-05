import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";
import { use } from "react";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const {username, password} = JSON.parse(req.body)
	console.log(username)
	try {
		await prisma.user.create({
			data: {
				username,
				password
			}
		})
		res.status(200).json({message: 'Akun berhasil dibuat'})
	} catch (error) {
		res.status(400).json({message: 'Akun gagal dibuat'})
		console.log("Akun gagal dibuat");
	}
}