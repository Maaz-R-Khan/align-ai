import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';  // Changed import statement
import mammoth from 'mammoth';

// Disable the default body parser to handle form data with files
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse form data with formidable
  const form = new IncomingForm();
  form.keepExtensions = true;
  
  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    // Get the uploaded file
    const file = files.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = file.filepath;
    const fileExt = path.extname(file.originalFilename).toLowerCase();
    
    let text = '';
    
    // Parse file based on extension
    if (fileExt === '.pdf') {
      // Parse PDF
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdfParse(dataBuffer);  // Changed function call
      text = pdfData.text;
    } else if (fileExt === '.docx' || fileExt === '.doc') {
      // Parse Word document
      const result = await mammoth.extractRawText({
        path: filePath
      });
      text = result.value;
    } else {
      return res.status(400).json({ error: 'Unsupported file format' });
    }

    // Clean up temp file
    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      console.error('Error deleting temp file:', err);
      // Continue even if cleanup fails
    }

    // Return the parsed text
    return res.status(200).json({ text });
  } catch (error) {
    console.error('Error processing file:', error);
    return res.status(500).json({ error: 'Error processing file: ' + error.message });
  }
}