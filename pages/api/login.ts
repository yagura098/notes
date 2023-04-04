import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@prisma/client";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req;
    

    switch (method) {
        case "GET":
            try {
                return res.status(200).json({
                    message: "Success",
                    data: null,
                });
            } catch (error) {
                console.log(error);

                return res.status(500).json({
                    message: "Failed",
                    error: error,
                });
            }
        case "POST":
            try {
                return res.status(200).json({
                    message: "Success",
                    data: null,
                });
            } catch (error) {
                console.log(error);

                return res.status(500).json({
                    message: "Failed",
                    error: error,
                });
            }
    }
}

// export const getServerSideProps: GetServerSideProps = async () => {
//     const users = await prisma.user.findMany({
//         select: {
//             id: true,
//             username: true,
//             password: true
//         }
//     })

//     return {
//         props: {
//             users
//         }
//     }
// }