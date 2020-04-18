using System;
 using System.Collections.Generic;
 using System.Security.Claims;
 using System.Threading.Tasks;
 using AutoMapper;
 using PaymentApp.API.Data;
 using PaymentApp.API.Dtos;
 using PaymentApp.API.Helpers;
 using PaymentApp.API.Models;
 using Microsoft.AspNetCore.Authorization;
 using Microsoft.AspNetCore.Mvc;
 
namespace PaymentApp.API.Controllers
 {
    [AllowAnonymous]
     [Route("api/[controller]")]
     [ApiController]
     public class PaymentsController : ControllerBase
     {
         private readonly IDatingRepository _repo;
         private readonly IMapper _mapper;
         public PaymentsController(IDatingRepository repo, IMapper mapper)
         {
             _mapper = mapper;
             _repo = repo;             
         }

         [HttpGet("{id}", Name = "GetPayment")]
         public async Task<IActionResult> GetPayment(int id)
         {
              var paymentFromRepo = await _repo.GetPayment(id);

              if (paymentFromRepo == null)
                 return NotFound();

              return Ok(paymentFromRepo);
         }

         [HttpGet(Name = "GetPayments")]
         public async Task<IActionResult> GetPayments([FromQuery]PaymentParams paymentsParams)
         {
              var paymentsFromRepo = await _repo.GetPayments(paymentsParams);

              var payments = _mapper.Map<IEnumerable<PaymentForReturnDto>>(paymentsFromRepo);              
              
                Response.AddPagination(paymentsFromRepo.CurrentPage, paymentsFromRepo.PageSize, 
                 paymentsFromRepo.TotalCount, paymentsFromRepo.TotalPages);
              
              return Ok(payments);
         }

          [HttpPost]
         public async Task<IActionResult> CreatePayment(PaymentForRegisterDto paymentForCreationDto)
         {
             var payment = _mapper.Map<Payment>(paymentForCreationDto);

              _repo.Add(payment);

              if (await _repo.SaveAll())
             {
                 var paymentForReturnDto = _mapper.Map<PaymentForReturnDto>(payment);

                 return Ok(paymentForReturnDto);
                 //return CreatedAtRoute("GetPayments",paymentForReturnDto);
             }

              throw new Exception("Creating the payment failed on save");
         }
      [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePayment(int id, PaymentForUpdateDto paymentForUpdateDto)
        {
            var paymentFromRepo = await _repo.GetPayment(id);

            _mapper.Map(paymentForUpdateDto, paymentFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating payment {id} failed on save");
        }         
     }
 } 