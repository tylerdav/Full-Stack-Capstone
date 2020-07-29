﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyPantry.Models
{
    public class RecipeFood
    {
        public int Id { get; set; }

        public int RecipeId { get; set; }

        public Recipe Recipe { get; set; }

        public int FoodId { get; set; }

        public Food Food { get; set; }
    }
}
