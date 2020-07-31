using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyPantry.Data;
using MyPantry.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyPantry.Repositories
{
    public class FoodPantryRepository
    {
        private readonly ApplicationDbContext _context;

        public FoodPantryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<FoodPantry> GetAll()
        {
            return _context.FoodPantry
                .Include(fp => fp.Food)
                .ToList();
        }

        public FoodPantry GetByFoodPantryId(int id)
        {   
            return _context.FoodPantry
                .Include(fp => fp.Food)
                .FirstOrDefault(fp => fp.Id == id);
        }

        public List<FoodPantry> GetFoodPantryByUserProfileId(int id)
        {
            return _context.FoodPantry
                .Include(fp => fp.Food)
                .Where(fp => fp.UserProfileId == id)
                .ToList();
        }

        public void Add(FoodPantry foodPantry)
        {
            _context.Add(foodPantry);
            _context.SaveChanges();
        }

        public void Update(FoodPantry foodPantry)
        {
            _context.Entry(foodPantry).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var foodPantry = GetByFoodPantryId(id);
            _context.FoodPantry.Remove(foodPantry);
            _context.SaveChanges();
        }
    }
}
