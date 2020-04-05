using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Dtos
{
    public class ProductForRegisterDto
    {
    
        public string Name { get; set; }    

        public string Description { get; set; }        

        public int Status { get; set; }        

        public string urlPhoto { get; set; }   

        public DateTime DateAdded { get; set; }
        
        public ProductForRegisterDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}