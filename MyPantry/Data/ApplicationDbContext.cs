using Microsoft.EntityFrameworkCore;
using MyPantry.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyPantry.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<UserProfile> UserProfile { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Food> Food { get; set; }
        public DbSet<FoodPantry> FoodPantry { get; set; }
        public DbSet<Recipe> Recipe { get; set; }
        public DbSet<RecipeFood> RecipeFood { get; set; }

    }
}
