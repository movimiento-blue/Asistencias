import abscenceSave from './absenceSave'

module.exports = async (_req, res) => {
  await abscenceSave()
  res.status(200).json({ msg: 'Absence saved' })
}
