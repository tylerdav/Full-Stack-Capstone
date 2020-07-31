using Microsoft.EntityFrameworkCore;
using MyPantry.Data;
using MyPantry.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyPantry.Repositories
{
    public class RecipeFoodRepository
    {
        private readonly ApplicationDbContext _context;

        public RecipeFoodRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<RecipeFood> GetAll()
        {
            return _context.RecipeFood
                .Include(recipeFood => recipeFood.Recipe)
                .Include(recipeFood => recipeFood.Food)
                .Include(recipeFood => recipeFood.Food).ToList();
        }

        public RecipeFood GetByRecipeFoodId(int id)
        {
            return _context.RecipeFood
                .Include(recipeFood => recipeFood.Recipe)
                .Include(recipeFood => recipeFood.Food)
                .FirstOrDefault(recipeFood => recipeFood.Id == id);
        }

        public List<RecipeFood> GetRecipeFoodByRecipeId(int id)
        {
            return _context.RecipeFood
                .Include(recipeFood => recipeFood.Recipe)
                .Include(recipeFood => recipeFood.Food)
                .Where(recipeFood => recipeFood.RecipeId == id)
                .ToList();

        }


        public void Add(RecipeFood recipeFood)
        {
            _context.Add(recipeFood);
            _context.SaveChanges();
        }

        public void Update(RecipeFood recipeFood)
        {
            _context.Entry(recipeFood).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var recipeFood = GetByRecipeFoodId(id);
            _context.RecipeFood.Remove(recipeFood);
            _context.SaveChanges();
        }
    }
}
