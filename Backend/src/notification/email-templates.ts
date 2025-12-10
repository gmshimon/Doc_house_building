interface AppointmentEmailContext {
  appointmentId: number;
  doctorName: string;
  doctorEmail: string;
  doctorAddress?: string;
  patientName?: string | null;
  patientEmail: string;
  patientPhone?: string | null;
  serviceName: string;
  slotDate: string;
  slotStart?: string | null;
  slotEnd?: string | null;
  reason?: string | null;
}

export function buildAppointmentEmails(context: AppointmentEmailContext) {
  const patientName = context.patientName ?? 'there';
  const doctorName = context.doctorName;
  const slotStart = context.slotStart ?? 'N/A';
  const slotEnd = context.slotEnd ?? 'N/A';
  const reason = context.reason ?? 'N/A';
  const doctorAddress = context.doctorAddress ?? 'To be provided';

  // -------------------------
  // Patient Email Template
  // -------------------------
  const patientEmail = {
    to: context.patientEmail,
    subject: `Appointment confirmed with Dr. ${doctorName} on ${context.slotDate}`,
    html: `
  <html>
  <body style="margin:0; padding:0; background-color:#f7f7f9; font-family:Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
      <tr>
        <td align="center">

          <!-- Card Container -->
          <table width="600" cellpadding="0" cellspacing="0" style="background:white; border-radius:10px; overflow:hidden; border:1px solid #e5e7eb;">

            <!-- Header -->
            <tr>
              <td style="background:#2563eb; padding:18px 25px; color:white; font-size:20px; font-weight:600;">
                Doc House — Appointment Confirmation
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:25px; color:#333;">

                <p style="font-size:15px; margin:0 0 15px;">
                  Hi <strong>${patientName}</strong>,
                </p>

                <p style="font-size:14px; margin:0 0 20px;">
                  Your appointment has been <strong>successfully confirmed</strong>. Please review the details below.
                </p>

                <!-- Appointment Summary -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin:15px 0; border-collapse:collapse;">
                  <tr>
                    <td colspan="2" style="font-size:16px; font-weight:600; padding-bottom:8px; border-bottom:1px solid #e5e7eb;">
                      Appointment Summary
                    </td>
                  </tr>

                  <tr><td style="padding:10px 0; color:#6b7280;">Appointment ID</td><td style="padding:10px 0; color:#111827;">#${context.appointmentId}</td></tr>
                  <tr><td style="padding:6px 0; color:#6b7280;">Doctor</td><td style="padding:6px 0; color:#111827;">Dr. ${doctorName}</td></tr>
                  <tr><td style="padding:6px 0; color:#6b7280;">Location</td><td style="padding:6px 0; color:#111827;">${doctorAddress}</td></tr>
                  <tr><td style="padding:6px 0; color:#6b7280;">Service</td><td style="padding:6px 0; color:#111827;">${context.serviceName}</td></tr>
                  <tr><td style="padding:6px 0; color:#6b7280;">Date</td><td style="padding:6px 0; color:#111827;">${context.slotDate}</td></tr>
                  <tr><td style="padding:6px 0; color:#6b7280;">Time</td><td style="padding:6px 0; color:#111827;">${slotStart} – ${slotEnd}</td></tr>
                  <tr><td style="padding:6px 0; color:#6b7280;">Reason</td><td style="padding:6px 0; color:#111827;">${reason}</td></tr>
                </table>

                <p style="font-size:14px; margin-top:20px;">
                  Need to reschedule? Please reply at least <strong>24 hours</strong> in advance.
                </p>

                <p style="font-size:14px;">
                  Thank you for choosing <strong>Doc House</strong><br>
                  Care Team
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f3f4f6; padding:12px 20px; text-align:center; color:#9ca3af; font-size:12px;">
                This is an automated email. Do not share this message with untrusted parties.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>

  </body>
  </html>
  `,
  };

  // -------------------------
  // Doctor Email Template
  // -------------------------
  const doctorEmail = {
    to: context.doctorEmail,
    subject: `New appointment booked: ${context.slotDate} ${slotStart} with ${context.patientName ?? 'patient'}`,
    html: `
  <html>
  <body style="margin:0; padding:0; background-color:#f7f7f9; font-family:Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" style="background:white; border-radius:10px; overflow:hidden; border:1px solid #e5e7eb;">

            <!-- Header -->
            <tr>
              <td style="background:#15803d; padding:18px 25px; color:white; font-size:20px; font-weight:600;">
                Doc House — New Appointment
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:25px; color:#333;">

                <p style="font-size:15px; margin:0 0 15px;">
                  Hello Dr. <strong>${doctorName}</strong>,
                </p>

                <p style="font-size:14px; margin-bottom:20px;">
                  A new appointment has been scheduled. Please review the booking details below.
                </p>

                <!-- Booking Details -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin:15px 0; border-collapse:collapse;">
                  <tr>
                    <td colspan="2" style="font-size:16px; font-weight:600; padding-bottom:8px; border-bottom:1px solid #e5e7eb;">
                      Booking Details
                    </td>
                  </tr>

                  <tr><td style="padding:10px 0; color:#6b7280;">Appointment ID</td><td style="padding:10px 0; color:#111827;">#${context.appointmentId}</td></tr>
                  <tr><td style="padding:6px 0; color:#6b7280;">Patient</td><td style="padding:6px 0; color:#111827;">${context.patientName ?? 'Patient'} (${context.patientEmail})</td></tr>
                  <tr><td style="padding:6px 0; color:#6b7280;">Location</td><td style="padding:6px 0; color:#111827;">${doctorAddress}</td></tr>
                  <tr><td style="padding:6px 0; color:#6b7280;">Service</td><td style="padding:6px 0; color:#111827;">${context.serviceName}</td></tr>
                  <tr><td style="padding:6px 0; color:#6b7280;">Date</td><td style="padding:6px 0; color:#111827;">${context.slotDate}</td></tr>
                  <tr><td style="padding:6px 0; color:#6b7280;">Time</td><td style="padding:6px 0; color:#111827;">${slotStart} – ${slotEnd}</td></tr>
                  <tr><td style="padding:6px 0; color:#6b7280;">Reason</td><td style="padding:6px 0; color:#111827;">${reason}</td></tr>
                  <tr><td style="padding:6px 0; color:#6b7280;">Patient Contact</td><td style="padding:6px 0; color:#111827;">${context.patientPhone ?? 'N/A'}</td></tr>
                </table>

                <p style="font-size:14px; margin-top:20px;">
                  Please ensure you review any relevant patient notes before the appointment.
                </p>

                <p style="font-size:14px;">
                  Thank you,<br>
                  <strong>Doc House Scheduling Team</strong>
                </p>

              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f3f4f6; padding:12px 20px; text-align:center; color:#9ca3af; font-size:12px;">
                This message contains confidential appointment information. Do not share it outside approved medical channels.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `,
  };

  return { patientEmail, doctorEmail };
}

export function buildAppointmentReminders(data) {
  return {
    patientReminder: {
      to: data.patientEmail,
      subject: "Reminder: Your Appointment is Coming Up",
      html: `
        <p>Hi ${data.patientName},</p>
        <p>This is a reminder for your appointment on 
        <strong>${data.slotDate}</strong> at <strong>${data.slotStart}</strong>.</p>
      `,
    },

    doctorReminder: {
      to: data.doctorEmail,
      subject: "Reminder: You Have an Appointment Tomorrow",
      html: `
        <p>Dear Dr. ${data.doctorName},</p>
        <p>You have an appointment scheduled with ${data.patientName} on 
        <strong>${data.slotDate}</strong> at <strong>${data.slotStart}</strong>.</p>
      `,
    },
  };
}

