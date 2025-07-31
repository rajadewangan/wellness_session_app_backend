import Session from '../models/Session.js';

export const getPublicSessions = async (req, res) => {
  const sessions = await Session.find({ status: 'published' });
  res.json(sessions);
};

export const getUserSessions = async (req, res) => {
  const sessions = await Session.find({ user_id: req.user.id });
  res.json(sessions);
};

export const getSingleSession = async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, user_id: req.user.id });
  if (!session) return res.status(404).json({ error: 'Session not found' });
  res.json(session);
};

export const saveOrUpdateDraft = async (req, res) => {
  const { id, title, tags, json_file_url } = req.body;

  if (id) {
    const updated = await Session.findOneAndUpdate(
      { _id: id, user_id: req.user.id },
      { title, tags, json_file_url, updated_at: new Date() },
      { new: true }
    );
    return res.json(updated);
  } else {
    const session = new Session({
      user_id: req.user.id,
      title,
      tags,
      json_file_url,
      status: 'draft'
    });
    await session.save();
    res.json(session);
  }
};

export const publishSession = async (req, res) => {
  const { id } = req.body;
  const session = await Session.findOneAndUpdate(
    { _id: id, user_id: req.user.id },
    { status: 'published', updated_at: new Date() },
    { new: true }
  );
  res.json(session);
};
