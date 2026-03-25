import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { mkdir } from 'fs/promises'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Ensure upload directory exists
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (e) {
      // ignore if exists
    }

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const filename = file.name.replace(/\s/g, '-') // sanitize
    const finalName = `${uniqueSuffix}-${filename}`
    const filepath = join(uploadDir, finalName)

    await writeFile(filepath, buffer)

    // Return public URL
    const publicUrl = `/uploads/${finalName}`

    return NextResponse.json({ 
      url: publicUrl 
    })

  } catch (error) {
    console.error('Upload Error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
