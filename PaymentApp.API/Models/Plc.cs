using System;

namespace PaymentApp.API.Models
{
    public class Plc
    {
        public int Id { get; set; }
        public int DeviceId { get; set; }        

        public string Campo1 { get; set; }

        public string Campo2 { get; set; }

        public string Campo3 { get; set; }

        public string Campo4 { get; set; }

        public string Campo5 { get; set; }

        public string Campo6 { get; set; }

        public DateTime DateAdded { get; set; }
    }
}