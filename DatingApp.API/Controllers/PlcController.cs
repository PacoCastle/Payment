using System;
using System.Linq;
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

        [HttpGet]
        public async Task<IActionResult> GetPlcs()
        {
            var plcsFromRepo = await _repo.GetPlcs();

            return Ok(plcsFromRepo);
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

                 return CreatedAtAction("GetPhoto", new {id = plc.Id}, plcToReturn);
             };

              throw new Exception("Creating the plc failed on save");
            
        }
    }
}