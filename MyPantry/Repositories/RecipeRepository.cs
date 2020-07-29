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
                .Include(p => p.UserProfile)
                .Include(p => p.Category)
                .ToList();

        }

        public Recipe GetById(int id)
        {
            return _context.Recipe.Include(p => p.UserProfile)
                                .Include(p => p.Category)
                                .FirstOrDefault(p => p.Id == id);
        }

        public List<Recipe> GetByUserProfileId(int id)
        {
            return _context.Recipe.Include(p => p.UserProfile)
                            .Include(p => p.Category)
                            .Where(p => p.UserProfileId == id)
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
            var post = GetById(id);
            _context.Recipe.Remove(post);
            _context.SaveChanges();
        }
        //public PostTag GetPostTagById(int id)
        //{
        //    return _context.PostTag
        //                   .FirstOrDefault(pt => pt.Id == id);
        //}
        //public void InsertTag(PostTag postTag)
        //{
        //    _context.PostTag.Add(postTag);
        //    _context.SaveChanges();
        //}

        //public void RemoveTag(int id)
        //{
        //    var postTag = GetPostTagById(id);
        //    _context.PostTag.Remove(postTag);
        //    _context.SaveChanges();
        //}
    }
}
