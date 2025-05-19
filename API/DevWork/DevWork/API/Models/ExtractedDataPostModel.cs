using DevWork.Core.Dto;
using DevWork.Core.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace DevWork.API.Models
{
    public class ExtractedDataPostModel
    {

        public int? Experience { get; set; }
        public string? WorkPlace { get; set; }
        public string? Languages { get; set; }
        public bool? RemoteWork { get; set; }
        public string? EnglishLevel { get; set; }

    }
}
