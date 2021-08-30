export default async (req, res) => {
  console.log(req.body)
  res.status(200).end('uploaded')
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500mb',
    },
  },
}
