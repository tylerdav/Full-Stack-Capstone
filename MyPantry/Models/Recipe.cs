using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MyPantry.Models
{
    public class Recipe
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string ImageLocation { get; set; }

        public string Content { get; set; }

        public int CategoryId { get; set; }

        public Category Category { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }

    }
}
