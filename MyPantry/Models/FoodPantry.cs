using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyPantry.Models
{
    public class FoodPantry
    {
        public int Id { get; set; }
        public int FoodId { get; set; }
        public int UserProfileId { get; set; }
    }
}
