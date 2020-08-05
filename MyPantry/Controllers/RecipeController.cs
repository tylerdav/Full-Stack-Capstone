using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
    public class RecipeController : ControllerBase
    {
        private readonly RecipeRepository _recipeRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public RecipeController(ApplicationDbContext context)
        {
            _recipeRepository = new RecipeRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_recipeRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var userProfile = GetCurrentUserProfile();
            var recipe = _recipeRepository.GetById(id);
            if (recipe == null || recipe.UserProfileId != userProfile.Id)
            {
                return NotFound();
            }
            return Ok(recipe);
        }

        [HttpGet("getbyuser/{id}")]
        public IActionResult GetByUser(int id)
        {
            return Ok(_recipeRepository.GetByUserProfileId(id));
        }

        [HttpPost]
        public IActionResult Recipe(Recipe recipe)
        {
            _recipeRepository.Add(recipe);
            return CreatedAtAction("Get", new { id = recipe.Id }, recipe);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Recipe recipe)
        {
            if (id != recipe.Id)
            {
                return BadRequest();
            }

            _recipeRepository.Update(recipe);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetCurrentUserProfile();
            var recipe = _recipeRepository.GetById(id);
            if (user.Id != recipe.UserProfileId)
            {
                return Forbid();
            }

            _recipeRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
