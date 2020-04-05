using System;
 using System.Collections.Generic;
 using System.Security.Claims;
 using System.Threading.Tasks;
 using AutoMapper;
 using DatingApp.API.Data;
 using DatingApp.API.Dtos;
 using DatingApp.API.Helpers;
 using DatingApp.API.Models;
 using Microsoft.AspNetCore.Authorization;
 using Microsoft.AspNetCore.Mvc;
 
namespace DatingApp.API.Controllers
 {
    [AllowAnonymous]
     [Route("api/[controller]")]
     [ApiController]
     public class ProductsController : ControllerBase
     {
         private readonly IDatingRepository _repo;
         private readonly IMapper _mapper;
         public ProductsController(IDatingRepository repo, IMapper mapper)
         {
             _mapper = mapper;
             _repo = repo;             
         }

         [HttpGet("{id}", Name = "GetProduct")]
         public async Task<IActionResult> GetProduct(int id)
         {
              var productFromRepo = await _repo.GetProduct(id);

              if (productFromRepo == null)
                 return NotFound();

              return Ok(productFromRepo);
         }

         [HttpGet(Name = "GetProducts")]
         public async Task<IActionResult> GetProducts([FromQuery]ProductParams productsParams)
         {
              var productsFromRepo = await _repo.GetProducts(productsParams);

              var products = _mapper.Map<IEnumerable<ProductForReturnDto>>(productsFromRepo);              
              
                Response.AddPagination(productsFromRepo.CurrentPage, productsFromRepo.PageSize, 
                 productsFromRepo.TotalCount, productsFromRepo.TotalPages);
              
              return Ok(products);
         }

          [HttpPost]
         public async Task<IActionResult> CreateProduct(ProductForRegisterDto productForCreationDto)
         {
             var product = _mapper.Map<Product>(productForCreationDto);

              _repo.Add(product);

              if (await _repo.SaveAll())
             {
                 var productForReturnDto = _mapper.Map<ProductForReturnDto>(product);

                 return Ok(productForReturnDto);
                 //return CreatedAtRoute("GetProducts",productForReturnDto);
             }

              throw new Exception("Creating the product failed on save");
         }
      [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductForUpdateDto productForUpdateDto)
        {
            var productFromRepo = await _repo.GetProduct(id);

            _mapper.Map(productForUpdateDto, productFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating product {id} failed on save");
        }         
     }
 } 