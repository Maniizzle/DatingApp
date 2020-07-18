using DatingAppAPI.Models;
using DatingAppAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace DatingAppAPI.Controllers
{
    [ApiController]
    [Route("api/values")]
    // [Authorize]
    public class ValueController : ControllerBase
    {
        private readonly IEntityRepository<Value> repository;

        public ValueController(IEntityRepository<Value> repository)
        {
            this.repository = repository;
        }

        [HttpGet]
        // [ProducesResponseType(200)]
        public async Task<IActionResult> Get()
        {
            var values = await repository.GetAll();
            return Ok(values);
        }

        [HttpGet("{id}")]
        public IActionResult GetValue(int? id)
        {
            var value = repository.GetOne(c => c.Id == id);
            return Ok(value);
        }
    }
}