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
    public class FoodPantryController : ControllerBase
    {
        private readonly FoodPantryRepository _foodPantryRepository;
        private readonly UserProfileRepository _userProfileRepository;

        public FoodPantryController(ApplicationDbContext context)
        {
            _foodPantryRepository = new FoodPantryRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
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

        [HttpGet("mypantry")]
        public IActionResult GetByUserProfile()
        {
            var userProfile = GetCurrentUserProfile();
            var foodPantry = _foodPantryRepository.GetFoodPantryByUserProfileId(userProfile.Id);
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

        //[HttpPut("{id}")]
        //public IActionResult EditFoodPantry(FoodPantry foodPantry)
        //{
        //    _foodPantryRepository.Update(foodPantry);
        //    return Ok(foodPantry);
        //}

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var userProfile = GetCurrentUserProfile();
            var foodPantry = _foodPantryRepository.GetByFoodPantryId(id);
            if (userProfile.Id != foodPantry.UserProfileId)
            {
                return Forbid();
            }
            _foodPantryRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
