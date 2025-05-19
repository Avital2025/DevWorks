// utils/useEmployerFileService.ts
import axios from "axios"
import type { FileType } from "../types/fileType"

export function useEmployerFileService() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
  const employerId = typeof window !== "undefined" ? localStorage.getItem("EmployerId") || "0" : "0"

  const headers = {
    Authorization: `Bearer ${token}`,
  }

  const fetchFiles = async (): Promise<FileType[]> => {
    const response = await axios.get("http://localhost:5069/files", { headers })
    return Array.isArray(response.data) ? response.data : []
  }

  const deleteFile = async (fileId: string) => {
    await axios.put(`http://localhost:5069/files/${fileId}/mark-deleted`, {}, { headers })
  }

  const renameFile = async (fileId: string, newFileName: string) => {
    await axios.put(
      `http://localhost:5069/files/${fileId}/rename`,
      { newFileName },
      { headers }
    )
  }

  const checkFileExists = async (fileName: string): Promise<boolean> => {
    const response = await axios.get("http://localhost:5069/files/check-file-exists", {
      params: { fileName, employerId },
      headers,
    })
    return response.data.exists
  }

  const generateDownloadUrl = async (fileName: string): Promise<string> => {
    const response = await axios.get("http://localhost:5069/files/generate-presigned-download-url", {
      params: { fileName },
      headers,
    })
    return response.data.url
  }

  return {
    fetchFiles,
    deleteFile,
    renameFile,
    checkFileExists,
    generateDownloadUrl,
    employerId,
  }
}
