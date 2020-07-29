﻿using MyPantry.Data;
using MyPantry.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyPantry.Repositories
{
    public class FoodRepository
    {
        private readonly ApplicationDbContext _context;

        public FoodRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Food> GetAll()
        {
            return _context.Food.OrderBy(c => c.Name).ToList();
        }

        public Food GetById(int id)
        {
            return _context.Food.FirstOrDefault(c => c.Id == id);
        }
    }
}
