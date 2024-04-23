import sharp from "sharp";
const fs = require('fs');
const path = require('path');



export async function POST(request: Request) {

  const data = await request.arrayBuffer();
  const jsonData = JSON.parse(Buffer.from(data).toString());
  

  return new Response(Buffer.from(data).toString());
}
