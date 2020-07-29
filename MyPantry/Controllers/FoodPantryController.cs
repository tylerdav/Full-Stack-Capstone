using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyPantry.Data;
using MyPantry.Models;
using MyPantry.Repositories;

namespace MyPantry.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodPantryController : ControllerBase
    {
        private readonly FoodPantryRepository _foodPantryRepository;

        public FoodPantryController(ApplicationDbContext context)
        {
            _foodPantryRepository = new FoodPantryRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_foodPantryRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var foodPantry = _foodPantryRepository.GetByFoodPantryId(id);
            if (foodPantry != null)
            {
                NotFound();
            }
            return Ok(foodPantry);
        }

        [HttpGet("Recipe/{id}")]
        public IActionResult GetByUserProfile(int id)
        {
            var foodPantry = _foodPantryRepository.GetFoodPantryByUserProfileId(id);
            if (foodPantry != null)
            {
                NotFound();
            }
            return Ok(foodPantry);
        }

        [HttpPost]
        public IActionResult FoodPantry(FoodPantry foodPantry)
        {
            _foodPantryRepository.Add(foodPantry);
            return CreatedAtAction("Get", new { id = foodPantry.Id }, foodPantry);
        }

        [HttpPut("{id}")]
        public IActionResult EditFoodPantry(FoodPantry foodPantry)
        {
            _foodPantryRepository.Update(foodPantry);
            return Ok(foodPantry);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _foodPantryRepository.Delete(id);
            return NoContent();
        }
    }
}
