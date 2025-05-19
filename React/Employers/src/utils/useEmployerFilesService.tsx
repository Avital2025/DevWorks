import axiosInstance from "../axiosInstance"
import type { FileType } from "../types/fileType"

export function useEmployerFileService() {
  const employerId = typeof window !== "undefined" ? localStorage.getItem("EmployerId") || "0" : "0"

  const fetchFiles = async (): Promise<FileType[]> => {
    const response = await axiosInstance.get("/files")
    return Array.isArray(response.data) ? response.data : []
  }

  const deleteFile = async (fileId: string) => {
    await axiosInstance.put(`/files/${fileId}/mark-deleted`)
  }

  const renameFile = async (fileId: string, newFileName: string) => {
    await axiosInstance.put(`/files/${fileId}/rename`, { newFileName })
  }

  const checkFileExists = async (fileName: string): Promise<boolean> => {
    const response = await axiosInstance.get("/files/check-file-exists", {
      params: { fileName, employerId },
    })
    return response.data.exists
  }

  const generateDownloadUrl = async (fileName: string): Promise<string> => {
    const response = await axiosInstance.get("/files/generate-presigned-download-url", {
      params: { fileName },
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
