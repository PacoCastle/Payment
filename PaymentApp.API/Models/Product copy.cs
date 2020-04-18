using System;

namespace PaymentApp.API.Models
{
    public class Payment
    {
        public int Id { get; set; }

        public string Name { get; set; }    

        public string Description { get; set; }

        public DateTime DateAdded { get; set; }

        public int amount { get; set; } 
    }
}