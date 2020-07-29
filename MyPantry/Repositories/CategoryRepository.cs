using MyPantry.Data;
using MyPantry.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyPantry.Repositories
{
    public class CategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Category> GetAll()
        {
            return _context.Category.OrderBy(c => c.Name).ToList();
        }

        public Category GetById(int id)
        {
            return _context.Category.FirstOrDefault(c => c.Id == id);
        }
    }
}
