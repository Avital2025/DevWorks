using DevWork.Core.Entities;

namespace DevWork.Service.IService
{
    public interface IDataExtractor
    {

        //Task<ExtractedDataEntity> ExtractData(byte[] fileData, int employerId);
        Task<ExtractedDataEntity> ExtractData(byte[] fileData, int employerId, AIResponse aiResponse, String projectName);
    }
}
