using AutoMapper;
using DevWork.API.Models;
using DevWork.Core.Dto;
using DevWork.Core.Entities;

namespace DevWork.core
{
    public  class MappingProfile : Profile 
    {
        public MappingProfile()
        {
            CreateMap<UserDto, UserEntity>().ReverseMap();
            CreateMap<FilesDto, FilesEntity>().ReverseMap();
            CreateMap<ExtractedDataDto, ExtractedDataEntity>().ReverseMap();

            CreateMap<UserPostModel, UserEntity>().ReverseMap();
            CreateMap<FilesPostModel, FilesEntity>().ReverseMap();
            CreateMap<ExtractedDataPostModel, ExtractedDataEntity>().ReverseMap();
        }

    }
}

