using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Dtos
{
    public class PlcForCreationDto
    {
    
        public int DeviceId { get; set; }        

        public string Campo1 { get; set; }

        public string Campo2 { get; set; }

        public string Campo3 { get; set; }

        public string Campo4 { get; set; }

        public string Campo5 { get; set; }

        public string Campo6 { get; set; }

        public DateTime DateAdded { get; set; }
        public PlcForCreationDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}