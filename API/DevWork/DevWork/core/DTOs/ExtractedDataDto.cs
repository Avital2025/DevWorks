using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DevWork.Core.Dto
{
    public class ExtractedDataDto
    {

        public string Title { get; set; }       
        public string DisplayName { get; set; }       
        public string Description { get; set; }         
        public string EmployerEmail { get; set; }         
        public int  EmployerID { get; set; }         
        public string EnglishLevel { get; set; }          
        public int? Experience { get; set; }              
        public string Languages { get; set; }           
        public bool? RemoteWork { get; set; }            
        public string WorkPlace { get; set; }           
    }
}

