"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, Trash2, Loader2 } from "lucide-react";
import type { StoredFile } from "@/lib/types";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Mock functions for interacting with Firebase Storage
async function mockUploadFile(file: File): Promise<StoredFile> {
  console.log("Uploading file:", file.name);
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    name: file.name,
    path: `documents/${file.name}`,
    downloadUrl: URL.createObjectURL(file), // Not a real URL, for mock purposes
    size: file.size,
    uploadedAt: new Date().toISOString(),
  };
}

async function mockDeleteFile(filePath: string): Promise<void> {
  console.log("Deleting file:", filePath);
  await new Promise(resolve => setTimeout(resolve, 500));
}

export default function DocumentsPage() {
  const [files, setFiles] = useState<StoredFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({ title: "No file selected", description: "Please choose a file to upload.", variant: "destructive" });
      return;
    }
    setIsUploading(true);
    try {
      const newFile = await mockUploadFile(selectedFile);
      setFiles(prev => [...prev, newFile]);
      setSelectedFile(null);
      toast({ title: "Upload successful", description: `"${newFile.name}" has been uploaded.` });
    } catch (error) {
      toast({ title: "Upload failed", description: "Could not upload the file. Please try again.", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (file: StoredFile) => {
    setIsDeleting(file.path);
    try {
      await mockDeleteFile(file.path);
      setFiles(prev => prev.filter(f => f.path !== file.path));
      toast({ title: "File deleted", description: `"${file.name}" has been removed.` });
    } catch (error) {
      toast({ title: "Deletion failed", description: "Could not delete the file. Please try again.", variant: "destructive" });
    } finally {
      setIsDeleting(null);
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Upload Document</CardTitle>
          <CardDescription>Securely upload and store company documents.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Input type="file" onChange={handleFileChange} className="max-w-xs"/>
          <Button onClick={handleUpload} disabled={!selectedFile || isUploading}>
            {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
            Upload File
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Stored Documents</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Uploaded At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {files.length > 0 ? files.map((file) => (
                    <TableRow key={file.path}>
                    <TableCell className="font-medium">{file.name}</TableCell>
                    <TableCell>{formatBytes(file.size)}</TableCell>
                    <TableCell>{format(new Date(file.uploadedAt), "MMM dd, yyyy p")}</TableCell>
                    <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" asChild>
                            <a href={file.downloadUrl} download={file.name}>
                                <Download className="h-4 w-4" />
                            </a>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(file)} disabled={isDeleting === file.path}>
                        {isDeleting === file.path ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4 text-destructive" />}
                        </Button>
                    </TableCell>
                    </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">No documents uploaded yet.</TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </div>
        </CardContent>
      </Card>
    </div>
  );
}
