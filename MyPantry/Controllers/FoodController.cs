using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyPantry.Data;
using MyPantry.Repositories;

namespace MyPantry.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodController : ControllerBase
    {
        private readonly FoodRepository _foodRepository;
        public FoodController(ApplicationDbContext context)
        {
            _foodRepository = new FoodRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_foodRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _foodRepository.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpGet("search")]
        public IActionResult Search(string q)
        {
            if (string.IsNullOrEmpty(q))
            {
                return Ok(_foodRepository.GetAll());
            }

            return Ok(_foodRepository.Search(q));
        }
    }
}
