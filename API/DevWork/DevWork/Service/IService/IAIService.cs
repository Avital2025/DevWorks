using DevWork.Core.Entities;
using DevWork.Data;
namespace DevWork.Service.Iservice
{
    public interface IAIService
    {



        Task<AIResponse> SaveProjectDescriptionToDB(string fileText);


    }


}
