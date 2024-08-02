import { useState } from "react"
import { Download, Upload } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import JSZip from 'jszip'
import Navbar from "../nav"

export function Page() {
  console.log('Page component rendered')
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File selection changed')
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
      console.log('File set:', event.target.files[0].name)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('Form submitted')
    event.preventDefault()
    if (!file) {
      console.log('No file selected')
      return
    }

    const formData = new FormData()
    formData.append('file', file)
    console.log('FormData created with file')

    try {
      console.log('Sending request to server')
      const response = await fetch('http://localhost:5000/process_xvg', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        console.log('Server response OK')
        const blob = await response.blob()
        const zipUrl = URL.createObjectURL(blob)
        console.log('Zip URL created:', zipUrl)
        
        // Trigger download of the zip file
        const a = document.createElement('a')
        a.href = zipUrl
        a.download = 'output.zip'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        console.log('Zip file download triggered')

        // Extract and display the image
        console.log('Extracting image from zip')
        const zip = new JSZip()
        const contents = await zip.loadAsync(blob)
        const imageFiles = contents.file(/.*\.png/)
        if (imageFiles && imageFiles[0]) {
          console.log('Image file found in zip')
          const imageBlob = await imageFiles[0].async('blob')
          const imageObjectUrl = URL.createObjectURL(imageBlob)
          setImageUrl(imageObjectUrl)
          console.log('Image URL set:', imageObjectUrl)
        } else {
          console.log('No image file found in zip')
        }
      } else {
        console.error('Error processing XVG file:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="max-w-md w-full px-4 md:px-0">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-primary">xvg-online</h1>
          <p className="mt-4 text-muted-foreground mb-2">A simple tool to visualize and export your 'xvg' files.</p>
        </div>
        <div className="mt-4 bg-card rounded-lg shadow-lg p-6">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="file">Upload your 'xvg' file</Label>
              <Input type="file" id="file" onChange={handleFileChange} />
            </div>
            <Button type="submit" variant="secondary">
              <Upload className="w-4 h-4 mr-2" />
              Process XVG File
            </Button>
          </form>
        </div>
        {imageUrl && (
          <div className="mt-6">
            <img src={imageUrl} alt="Processed XVG visualization" className="w-full rounded-lg shadow-lg" />
          </div>
        )}
      </div>
      <Navbar/>
    </div>
  )
}