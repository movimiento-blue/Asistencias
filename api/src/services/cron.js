import abscenceSave from './absenceSave'

const handler = async (_req, res) => {
  await abscenceSave()
  res.status(200).json({ msg: 'Absence saved' })
}

export default handler
