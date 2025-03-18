using DevWork.Core.Entities;
namespace DevWork.Service.Iservice
{
    public interface IAIService
    {


        //Task<ProjectAnalysisResult> ParseProjectDescription(string description);
       // Task SaveProjectDescriptionToDB(string description, int projectId)
         Task<AIResponse> SaveProjectDescriptionToDB(string fileText);
    }


}
