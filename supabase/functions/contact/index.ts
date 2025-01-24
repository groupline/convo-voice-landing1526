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
  const biginOAuthToken = Deno.env.get('Bigin01');
  
  try {
    console.log('Attempting to create lead in Bigin CRM with token:', biginOAuthToken ? 'Token exists' : 'No token found');
    
    if (!biginOAuthToken) {
      throw new Error('Bigin OAuth token not configured');
    }
    
    const response = await fetch('https://www.zohoapis.com/bigin/v2/Leads', {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${biginOAuthToken}`,
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
    console.log('Bigin API Raw Response:', JSON.stringify(data));
    
    if (!response.ok) {
      console.error('Bigin API error status:', response.status);
      console.error('Bigin API error details:', data);
      throw new Error(`Bigin API error: ${data.message || 'Unknown error'}`);
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error creating Bigin lead:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    console.log('Processing new form submission');
    const formData: ContactFormData = await req.json();
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';

    // Verify reCAPTCHA token
    console.log('Verifying reCAPTCHA token');
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${Deno.env.get('captcha')}&response=${formData.captchaToken}`,
    });

    const recaptchaData = await recaptchaResponse.json();
    console.log('reCAPTCHA verification result:', recaptchaData);
    
    if (!recaptchaData.success) {
      console.error('reCAPTCHA verification failed:', recaptchaData);
      return new Response(
        JSON.stringify({ error: 'Invalid captcha' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Check rate limiting (3 submissions per email per hour)
    console.log('Checking rate limiting for email:', formData.email);
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: recentSubmissions, error: rateLimitError } = await supabaseClient
      .from('contact_form_submissions')
      .select('created_at')
      .eq('email', formData.email)
      .gte('created_at', hourAgo);

    if (rateLimitError) {
      console.error('Error checking rate limit:', rateLimitError);
      throw new Error('Failed to check submission rate limit');
    }

    if (recentSubmissions && recentSubmissions.length >= 3) {
      console.warn('Rate limit exceeded for email:', formData.email);
      return new Response(
        JSON.stringify({ error: 'Too many submissions. Please try again later.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 }
      );
    }

    // Store submission in Supabase
    console.log('Storing submission in Supabase');
    const { error: insertError } = await supabaseClient
      .from('contact_form_submissions')
      .insert([
        {
          email: formData.email,
          ip_address: clientIP,
        }
      ]);

    if (insertError) {
      console.error('Error inserting submission:', insertError);
      throw new Error('Failed to process submission');
    }

    // Create lead in Bigin CRM
    console.log('Attempting to create lead in Bigin CRM');
    const biginResult = await createBiginLead(formData);
    console.log('Bigin lead creation result:', biginResult);

    return new Response(
      JSON.stringify({ 
        message: 'Form submitted successfully',
        biginStatus: biginResult.success ? 'success' : 'error',
        biginError: biginResult.success ? null : biginResult.error
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing form submission:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});