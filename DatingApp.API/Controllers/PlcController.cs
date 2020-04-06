using System;
using System.Linq;
 using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.SignalR;
using DatingApp.API.Hubs;

namespace DatingApp.API.Controllers
{
    [AllowAnonymous]
    [Route("api/plcs")]
    [ApiController]
    public class PlcController : ControllerBase
    {
        private readonly IDatingRepository _repo;
        private readonly IMapper _mapper;
         private readonly IHubContext<SignalHub> _hubContext;
        public PlcController(IDatingRepository repo, IMapper mapper , IHubContext<SignalHub> hubContext)
        {
            _mapper = mapper;
            _repo = repo;
            _hubContext = hubContext;
        }           

        [HttpGet(Name = "GetPlcs")]
         public async Task<IActionResult> GetPlcs([FromQuery]PlcParams plcsParams)
         {
              var plcsFromRepo = await _repo.GetPlcs(plcsParams);

              var plcs = _mapper.Map<IEnumerable<PlcForReturnDto>>(plcsFromRepo);              
              
                Response.AddPagination(plcsFromRepo.CurrentPage, plcsFromRepo.PageSize, 
                 plcsFromRepo.TotalCount, plcsFromRepo.TotalPages);
              
              return Ok(plcs);
         }


        [HttpGet("{DeviceId}")]
        public async Task<IActionResult> GetPlc(int DeviceId)
        {
            var plcFromRepo = await _repo.GetPlcForDevice(DeviceId);            

            return Ok(plcFromRepo);
        }
        
        [HttpPost]
        public async Task<IActionResult> AddPlcRegister(PlcForCreationDto plcForCreationDto)
        {
            var plc = _mapper.Map<Plc>(plcForCreationDto);

                _repo.Add(plc);

            if (await _repo.SaveAll())
             {
                 var plcToReturn = _mapper.Map<PlcForReturnDto>(plc);

                 await _hubContext.Clients.All.SendAsync("SignalMessageReceived", plcToReturn);

                 return Ok(plcToReturn);
             };

              throw new Exception("Creating the plc failed on save");
            
        }
    }
}