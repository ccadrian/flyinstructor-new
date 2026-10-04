const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_NO_REPLY = 'flyinstructor.com <no-reply@flyinstructor.com>';
const INQUIRY_INBOX = 'cockpit@flyinstructor.com';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: 'Invalid JSON body' });
    }
  }

  const name = (body?.name || '').toString().trim();
  const email = (body?.email || '').toString().trim();
  const rating = (body?.rating || 'Not sure yet').toString().trim();
  const message = (body?.message || '').toString().trim();

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email, and message are required.' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' });
  }
  if (name.length > 200 || email.length > 200 || rating.length > 200 || message.length > 5000) {
    return res.status(400).json({ ok: false, error: 'One of the fields is too long.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ ok: false, error: 'Email service is not configured.' });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeRating = escapeHtml(rating);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

  try {
    await resend.emails.send({
      from: FROM_NO_REPLY,
      to: INQUIRY_INBOX,
      replyTo: email,
      subject: `New inquiry from ${name}: ${rating}`,
      html: `
        <div style="font-family:sans-serif; color:#121214; line-height:1.6;">
          <h2 style="margin:0 0 16px;">New training inquiry</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Interest:</strong> ${safeRating}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        </div>
      `,
    });

    await resend.emails.send({
      from: FROM_NO_REPLY,
      to: email,
      replyTo: INQUIRY_INBOX,
      subject: 'We received your message, flyinstructor.com',
      html: `
        <div style="font-family:sans-serif; color:#121214; line-height:1.6;">
          <p>Hi ${safeName},</p>
          <p>Thanks for reaching out to flyinstructor.com. This confirms your message was received and we will get back to you soon.</p>
          <p style="margin:20px 0; padding:16px; background:#F1EFE9; border-radius:8px;">
            <strong>Interest:</strong> ${safeRating}<br>
            <strong>Your message:</strong><br>${safeMessage}
          </p>
          <p>If anything is urgent, you can reply directly to this email or write to <a href="mailto:cockpit@flyinstructor.com">cockpit@flyinstructor.com</a>.</p>
          <p>Blue skies,<br>flyinstructor.com</p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend send failed:', err);
    return res.status(502).json({ ok: false, error: 'Failed to send email. Please try again later.' });
  }
};
