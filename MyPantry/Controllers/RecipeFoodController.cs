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
    public class RecipeFoodController : ControllerBase
    {
        private readonly RecipeFoodRepository _recipeFoodRepository;

        public RecipeFoodController(ApplicationDbContext context)
        {
            _recipeFoodRepository = new RecipeFoodRepository(context);

        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_recipeFoodRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var recipeFood = _recipeFoodRepository.GetByRecipeFoodId(id);
            if (recipeFood != null)
            {
                NotFound();
            }
            return Ok(recipeFood);
        }

        [HttpGet("Recipe/{id}")]
        public IActionResult GetByRecipe(int id)
        {
            var recipeFood = _recipeFoodRepository.GetRecipeFoodByRecipeId(id);
            if (recipeFood != null)
            {
                NotFound();
            }
            return Ok(recipeFood);
        }

        [HttpPost]
        public IActionResult RecipeFood(RecipeFood recipeFood)
        {
            _recipeFoodRepository.Add(recipeFood);
            return CreatedAtAction("Get", new { id = recipeFood.Id }, recipeFood);
        }

        [HttpPut("{id}")]
        public IActionResult EditPostReaction(RecipeFood recipeFood)
        {

            _recipeFoodRepository.Update(recipeFood);
            return Ok(recipeFood);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _recipeFoodRepository.Delete(id);
            return NoContent();
        }
    }
}
