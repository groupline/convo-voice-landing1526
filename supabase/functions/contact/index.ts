import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  captchaToken: string;
}

async function createBiginLead(formData: ContactFormData) {
  const biginApiKey = Deno.env.get('BIGIN_API_KEY');
  
  try {
    const response = await fetch('https://www.bigin.com/crm/private/json/Leads/insertRecords', {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${biginApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [{
          Last_Name: formData.name,
          Email: formData.email,
          Phone: formData.phone,
          Description: formData.message,
          Lead_Source: 'Website Contact Form'
        }]
      })
    });

    const data = await response.json();
    console.log('Bigin API Response:', data);
    
    if (!response.ok) {
      throw new Error(`Bigin API error: ${data.message || 'Unknown error'}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error creating Bigin lead:', error);
    throw error;
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const formData: ContactFormData = await req.json()
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown'

    // Verify reCAPTCHA token
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${Deno.env.get('captcha')}&response=${formData.captchaToken}`,
    })

    const recaptchaData = await recaptchaResponse.json()
    if (!recaptchaData.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid captcha' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Check rate limiting (3 submissions per email per hour)
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString()
    const { data: recentSubmissions } = await supabaseClient
      .from('contact_form_submissions')
      .select('created_at')
      .eq('email', formData.email)
      .gte('created_at', hourAgo)

    if (recentSubmissions && recentSubmissions.length >= 3) {
      return new Response(
        JSON.stringify({ error: 'Too many submissions. Please try again later.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 }
      )
    }

    // Store submission in Supabase
    const { error: insertError } = await supabaseClient
      .from('contact_form_submissions')
      .insert([
        {
          email: formData.email,
          ip_address: clientIP,
        }
      ])

    if (insertError) {
      console.error('Error inserting submission:', insertError)
      throw new Error('Failed to process submission')
    }

    // Create lead in Bigin CRM
    try {
      await createBiginLead(formData);
      console.log('Successfully created lead in Bigin CRM');
    } catch (biginError) {
      console.error('Failed to create lead in Bigin:', biginError);
      // We don't throw here to ensure the form submission is still recorded in Supabase
    }

    return new Response(
      JSON.stringify({ message: 'Form submitted successfully' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error processing form submission:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})