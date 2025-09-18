import { NextRequest, NextResponse } from 'next/server';

// Simple message store for demonstration (in production, use a database or external service)
let messages: Array<{ text: string; senderId: string; timestamp: string }> = [];

export async function GET(request: NextRequest) {
  // Return current messages and server status
  return NextResponse.json({ 
    message: 'Socket.IO endpoint is available',
    path: '/api/socketio',
    status: 'active',
    totalMessages: messages.length,
    recentMessages: messages.slice(-5) // Last 5 messages
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newMessage = {
      text: `Echo: ${body.text}`,
      senderId: 'system',
      timestamp: new Date().toISOString(),
    };
    
    // Store the message
    messages.push(newMessage);
    
    // Keep only last 100 messages to avoid memory issues
    if (messages.length > 100) {
      messages = messages.slice(-100);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message processed',
      echo: newMessage
    });
  } catch (error) {
    console.error('Socket.IO API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Invalid JSON or processing error' 
    }, { status: 400 });
  }
}

// Handle WebSocket upgrade attempts (though Vercel doesn't support persistent connections)
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}