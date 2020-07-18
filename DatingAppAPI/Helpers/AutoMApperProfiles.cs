﻿using AutoMapper;
using DatingAppAPI.Dtos;
using DatingAppAPI.Models;
using System.Linq;

namespace DatingAppAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
                  {
                      opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                  })
                  .ForMember(dest => dest.Age, opt =>
                    {
                        opt.MapFrom((src, d) => src.DateOfBirth.CalculateAge());
                    });

            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt =>
            {
                opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
            })
                  .ForMember(dest => dest.Age, opt =>
                  {
                      opt.MapFrom((src, d) => src.DateOfBirth.CalculateAge());
                  }); ;
            CreateMap<Photo, PhotoForDetailedDto>();
        }
    }
}