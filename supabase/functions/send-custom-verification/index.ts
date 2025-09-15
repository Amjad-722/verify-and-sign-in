import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VerificationRequest {
  email: string
  token: string
  baseUrl: string
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, token, baseUrl }: VerificationRequest = await req.json()

    const confirmUrl = `${baseUrl}/verify/confirm?token=${token}&email=${encodeURIComponent(email)}`
    const denyUrl = `${baseUrl}/verify/deny?email=${encodeURIComponent(email)}`

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 40px 30px; }
            .button { display: inline-block; padding: 14px 28px; margin: 10px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 16px; transition: all 0.2s; }
            .btn-confirm { background-color: #10b981; color: white; }
            .btn-confirm:hover { background-color: #059669; }
            .btn-deny { background-color: #ef4444; color: white; }
            .btn-deny:hover { background-color: #dc2626; }
            .footer { padding: 20px 30px; background-color: #f8fafc; border-radius: 0 0 8px 8px; text-align: center; font-size: 14px; color: #64748b; }
          </style>
        </head>
        <body>
          <div style="padding: 40px 20px;">
            <div class="container">
              <div class="header">
                <h1 style="margin: 0; font-size: 28px;">Email Verification</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Verify your email address to continue</p>
              </div>
              
              <div class="content">
                <h2 style="color: #1f2937; margin-bottom: 20px;">Hi there!</h2>
                <p style="color: #4b5563; line-height: 1.6; margin-bottom: 30px;">
                  We received a request to create an account with this email address: <strong>${email}</strong>
                </p>
                <p style="color: #4b5563; line-height: 1.6; margin-bottom: 30px;">
                  Please confirm if this was you by clicking one of the buttons below:
                </p>
                
                <div style="text-align: center; margin: 40px 0;">
                  <a href="${confirmUrl}" class="button btn-confirm">✓ Yes, it's me</a>
                  <a href="${denyUrl}" class="button btn-deny">✗ No, it's not me</a>
                </div>
                
                <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin-top: 30px;">
                  <p style="color: #6b7280; font-size: 14px; margin: 0; line-height: 1.5;">
                    If you didn't request this verification, you can safely ignore this email or click "No, it's not me" to report it.
                  </p>
                </div>
              </div>
              
              <div class="footer">
                <p style="margin: 0;">This email was sent to ${email}</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'noreply@yourdomain.com',
        to: [email],
        subject: 'Verify your email address',
        html,
      }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Resend API error: ${res.status} ${errorText}`)
    }

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error sending verification email:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})