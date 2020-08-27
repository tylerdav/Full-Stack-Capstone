using Microsoft.EntityFrameworkCore;
using MyPantry.Data;
using MyPantry.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyPantry.Repositories
{
    public class RecipeRepository
    {
        private readonly ApplicationDbContext _context;

        public RecipeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Recipe> GetAll()
        {
            return _context.Recipe
                .Include(r => r.UserProfile)
                .Include(r => r.Category)
                .Include(r => r.RecipeFood)
                .OrderBy(r => r.Title)
                .ToList();

        }

        public Recipe GetById(int id)
        {
            return _context.Recipe
                    .Include(r => r.UserProfile)
                    .Include(r => r.Category)
                    .Include(r => r.RecipeFood)
                    .ThenInclude(rf => rf.Food)
                    .FirstOrDefault(r => r.Id == id);
        }

        public List<Recipe> GetByUserProfileId(int id)
        {
            return _context.Recipe.Include(r => r.UserProfile)
                            .Include(r => r.Category)
                            .Where(r => r.UserProfileId == id)
                            .ToList();
        }

        public void Add(Recipe recipe)
        {
            _context.Add(recipe);
            _context.SaveChanges();
        }

        public void Update(Recipe recipe)
        {
            _context.Entry(recipe).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var recipe = GetById(id);
            _context.Recipe.Remove(recipe);
            _context.SaveChanges();
        }


    }
}
