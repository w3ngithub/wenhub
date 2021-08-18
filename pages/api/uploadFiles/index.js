export default async (req, res) => {
  res.status(200).end('uploaded')
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500mb',
    },
  },
}
