using System;
using Microsoft.AspNetCore.Http;

namespace PaymentApp.API.Dtos
{
    public class PaymentForRegisterDto
    {
    
        public string Name { get; set; }    

        public string Description { get; set; }        

        public int Amount { get; set; }        

        public DateTime DateAdded { get; set; }
        
        public PaymentForRegisterDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}