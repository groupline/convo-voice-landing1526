import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const predefinedResponses = {
  greeting: [
    "Hello! How can I help you today?",
    "Hi there! What can I assist you with?",
    "Hey! What's on your mind?",
  ],
  default: [
    "That's interesting! Tell me more.",
    "I understand. How can I help with that?",
    "I see. What would you like to know about that?",
    "Thanks for sharing. Is there anything specific you'd like to discuss?",
  ],
  farewell: [
    "Goodbye! Have a great day!",
    "Take care! Feel free to come back if you need anything.",
    "See you later! Don't hesitate to reach out again.",
  ],
};

function getRandomResponse(type: keyof typeof predefinedResponses): string {
  const responses = predefinedResponses[type];
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

function generateResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return getRandomResponse('greeting');
  }
  
  if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
    return getRandomResponse('farewell');
  }
  
  return getRandomResponse('default');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];
    
    console.log('Received message:', lastMessage.content);
    
    const generatedText = generateResponse(lastMessage.content);
    
    console.log('Generated response:', generatedText);

    return new Response(
      JSON.stringify({ generatedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});