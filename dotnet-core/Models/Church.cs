using System.ComponentModel.DataAnnotations;

namespace MvcApp.Models {
    public class Church {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set;}

        [Required]
        public double Lat { get; set; }

        [Required]
        public double Lng { get; set; } 
    }
}
