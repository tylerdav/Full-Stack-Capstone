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
    public class CategoryController : ControllerBase
    {
        private readonly CategoryRepository _categoryRepository;
        public CategoryController(ApplicationDbContext context)
        {
            _categoryRepository = new CategoryRepository(context);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryRepository.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }
    }
}
